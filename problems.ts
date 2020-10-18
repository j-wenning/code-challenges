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
    root: BSTNode
    constructor (vals: Set<number>) { vals.forEach(val => this.add(val)) }
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
    find (val: number, query: Function = (val: number, curNode: BSTNode) => val === curNode.val, curNode: BSTNode = this.root): BSTNode {
        if (!curNode || query(val, curNode)) return curNode
        if (val > curNode.val) return this.find(val, query, curNode.r)
        if (val < curNode.val) return this.find(val, query, curNode.l)
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
            const parent = this.find(base.val, (val: number, curNode: BSTNode) => curNode.l?.val === val || curNode.r?.val === val)
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

/* TESTS *///////////////////////////////////////////////////////////////////////////////

/* ADD TEST *////////////////////////////////////////////////////////////////////////////
// const treeTest = new BinarySearchTree (new Set<number> ([342,3415,1,2,3,4,5,6,7,8,9,10,11,12,13,987564,78546123,78654416131854646531,14,15,16,17,18,19,20,3246643,3246,326324,34,5325,-1,-10,-324,-46456,132,-23546236,345345,3245,342,53,45,43,5,767,5,65,8,678,567,43,341,789,46548798,8798754654321,7897,46546546546541,123546,46589741]))
/* BALANCE TEST *////////////////////////////////////////////////////////////////////////
// console.log(treeTest.maxDepth(), treeTest.count())
// treeTest.balance()
// console.log(treeTest.maxDepth(), treeTest.count())
/* FIND TEST *///////////////////////////////////////////////////////////////////////////
// console.log (treeTest.find(123) ?? '', '\n', treeTest.find(342), '\n', treeTest.find(3246643), '\n', treeTest.find(8))
