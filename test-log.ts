const processTest = (obj: any, cb: string, ...args: Array<any>) => {
    const argstr: string = args.map((arg: any) => typeof arg === typeof String()
        ? `'${arg}'`
        : arg
    ).join(', ')
    console.log(`${cb}(${ argstr }):\n`, obj[cb](...args), '\n')
}

module.exports = (...tests: Array<Array<any>>) => {
    tests.forEach((test: Array<any>) => {
        const [obj, cb, ...args] = test
        processTest(obj || global, cb, ...args)
    })
}
