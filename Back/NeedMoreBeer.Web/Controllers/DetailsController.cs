using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NeedMoreBeer.Domain.Service;

namespace NeedMoreBeer.Web.Controllers
{
    /// <summary>
    /// Beer details
    /// </summary>
    [Produces("application/json")]
    [Route("details")]
    public class DetailsController : Controller
    {
        private readonly IBeerService _beerService;

        /// <summary>
        /// ctor
        /// </summary>
        /// <param name="beerService"></param>
        public DetailsController(IBeerService beerService)
        {
            _beerService = beerService;
        }

        /// <summary>
        /// Get beer details
        /// </summary>
        /// <param name="id">beer id</param>
        /// <param name="token">cancelation token</param>
        /// <returns></returns>
        [Route("{id}")]
        [HttpGet]
        public Task<Domain.Dto.Beer> GetDetailsAsync([FromRoute]string id, CancellationToken token)
        {
            return _beerService.GetBeerAsync(id, token);
        }
    }
}