using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using TinkoffBank.TQM.WebConfiguration;

namespace NeedMoreBeer.Web
{
    public class Startup
    {
        private readonly Bootstrap _bootstrap;

        public Startup(IHostingEnvironment env, IConfiguration configuration)
        {
            _bootstrap = new Bootstrap(env, GetJsonSettings(), configuration);
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            return _bootstrap.DiConfig(services);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            _bootstrap.WebConfig(app, env, loggerFactory);
        }

        JsonSerializerSettings GetJsonSettings()
        {
            var set = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                NullValueHandling = NullValueHandling.Include
            };
            set.Converters.Add(new StringEnumConverter { CamelCaseText = true });
            return set;
        }
    }
}
