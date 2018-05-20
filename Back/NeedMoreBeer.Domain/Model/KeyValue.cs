using System;
using System.Collections.Generic;
using System.Text;

namespace NeedMoreBeer.Domain.Model
{
    internal class KeyValue
    {
        public string Key { get; set; }
        public string Value { get; set; }

        public KeyValue(string key, string value)
        {
            Key = key;
            Value = value;
        }
    }
}
