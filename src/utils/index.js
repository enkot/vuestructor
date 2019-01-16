export const generateID = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9)
}

export const isSameElements = (first, second) => {
    return first && (first === second || first.contains(second))
}

export const generateBlockData = (schema, placeholders, data = {}) => {
    return {
        slots: getFilledSlots(schema),
        data,
    }

    function getFilledSlots(schema, root = true) {
        if (root) return getFilledSchemaItem(schema)
        if (schema.type === 'list') {
            schema = schema.items
            
            return [...Array(3)].map(() => getFilledSchemaItem(schema))
        }

        return getFilledDataId(schema)
    }
    function getFilledSchemaItem(schema) {
        return Object.keys(schema).reduce((acc, name) => {
            acc[name] = getFilledSlots(schema[name], false)

            return acc
        }, {})
    }
    function getFilledDataId({ type }, id = generateID()) {
        data[id] = { type, ...placeholders[type] }

        return id
    }
}