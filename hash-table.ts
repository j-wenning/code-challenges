class HTNode {
    val: string
    child: HTNode
    constructor (val: string, child: HTNode = null) {
        this.val = val
        this.child = child
    }
}

class HashTable {
    buckets: Array<HTNode>
    private hash: Function
    constructor (vals: Set<string> = new Set(), minLength: number = 100, maxPadding: number = 50) {
        const max = Math.abs(maxPadding)
        const min = Math.abs(minLength)
        const length: number = Math.floor(Math.random() * (max - min) + min)
        const addend: number = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
        const factor: number = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
        this.buckets = new Array(length).fill(null)
        this.hash = (val: string): number => {
            let hash = [...val].reduce((a, char) => (a += char.charCodeAt(0)), 0)
            return (hash * factor + addend) % length
        }
        vals.forEach(val => this.add(val))
    }
    add (val: string): boolean {
        const hash = this.hash(val)
        const newNode = new HTNode(val)
        let node: HTNode = this.buckets[hash]
        if (!node) return !!(this.buckets[hash] = newNode)
        while (node.child) {
            if (node.val === val) return false
            node = node.child
        }
        return !!(node.child = newNode)
    }
    find (val: string): boolean {
        const hash = this.hash(val)
        let node: HTNode = this.buckets[hash]
        while (val !== node?.val && node) node = node.child
        return !!node
    }
}

module.exports = (tests: boolean): void => {
    if (tests) {
        const tableTest = new HashTable(new Set(['test', 'neat', 'good', 'amazing', 'fantastic']))
        console.log(
            'HASH TABLE TESTS:\n',
            'find(\'test\')', tableTest.find('test'), '\n',
            'find(\'yess\')', tableTest.find('yess'), '\n',
            'find(\'neat\')', tableTest.find('neat'), '\n',
            'find(\'cool\')', tableTest.find('cool'), '\n',
            'find(\'good\')', tableTest.find('good'), '\n',
            'find(\'great\')', tableTest.find('great'), '\n',
            'find(\'fantastic\')', tableTest.find('fantastic'), '\n',
            'find(\'interesting\')', tableTest.find('interesting'), '\n',
        )
    }
}
