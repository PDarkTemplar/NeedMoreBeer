using System;
using System.Collections.Generic;
using System.Text;

namespace NeedMoreBeer.Domain.Model
{
    internal class ArrayResponse<T>
    {
        public string Status { get; set; }
        public int NumberOfPages { get; set; }
        public int CurrentPage { get; set; }
        public int TotalResults { get; set; }
        public List<T> Data { get; set; }
    }
}
