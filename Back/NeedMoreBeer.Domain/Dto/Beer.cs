using System;
using System.Collections.Generic;
using System.Text;

namespace NeedMoreBeer.Domain.Dto
{
    /// <summary>
    /// Beer detailed
    /// </summary>
    public class Beer
    {
        /// <summary>
        /// Name
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Abv
        /// </summary>
        public string Abv { get; set; }
        /// <summary>
        /// Glass name
        /// </summary>
        public Glass Glass { get; set; }
        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Images
        /// </summary>
        public Label Labels { get; set; }
        /// <summary>
        /// Status
        /// </summary>
        public string StatusDisplay { get; set; }
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
