export const generatePropsFromFunc = (obj, func) => {
    return Object.keys(obj).reduce((acc, name) => {
        acc[name] = func(obj[name])
        return acc
    }, {})
}

export const generateID = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9)
}