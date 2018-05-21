using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using Swashbuckle.AspNetCore.Swagger;

namespace TinkoffBank.TQM.WebConfiguration.Swagger
{
    class RequiredSchemaFilter : ISchemaFilter
    {
        public void Apply(Schema model, SchemaFilterContext context)
        {
            if (context.SystemType.IsValueType && !context.SystemType.IsEnum
                && !context.SystemType.Equals(typeof(bool))
                && Nullable.GetUnderlyingType(context.SystemType) == null)
                model.Extensions.Add("x-nullable", false);
        }
    }
}
