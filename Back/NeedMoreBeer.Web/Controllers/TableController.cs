using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NeedMoreBeer.Domain.Service;
using NeedMoreBeer.Domain.Dto;

namespace NeedMoreBeer.Web.Controllers
{
    /// <summary>
    /// Table
    /// </summary>
    [Produces("application/json")]
    [Route("table")]
    public class TableController : Controller
    {
        private readonly IBeerService _beerService;

        /// <summary>
        /// ctor
        /// </summary>
        /// <param name="beerService"></param>
        public TableController(IBeerService beerService)
        {
            _beerService = beerService;
        }

        /// <summary>
        /// Get beer table
        /// </summary>
        /// <param name="request">table request</param>
        /// <param name="token">cancelation token</param>
        /// <returns></returns>
        [Route("")]
        [HttpGet]
        public Task<TableResponse<TableBeer>> GetTableAsync([FromQuery]TableRequest request, CancellationToken token)
        {
            return _beerService.GetTableAsync(request, token);
        }
    }
}