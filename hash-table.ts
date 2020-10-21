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
    private isNode (item: string, curNode: HTNode): boolean
    private isNode (item: HTNode, curNode: HTNode): boolean
    private isNode (item: any, curNode: HTNode) {
        return typeof item === typeof String()
            ? item === curNode.val
            : item === curNode
    }
    private isNodeParent (item: string, curNode: HTNode): boolean
    private isNodeParent (item: HTNode, curNode: HTNode): boolean
    private isNodeParent (item: any, curNode: HTNode) {
        return typeof item === typeof String()
            ? item === curNode.child?.val
            : item === curNode.child
    }
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
    add (item: string): HTNode
    add (item: HTNode): HTNode
    add (item: any) {
        const itemNode: HTNode = typeof item === typeof String()
            ? new HTNode(item)
            : item
        const hash = this.hash(itemNode.val)
        let node: HTNode = this.buckets[hash]
        if (!node) return this.buckets[hash] = itemNode
        while (node.child) {
            if (node.val === itemNode.val) return null
            node = node.child
        }
        return node.child = itemNode
    }
    remove (item: string): HTNode
    remove (item: HTNode): HTNode
    remove (item: any) {
        const nodeParent = this.find(item, this.isNodeParent)
        const node = this.find(item)
        if (nodeParent) nodeParent.child = node.child
        else {
            const child = node.child
            this.buckets[this.hash(node.val)] = child
        }
        return node
    }
    find (item: string, query?: Function): HTNode
    find (item: HTNode, query?: Function): HTNode
    find (item: any, query: Function = this.isNode): HTNode {
        const hash = this.hash(item?.val || item)
        let node: HTNode = this.buckets[hash]
        while (node && !query(item, node)) node = node.child
        return node
    }
}

module.exports = (tests: boolean): void => {
    if (tests) {
        const tableTest = new HashTable(new Set(['test', 'sett', 'neat', 'good', 'amazing', 'fantastic']))
        console.log(
            'HASH TABLE TESTS:\n',
            'find(\'test\')', tableTest.find('test'), '\n',
            'find(\'sett\')', tableTest.find('sett'), '\n',
            'find(\'yess\')', tableTest.find('yess'), '\n',
            'find(\'neat\')', tableTest.find('neat'), '\n',
            'find(\'cool\')', tableTest.find('cool'), '\n',
            'find(\'good\')', tableTest.find('good'), '\n',
            'find(\'great\')', tableTest.find('great'), '\n',
            'find(\'amazing\')', tableTest.find('amazing'), '\n',
            'find(\'fantastic\')', tableTest.find('fantastic'), '\n',
            'find(\'interesting\')', tableTest.find('interesting'), '\n',
            'remove(\'test\')', tableTest.remove('test'), '\n',
            'remove(\'amazing\')', tableTest.remove('amazing'), '\n',
            'find(\'test\')', tableTest.find('test'), '\n',
            'find(\'sett\')', tableTest.find('sett'), '\n',
            'find(\'amazing\')', tableTest.find('amazing'), '\n',
        )
    }
}
