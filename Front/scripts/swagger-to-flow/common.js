// @flow

const typeMapping = {
    array: 'Array<*>',
    boolean: 'boolean',
    integer: 'number',
    number: 'number',
    null: 'null',
    object: 'Object',
    Object: 'Object',
    string: 'string',
    enum: 'string',
};

export const stripBrackets = (name: string) => name.replace(/[[\]']+/g, '').replace(/,/, '');

const definitionTypeName = (ref): string => {
    const re = /#\/definitions\/(.*)/;
    const found = ref.match(re);
    return found ? stripBrackets(found[1]) : '';
};

export const typeForImport = (property: any) => {
    if (property.type === 'array' && property.items.$ref) {
        return definitionTypeName(property.items.$ref);
    }
    if (property.$ref) {
        return definitionTypeName(property.$ref);
    }
};

export const typeFor = (property: any): string => {
    if (property.type === 'array') {
        if ('$ref' in property.items) {
            return `Array<${definitionTypeName(property.items.$ref)}>`;
        } else if (property.items.type === 'object') {
            // eslint-disable-next-line
            const child = propertiesTemplate(propertiesList(property.items)).replace(/"/g, '');
            return `Array<${child}>`;
        }
        return `Array<${typeMapping[property.items.type]}>`;
    } else if (property.type === 'string' && 'enum' in property) {
        return property.enum.map(e => `'${e}'`).join(' | ');
    }
    return typeMapping[property.type] || definitionTypeName(property.$ref);
};

const isRequired = (propertyName: string, definition: Object): boolean => {
    const requiredDef = definition.required && definition.required.indexOf(propertyName) >= 0;
    const requiredProp = definition.properties[propertyName].required;
    const result =
        requiredDef || requiredProp || definition.properties[propertyName]['x-nullable'] === false;
    return result;
};

const propertyKeyForDefinition = (propName: string, definition: Object): string =>
    `${propName}${isRequired(propName, definition) ? '' : '?'}`;

export const propertiesList = (definition: Object) => {
    if ('allOf' in definition) {
        return definition.allOf.map(propertiesList);
    }

    if (definition.$ref) {
        return { $ref: definitionTypeName(definition.$ref) };
    }

    if ('type' in definition && definition.type !== 'object') {
        return typeFor(definition);
    }

    if (!definition.properties || Object.keys(definition.properties).length === 0) {
        return {};
    }
    return Object.assign.apply(
        null,
        // $FlowFixMe
        Object.keys(definition.properties).reduce(
            (properties: Array<Object>, propName: string) => {
                const arr = properties.concat({
                    [propertyKeyForDefinition(propName, definition)]: typeFor(
                        definition.properties[propName]
                    ),
                });
                return arr;
            },
            [{}]
        )
    );
};

export const propertiesTemplate = (properties: Object | Array<Object> | string): string => {
    if (typeof properties === 'string') {
        return properties;
    }
    if (Array.isArray(properties)) {
        return properties
            .map(property => {
                const p = property.$ref ? `& ${property.$ref}` : JSON.stringify(property);
                return p;
            })
            .sort(a => (a[0] === '&' ? 1 : -1))
            .join(' ');
    }
    return JSON.stringify(properties);
};
