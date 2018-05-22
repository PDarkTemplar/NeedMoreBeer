using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using NeedMoreBeer.Domain.Base;
using NeedMoreBeer.Domain.Dto;
using NeedMoreBeer.Domain.Dto.Enum;
using NeedMoreBeer.Domain.Exceptions;
using NeedMoreBeer.Domain.Extension;
using NeedMoreBeer.Domain.Model;

namespace NeedMoreBeer.Domain.Service.Impl
{
    internal class BeerService : IBeerService
    {
        private readonly IBreweryDbService _breweryDbService;

        public BeerService(IBreweryDbService breweryDbService)
        {
            _breweryDbService = breweryDbService;
        }

        public async Task<TableResponse<Dto.TableBeer>> GetTableAsync(TableRequest request, CancellationToken token)
        {
            var requestParams = new List<KeyValue>();

            var filter = GenerateFilter(request.Filters);
            var sort = GenerateSorting(request.Order, request.Sort);

            requestParams.AddRange(filter);
            requestParams.AddRange(sort);
            requestParams.Add(new KeyValue("p", request.Page.ToString()));

            try
            {
                var result = await _breweryDbService.GetAsync<ArrayResponse<Dto.TableBeer>>("beers", token, requestParams.ToArray()).ConfigureAwait(false);

                if (result.Status != "success")
                {
                    throw new BusinessException("Something went wrong");
                }

                return new TableResponse<Dto.TableBeer>
                {
                    NumberOfPages = result.NumberOfPages,
                    TotalResults = result.TotalResults,
                    Data = result.Data
                };
            }
            catch (Exception)
            {
                throw;
            }

        }

        public async Task<Dto.Beer> GetBeerAsync(string id, CancellationToken token)
        {
            try
            {
                var result = await _breweryDbService.GetAsync<SingleResponse<Dto.Beer>>($"beer/{id}", token).ConfigureAwait(false);

                if (result.Status != "success")
                {
                    throw new BusinessException("Something went wrong");
                }

                return result.Data;
            }
            catch (Exception)
            {
                throw;
            }
        }

        private IReadOnlyCollection<KeyValue> GenerateSorting(Order order, SortOrder sort)
        {
            var result = new List<KeyValue>();
            result.Add(new KeyValue("order", order.ToString().FirstToLower()));
            result.Add(new KeyValue("sort", sort.ToString().ToUpper()));

            return result;
        }

        private IReadOnlyCollection<KeyValue> GenerateFilter(IReadOnlyCollection<string> filters)
        {
            var result = new List<KeyValue>();

            if (filters != null)
            {
                foreach (var filter in filters)
                {
                    if (filter == null || !filter.Contains(":")) continue;

                    var split = filter.Split(':');

                    result.Add(new KeyValue(split[0], split[1]));
                }
            }

            return result;
        }
    }
}
