using System;
using System.Collections.Generic;
using System.Text;

namespace NeedMoreBeer.Domain
{
    internal interface IConfigurationProxy
    {
        T GetValue<T>(string name);
    }
}
