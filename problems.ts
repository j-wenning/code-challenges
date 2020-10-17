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
    add (val: number, curNode: BSTNode = this.root): BSTNode {
        if (!curNode) {
            const node = new BSTNode(val)
            if (!this.root) this.root = node
            return node
        }
        if (val > curNode.val) curNode.r = this.add(val, curNode.r)
        if (val < curNode.val) curNode.l = this.add(val, curNode.l)
        return curNode
    }
    find (val: Number, curNode: BSTNode = this.root): BSTNode {
        if (!curNode || val === curNode.val) return curNode
        if (val > curNode.val) return this.find(val, curNode.r)
        if (val < curNode.val) return this.find(val, curNode.l)
    }
}

// const treeTest = new BinarySearchTree (new Set<number> ([342,3415,3246643,3246,326324,34,5325,345345,3245,342,53,45,43,5,767,5,65,8,678,567,43,341]))

// console.log (treeTest.find(123) ?? '', '\n', treeTest.find(342), '\n', treeTest.find(3246643))
