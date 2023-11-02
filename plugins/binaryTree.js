// 二叉树

class treeNode {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class binaryTree {
    constructor(value) {
        this.value = new treeNode(value);
    }

    // 添加节点
    append(value, left, right) {}

    // 前序 先找到自身值，再遍历左子节点，最后是右子节点
    traversePre(treeNode) {
        if (!treeNode) {
            return;
        }

        console.log(treeNode.value);
        // 递归
        this.traversePre(treeNode.left);
        this.traversePre(treeNode.right);
    }

    // 中序 先遍历左子节点，在找到自身值，最后是右子节点
    traverseIn(treeNode) {
        if (!treeNode) {
            return;
        }

        // 递归
        this.traversePre(treeNode.left);
        console.log(treeNode.value);
        this.traversePre(treeNode.right);
    }

    // 前序 先遍历左子节点，再是右子节点，最后找到自身值
    traversePost(treeNode) {
        if (!treeNode) {
            return;
        }

        // 递归
        this.traversePre(treeNode.left);
        this.traversePre(treeNode.right);
        console.log(treeNode.value);
    }
}

export { binaryTree };
