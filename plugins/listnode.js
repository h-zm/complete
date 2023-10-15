// 链表子单元
class Node {
    constructor(value, next = null) {
        // 节点值
        this.value = value === undefined ? 0 : value;
        // 下一个节点索引，访问 next 指向下一个节点（后继节点）
        this.next = next;
    }
}

// 单链
class signleLink {
    constructor(value) {
        // 设置头节点
        this.head = new Node(value);
    }

    // 头部添加节点
    addHead(value) {
        let firstNode = this.head;
        this.head = new Node(value, firstNode);
    }

    // 删除头部节点
    delHead() {
        let firstNode = this.head;
        if (firstNode) {
            this.head = firstNode.next;
        }
    }

    // 指定位置添加节点
    insert(value, sortIndex) {}

    // 末尾追加节点
    append(value) {
        // 兼容头节点为null情况
        if (!this.head) {
            return (this.head = new Node(value));
        }

        // currentNode Node结构数据
        let currentNode = this.head;
        while (currentNode.next) {
            currentNode = currentNode.next;
        }

        currentNode.next = new Node(value);
    }

    // 删除末尾节点
    delTail() {
        let tempNode = this.head;
        let preNode = null;
        while (tempNode?.next) {
            preNode = tempNode;
            tempNode = tempNode.next;
        }

        if (preNode) {
            preNode.next = null;
        } else {
            // 没有后继节点 直接清空头节点
            this.head = null;
        }
    }

    // 去重复
    pastRepeat() {
        let currentNode = this.head;
        // 添加此参数是为了兼容未排序链表
        let alreadyList = [];
        let preNode = null;
        while (currentNode) {
            if (!alreadyList.includes(currentNode.value)) {
                alreadyList.push(currentNode.value);
                preNode = currentNode;
            } else {
                // 已存在的只想当前节点的后继节点
                preNode.next = currentNode?.next || null;
            }

            currentNode = currentNode?.next || null;
        }
    }

    // 删除某一节点值
    delValue(value) {
        let currentNode = this.head;
        let preNode = null;
        while (currentNode) {
            if (currentNode.value === value) {
                preNode.next = currentNode?.next || null;
            } else {
                preNode = currentNode;
            }
            currentNode = currentNode?.next || null;
        }
    }

    // 打印值域
    print() {
        let valueList = [];
        let currentNode = this.head;
        while (currentNode) {
            valueList.push(currentNode.value);
            currentNode = currentNode?.next || null;
        }
        return valueList;
    }
}

// 双链
class doubleNode {
    constructor(value, pre = null, next = null) {
        // 节点，双链中头节点没有pre，尾节点没有next
        this.value = value === undefined ? 0 : value;
        this.pre = pre;
        this.next = next;
    }
}

class doubleLink {
    constructor(value, pre = null, next = null) {
        this.head = new doubleNode(value);
    }

    append(value) {
        let currentNode = this.head;
        let preNode = null;
        while (currentNode.next) {
            preNode = currentNode;
            currentNode = currentNode.next;
        }

        // 兼容头部节点
        if (!currentNode) {
            this.head = new doubleNode(value);
        } else {
            currentNode.next = new doubleNode(value, preNode);
        }
    }

    // 打印值域
    print() {
        let valueList = [];
        let currentNode = this.head;
        while (currentNode) {
            valueList.push(currentNode.value);
            currentNode = currentNode?.next || null;
        }
        return valueList;
    }
}

export { signleLink, doubleLink };
