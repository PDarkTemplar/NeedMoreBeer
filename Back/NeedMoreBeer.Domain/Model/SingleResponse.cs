using System;
using System.Collections.Generic;
using System.Text;

namespace NeedMoreBeer.Domain.Model
{
    internal class SingleResponse<T>
    {
        public string Status { get; set; }
        public T Data { get; set; }
    }
}
