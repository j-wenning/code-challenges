console.clear()

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
    private root: BSTNode
    private isNode (item: number, curNode: BSTNode): boolean
    private isNode (item: BSTNode, curNode: BSTNode): boolean
    private isNode (item: any, curNode: BSTNode) {
        if (typeof item === typeof Number()) return item === curNode.val
        return item === curNode
    }
    private isNodeParent (item: number, curNode: BSTNode): boolean
    private isNodeParent (item: BSTNode, curNode: BSTNode): boolean
    private isNodeParent (item: any, curNode: BSTNode) {
        if (typeof item === typeof Number()) {
            return curNode.l?.val === item || curNode.r?.val === item
        }
        return curNode.l === item || curNode.r === item
    }
    constructor (vals: Set<number>) { vals.forEach(val => this.add(val)) }
    add (item: number, curNode?: BSTNode): BSTNode
    add (item: BSTNode, curNode?: BSTNode): BSTNode
    add (item: any, curNode: BSTNode = this.root) {
        const itemNode = typeof item === typeof Number()
            ? new BSTNode(item)
            : item
        if (!itemNode) return null
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
        const foundParent = this.find(item, this.isNodeParent, curNode)
        const foundNode = this.find(item, this.isNode, foundParent)
        foundParent[foundParent.l === foundNode ? 'l' : 'r'] = foundNode.l || foundNode.r
        if (foundNode.l && foundNode.r) this.add(foundNode.r, foundNode.l)
        foundNode.l = foundNode.r = null
        return foundNode
    }
    find (item: number, query?: Function, curNode?: BSTNode): BSTNode
    find (item: BSTNode, query?: Function, curNode?: BSTNode): BSTNode
    find (item: any, query: Function = this.isNode, curNode: BSTNode = this.root) {
        const itemVal = typeof item === typeof Number() ? item : item.val
        if (!curNode || query(item, curNode)) return curNode
        if (itemVal > curNode.val) return this.find(itemVal, query, curNode.r)
        if (itemVal < curNode.val) return this.find(itemVal, query, curNode.l)
    }
    maxDepth (curNode: BSTNode = this.root): number {
        if (!curNode) return 0
        return 1 + Math.max(this.maxDepth(curNode.l), this.maxDepth(curNode.r))
    }
    count (curNode: BSTNode = this.root): number {
        if (!curNode) return 0
        return 1 + this.count(curNode.l) + this.count(curNode.r)
    }
    rotateNodes (base: BSTNode, newBase: BSTNode) {
        base[base.r === newBase ? 'r' : 'l'] = null
        if (base === this.root) {
            this.root = newBase
        } else {
            const parent = this.find(base.val, this.isNodeParent)
            parent[base.val > parent.val ? 'r' : 'l'] = newBase
        }
        this.add(base, newBase)
        return newBase
    }
    balance (curNode: BSTNode = this.root): void {
        if (!curNode) return
        const calcDepthDiff = () => this.maxDepth(curNode.r) - this.maxDepth(curNode.l)
        let depthDiff
        while (Math.abs((depthDiff = calcDepthDiff())) > 1) {
            curNode = this.rotateNodes(curNode, depthDiff > 0 ? curNode.r : curNode.l)
        }
        this.balance(curNode.l)
        this.balance(curNode.r)
    }
}

// TESTS /////////////////////////////////////////////////////////////////

// BST ///////////////////////////////////////////////////////////////////
// const treeTest = new BinarySearchTree (new Set<number> ([342,3415,1,2,3,4,5,6,7,8,9,10,11,12,13,987564,78546123,78654416131854646531,14,15,16,17,18,19,20,3246643,3246,326324,34,5325,-1,-10,-324,-46456,132,-23546236,345345,3245,342,53,45,43,5,767,5,65,8,678,567,43,341,789,46548798,8798754654321,7897,46546546546541,123546,46589741]))
// console.log(treeTest.count())
// treeTest.remove(14)
// treeTest.remove(-10)
// console.log(treeTest.count())
// console.log('max depth:', treeTest.maxDepth())
// treeTest.balance()
// console.log('max depth:', treeTest.maxDepth())
// console.log (treeTest.find(123) ?? '', '\n', treeTest.find(342), '\n', treeTest.find(3246643), '\n', treeTest.find(8))
