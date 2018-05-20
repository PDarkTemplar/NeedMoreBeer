using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using NeedMoreBeer.Domain.Exceptions;
using NeedMoreBeer.Domain.Model;
using RestSharp;

namespace NeedMoreBeer.Domain.Base.Impl
{
    internal class BreweryDbService : IBreweryDbService
    {
        private readonly string _apiKey;
        private readonly string _baseUrl = "http://api.brewerydb.com/v2/";
        private readonly IRestClient _restClient;

        public BreweryDbService(IConfigurationProxy configuration, IRestClient restClient)
        {
            _apiKey = configuration.GetValue<string>("ApiKey");
            _restClient = restClient;
        }

        public async Task<T> GetAsync<T>(string endpoint, CancellationToken token, params KeyValue[] requestParams)
        {
            if (string.IsNullOrEmpty(_apiKey))
                throw new BusinessException("ApiKey is empty, specify one in appsettings.json");

            _restClient.BaseUrl = new Uri(_baseUrl);

            var request = new RestRequest(endpoint);
            request.AddParameter("key", _apiKey);

            if (requestParams != null)
            {
                foreach (var param in requestParams)
                {
                    request.AddParameter(param.Key, param.Value);
                }
            }

            var response = await _restClient.ExecuteGetTaskAsync<T>(request, token).ConfigureAwait(false);

            if (!response.IsSuccessful)
            {
                throw response.ErrorException;
            }

            return response.Data;
        }
    }
}
