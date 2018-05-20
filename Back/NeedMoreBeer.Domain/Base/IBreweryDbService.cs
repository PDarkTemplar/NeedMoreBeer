using NeedMoreBeer.Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NeedMoreBeer.Domain.Base
{
    internal interface IBreweryDbService
    {
        Task<T> GetAsync<T>(string endpoint, CancellationToken token, params KeyValue[] requestParams);
    }
}
