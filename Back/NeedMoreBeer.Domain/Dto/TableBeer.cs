using System;
using System.Collections.Generic;
using System.Text;

namespace NeedMoreBeer.Domain.Dto
{
    /// <summary>
    /// Table Beer info
    /// </summary>
    public class TableBeer
    {
        /// <summary>
        /// Id
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// Name
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Abv
        /// </summary>
        public string Abv { get; set; }
        /// <summary>
        /// Ibu
        /// </summary>
        public string Ibu { get; set; }
        /// <summary>
        /// Status
        /// </summary>
        public string StatusDisplay { get; set; }
        /// <summary>
        /// Yesr
        /// </summary>
        public string Year { get; set; }
        /// <summary>
        /// Images
        /// </summary>
        public Label Labels { get; set; }
        /// <summary>
        /// Glass type
        /// </summary>
        public Glass Glass { get; set; }
        /// <summary>
        /// Create date
        /// </summary>
        public DateTime CreateDate { get; set; }
        /// <summary>
        /// Update date
        /// </summary>
        public DateTime UpdateDate { get; set; }
    }
}
