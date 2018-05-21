using System;
using System.Collections.Generic;
using System.Text;

namespace NeedMoreBeer.Domain.Exceptions
{
    /// <summary>
    /// Business Exception displayed on frontend
    /// </summary>
    public class BusinessException : Exception
    {
        public BusinessException(string message) : base(message)
        {

        }

        public BusinessException() : base()
        {
        }

        protected BusinessException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context) : base(info, context)
        {
        }

        public BusinessException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
