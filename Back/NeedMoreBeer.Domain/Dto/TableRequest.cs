using NeedMoreBeer.Domain.Dto.Enum;
using System.Collections.Generic;

namespace NeedMoreBeer.Domain.Dto
{
    /// <summary>
    /// Table request
    /// </summary>
    public class TableRequest
    {
        /// <summary>
        /// Column order name
        /// </summary>
        public Order Order { get; set; }
        /// <summary>
        /// Sort direction
        /// </summary>
        public SortOrder Sort { get; set; }
        /// <summary>
        /// Page to load
        /// </summary>
        public int Page { get; set; } = 1;
        /// <summary>
        /// Filters
        /// </summary>
        public IReadOnlyCollection<string> Filters { get; set; }
    }
}
