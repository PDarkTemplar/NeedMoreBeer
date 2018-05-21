using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace NeedMoreBeer.Domain
{
    internal class ConfigurationProxy : IConfigurationProxy
    {
        private readonly IConfiguration _configuration;

        public ConfigurationProxy(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public T GetValue<T>(string name)
        {
            return _configuration.GetValue<T>(name);
        }
    }
}
