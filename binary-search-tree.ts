class BSTNode {
    val: number
    l: BSTNode
    r: BSTNode
    constructor (val: number, l: BSTNode = null, r: BSTNode = null) {
        this.val = val
        this.l = l
        this.r = r
    }
}

class BinarySearchTree {
    root: BSTNode
    private isNode (item: number, curNode: BSTNode): boolean
    private isNode (item: BSTNode, curNode: BSTNode): boolean
    private isNode (item: any, curNode: BSTNode) {
        return typeof item === typeof Number()
            ? item === curNode.val
            : item === curNode
    }
    private isNodeParent (item: number, curNode: BSTNode): boolean
    private isNodeParent (item: BSTNode, curNode: BSTNode): boolean
    private isNodeParent (item: any, curNode: BSTNode) {
        return typeof item === typeof Number()
            ? item === curNode.l?.val || item === curNode.r?.val
            : item === curNode.l || item === curNode.r
    }
    private calcDepthDiff (node: BSTNode): number { return this.maxDepth(node.r) - this.maxDepth(node.l)}
    constructor (vals: Set<number> = new Set()) { vals.forEach(val => this.add(val)) }
    add (item: number, curNode?: BSTNode): BSTNode
    add (item: BSTNode, curNode?: BSTNode): BSTNode
    add (item: any, curNode: BSTNode = this.root) {
        const itemNode = typeof item === typeof Number()
            ? new BSTNode(item)
            : item
        if (!curNode) {
            if (!this.root) this.root = itemNode
            return itemNode
        }
        if (itemNode.val > curNode.val) curNode.r = this.add(itemNode, curNode.r)
        if (itemNode.val < curNode.val) curNode.l = this.add(itemNode, curNode.l)
        return curNode
    }
    remove (item: number, curNode?: BSTNode): BSTNode
    remove (item: BSTNode, curNode?: BSTNode): BSTNode
    remove (item: any, curNode: BSTNode = this.root) {
        const foundParent: BSTNode = this.find(item, this.isNodeParent, curNode)
        const foundNode: BSTNode = this.find(item, this.isNode, foundParent)
        if (!foundNode) return undefined
        if (foundNode === this.root) this.root = foundNode.l || foundNode.r
        else foundParent[foundParent.l === foundNode ? 'l' : 'r'] = foundNode.l || foundNode.r
        if (foundNode.l && foundNode.r) this.add(foundNode.r, foundNode.l)
        foundNode.l = foundNode.r = null
        return foundNode
    }
    find (item: number, query: Function = this.isNode, curNode: BSTNode = this.root): BSTNode {
        if (!curNode || query(item, curNode)) return curNode
        if (item > curNode.val) return this.find(item, query, curNode.r)
        if (item < curNode.val) return this.find(item, query, curNode.l)
    }
    maxDepth (curNode: BSTNode = this.root): number {
        if (!curNode) return 0
        return 1 + Math.max(this.maxDepth(curNode.l), this.maxDepth(curNode.r))
    }
    count (curNode: BSTNode = this.root): number {
        if (!curNode) return 0
        return 1 + this.count(curNode.l) + this.count(curNode.r)
    }
    rotateNodes (base: BSTNode, newBase: BSTNode): BSTNode {
        if (base.l === newBase) base.l = null
        else if (base.r === newBase) base.r = null
        else return base
        if (base === this.root) {
            this.root = newBase
        } else {
            const parent = this.find(base.val, this.isNodeParent)
            parent[parent.l === base ? 'l' : 'r'] = newBase
        }
        this.add(base, newBase)
        return newBase
    }
    balance (curNode: BSTNode = this.root): void {
        if (!curNode) return undefined
        let depthDiff
        this.balance(curNode.l)
        this.balance(curNode.r)
        while (Math.abs((depthDiff = this.calcDepthDiff(curNode))) > 1) {
            curNode = this.rotateNodes(curNode, depthDiff > 0 ? curNode.r : curNode.l)
        }
        this.balance(curNode.l)
        this.balance(curNode.r)
    }
}

module.exports = (tests: boolean = false): void => {
    if (tests) {
        const testLog = require('./test-log')
        const treeTest = new BinarySearchTree (new Set<number> ([
            342,3415,1,2,3,4,5,6,7,8,9,10,11,12,13,987564,78546123,
            78654416131854646531,14,15,16,17,18,19,20,3246643,3246,
            326324,34,5325,-1,-10,-324,-46456,132,-23546236,345345,
            3245,342,53,45,43,5,767,5,65,8,678,567,43,341,789,7897,
            46548798,8798754654321,46546546546541,123546,465897418,
            78794564231541,654135241,513464,124716541,156489,31,48,
        ]))
        console.log('\n\nBINARY SEARCH TREE TESTS\n')
        testLog(
            () => treeTest.count(),
            () => treeTest.find(123),
            () => treeTest.find(342),
            () => treeTest.find(78546123),
            () => treeTest.find(14),
            () => treeTest.find(-10),
            () => treeTest.remove(123),
            () => treeTest.remove(14),
            () => treeTest.remove(-10),
            () => treeTest.find(14),
            () => treeTest.find(-10),
            () => treeTest.count(),
            () => treeTest.maxDepth(),
            () => treeTest.balance(),
            () => treeTest.find(342),
            () => treeTest.find(78546123),
            () => treeTest.count(),
            () => treeTest.maxDepth(),
        )
    }
}
