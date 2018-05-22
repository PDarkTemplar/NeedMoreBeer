using NeedMoreBeer.Domain.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NeedMoreBeer.Domain.Service
{
    /// <summary>
    /// Main beer service
    /// </summary>
    public interface IBeerService
    {
        /// <summary>
        /// Get beer table
        /// </summary>
        /// <param name="request">table request</param>
        /// <param name="token">cancelation token</param>
        /// <returns></returns>
        Task<TableResponse<TableBeer>> GetTableAsync(TableRequest request, CancellationToken token);
        /// <summary>
        /// Get beer by id
        /// </summary>
        /// <param name="id">Id</param>
        /// <param name="token">cancelation token</param>
        /// <returns></returns>
        Task<Dto.Beer> GetBeerAsync(string id, CancellationToken token);
    }
}
