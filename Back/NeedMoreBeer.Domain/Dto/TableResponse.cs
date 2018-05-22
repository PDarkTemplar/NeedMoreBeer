using System;
using System.Collections.Generic;
using System.Text;

namespace NeedMoreBeer.Domain.Dto
{
    /// <summary>
    /// Table response
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class TableResponse<T>
    {
        /// <summary>
        /// Table data
        /// </summary>
        public IReadOnlyCollection<T> Data { get; set; }
        /// <summary>
        /// Number of pages
        /// </summary>
        public int NumberOfPages { get; set; }
        /// <summary>
        /// Total results
        /// </summary>
        public int TotalResults { get; set; }
    }
}
