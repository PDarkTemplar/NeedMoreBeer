using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using NeedMoreBeer.Domain.Exceptions;
using Newtonsoft.Json;
using System;
using System.Text;
using System.Threading.Tasks;

namespace NeedMoreBeer.Web.ExceptionHandler
{
    sealed class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _log;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> log)
        {
            _next = next;
            _log = log;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
                await CatchErrorStatusCodesAsync(context);
            }
            catch (Exception ex)
            {
                _log.LogError(0, ex, $"Unhandled exception: {ex.Message}");
                if (context.Response.HasStarted)
                {
                    _log.LogWarning("The response has already started, the error handler will not be executed.");
                    throw;
                }

                context.Response.Clear();

                context.Response.StatusCode = StatusCodes.Status500InternalServerError;

                context.Response.OnStarting(AddHeaders, context.Response);

                var message = "Unhandled exception";

                if (ex is BusinessException)
                {
                    message = ex.Message;
                }

                var error = new UnhandledError { Message = message };
                await context.Response.WriteAsync(JsonConvert.SerializeObject(error), Encoding.UTF8);
            }
        }

        private async Task CatchErrorStatusCodesAsync(HttpContext context)
        {
            if (context.Response.StatusCode == 401)
                return;
            if (context.Response.StatusCode > 400)
            {
                var code = context.Response.StatusCode;
                context.Response.Clear();
                context.Response.StatusCode = code;
                context.Response.OnStarting(AddHeaders, context.Response);
                var message = $"Unhandled exception, status: {code.ToString()}";
                _log.LogError(message);
                await context.Response.WriteAsync(JsonConvert.SerializeObject(new UnhandledError { Message = message }), Encoding.UTF8);
            }
        }

        private Task AddHeaders(object state)
        {
            var response = (HttpResponse)state;
            response.Headers[HeaderNames.CacheControl] = "no-cache";
            response.Headers[HeaderNames.Pragma] = "no-cache";
            response.Headers[HeaderNames.Expires] = "-1";
            response.Headers[HeaderNames.ContentType] = "application/json";
            response.Headers["Access-Control-Allow-Origin"] = "*";
            response.Headers.Remove(HeaderNames.ETag);
            return Task.FromResult(0);
        }
    }
}
