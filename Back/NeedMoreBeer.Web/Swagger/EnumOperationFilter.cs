using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Linq;

namespace TinkoffBank.TQM.WebConfiguration.Swagger
{
    class EnumOperationFilter : IOperationFilter
    {
        public void Apply(Swashbuckle.AspNetCore.Swagger.Operation operation, OperationFilterContext context)
        {
            foreach (var contextParam in context.ApiDescription.ActionDescriptor.Parameters.Where(x => x.ParameterType.IsEnum || (Nullable.GetUnderlyingType(x.ParameterType)?.IsEnum == true)))
            {
                var param = operation.Parameters.Select(x => x as NonBodyParameter).FirstOrDefault(x => x != null && x.Enum != null && x.Enum.Any() && x.Name == contextParam.Name);
                if (param != null)
                {
                    var name = contextParam.ParameterType.Name;
                    var nullableType = Nullable.GetUnderlyingType(contextParam.ParameterType);
                    if (nullableType != null)
                    {
                        name = nullableType.Name;
                    }
                    param.Extensions.Add("x-enum-name", name);
                }
            }
        }
    }
}
