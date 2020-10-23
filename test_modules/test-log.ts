const processTest = (cb: Function): void => {
    let str = cb.toString().trim()
    str = /^\(\)\s*=>\s*/.test(str)
        ? str.replace(/^\(\)\s*=>\s*/, '')
        : str.match(/(?<=return).*\(.*\)/g)[0]
    console.log(str.trim(), '\n', cb(), '\n')
}

module.exports = (...tests: Array<Function>) => {
    tests.forEach((test: Function) => processTest(test) )
}
