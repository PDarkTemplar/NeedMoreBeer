﻿using Microsoft.Extensions.DependencyInjection;
using NeedMoreBeer.Domain.Base;
using NeedMoreBeer.Domain.Base.Impl;
using NeedMoreBeer.Domain.Service;
using NeedMoreBeer.Domain.Service.Impl;
using RestSharp;

namespace NeedMoreBeer.Domain
{
    /// <summary>
    /// Di module
    /// </summary>
    public static class DiModule
    {
        /// <summary>
        /// Add domain to di
        /// </summary>
        /// <param name="sc">service collection</param>
        /// <returns></returns>
        public static IServiceCollection AddDomain(this IServiceCollection sc)
        {
            sc.AddTransient<IBreweryDbService, BreweryDbService>();
            sc.AddTransient<IBeerService, BeerService>();
            sc.AddSingleton<IConfigurationProxy, ConfigurationProxy>();
            sc.AddTransient<IRestClient>(x => new RestClient());

            return sc;
        }
    }
}
