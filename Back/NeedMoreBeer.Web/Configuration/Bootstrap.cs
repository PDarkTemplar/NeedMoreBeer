using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.PlatformAbstractions;
using NeedMoreBeer.Domain;
using NeedMoreBeer.Web.ExceptionHandler;
using Newtonsoft.Json;
using NLog.Extensions.Logging;
using NLog.LayoutRenderers;
using NLog.Web;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.IO;
using TinkoffBank.TQM.WebConfiguration.Swagger;
using ErrorEventArgs = Newtonsoft.Json.Serialization.ErrorEventArgs;

namespace TinkoffBank.TQM.WebConfiguration
{
    public class Bootstrap
    {
        #region fields
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;
        private IServiceProvider _serviceProvider;
        #endregion

        #region ctor
        public Bootstrap(IHostingEnvironment env, JsonSerializerSettings jsonSettings, IConfiguration configuration) : this(env, configuration)
        {
            if (jsonSettings != null)
                JsonConvert.DefaultSettings = () => jsonSettings;
        }

        public Bootstrap(IHostingEnvironment env, IConfiguration configuration)
        {
            _env = env;
            _configuration = configuration;
        }
        #endregion

        public IServiceProvider DiConfig(IServiceCollection services)
        {
            services.AddCors();
            ConfigureMvc(services);

            services.AddLogging();
            services.AddOptions();
            services.AddDomain();

            AddSwaggerConfigDi(services);

            _serviceProvider = services.BuildServiceProvider();
            return _serviceProvider;
        }

        public void WebConfig(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseCors(UseCors);

            app.UseMiddleware<ExceptionHandlingMiddleware>();
            app.UseMvc();

            AddSwaggerConfig(app);
        }

        #region internal di

        private void ConfigureMvc(IServiceCollection services)
        {
            var mvcBuilder = services.AddMvc()
            .AddJsonOptions(SetupJson).AddApplicationPart(this.GetType().Assembly);

            void SetupJson(MvcJsonOptions jsonOptions)
            {
                var ds = JsonConvert.DefaultSettings();

                if (ds == null) return;

                jsonOptions.SerializerSettings.ContractResolver = ds.ContractResolver;
                jsonOptions.SerializerSettings.TypeNameHandling = ds.TypeNameHandling;
                jsonOptions.SerializerSettings.NullValueHandling = ds.NullValueHandling;
                jsonOptions.SerializerSettings.Converters = ds.Converters;
                jsonOptions.SerializerSettings.Error = JsonSerializerError;
            }
        }

        private void JsonSerializerError(object sender, ErrorEventArgs errorEventArgs)
        {
            var log = _serviceProvider.GetService<ILogger<Bootstrap>>();
            string errorMessage = errorEventArgs.ErrorContext.Error.Message;
            log.LogError($"JsonSerializer error: {errorMessage}. ");
        }

        private void AddSwaggerConfigDi(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.DescribeAllEnumsAsStrings();
                c.DescribeStringEnumsInCamelCase();
                c.DescribeAllParametersInCamelCase();
                c.OperationFilter<EnumOperationFilter>();
                c.SchemaFilter<RequiredSchemaFilter>();
                c.SchemaFilter<EnumSchemaFilter>();

                c.SwaggerDoc("v1", new Info { Title = "REST", Version = "v1" });

                AddSwaggerXmlDescription(c);
            });

            void AddSwaggerXmlDescription(SwaggerGenOptions c)
            {
                var basePath = PlatformServices.Default.Application.ApplicationBasePath;
                foreach (var path in Directory.GetFiles(basePath, "*.xml"))
                {
                    c.IncludeXmlComments(path);
                }
            }
        }

        private void UseCors(CorsPolicyBuilder builder)
        {
            builder.WithOrigins(_configuration.GetValue<string>("Origins"))
          .AllowAnyHeader().AllowAnyMethod().AllowCredentials();
        }

        #endregion

        #region internal app config
        private static void AddSwaggerConfig(IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("../swagger/v1/swagger.json", "REST V1");
            });
        }
        #endregion
    }
}
