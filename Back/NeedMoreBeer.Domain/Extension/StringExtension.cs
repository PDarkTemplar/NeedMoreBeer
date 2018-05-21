using System;
using System.Collections.Generic;
using System.Text;

namespace NeedMoreBeer.Domain.Extension
{
    internal static class StringExtension
    {
        public static string FirstToLower(this string _)
        {
            return Char.ToLowerInvariant(_[0]) + _.Substring(1);
        }
    }
}
