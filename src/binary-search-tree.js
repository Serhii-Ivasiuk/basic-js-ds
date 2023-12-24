const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
    constructor() {
        this.rootNode = null;
    }

    root() {
        return this.rootNode;
    }

    add(data) {
        if (!this.rootNode) {
            this.rootNode = new Node(data);
        } else {
            addNode(this.rootNode, data);
        }

        function addNode(node, data) {
            if (data < node.data) {
                if (!node.left) {
                    node.left = new Node(data);
                } else {
                    addNode(node.left, data);
                }
            } else if (data > node.data) {
                if (!node.right) {
                    node.right = new Node(data);
                } else {
                    addNode(node.right, data);
                }
            } else {
                return node;
            }
        }
    }

    has(data) {
        let currentNode = this.root();

        while (currentNode) {
            if (data === currentNode.data) return true;

            if (data < currentNode.data) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        return false;
    }

    find(data) {
        let currentNode = this.root();

        while (data !== currentNode.data) {
            if (data < currentNode.data) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }

            if (!currentNode) return null;
        }

        return currentNode;
    }

    remove(data) {
        this.rootNode = removeNode(this.rootNode, data);

        function removeNode(node, data) {
            if (!node) return null;

            if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            }

            if (data > node.data) {
                node.right = removeNode(node.right, data);
                return node;
            }

            if (data === node.data) {
                if (!node.left && !node.right) {
                    node = null;
                    return node;
                }

                if (!node.left) {
                    node = node.right;
                    return node;
                }

                if (!node.right) {
                    node = node.left;
                    return node;
                }

                let minFromRightNode = node.right;

                while (minFromRightNode.left) {
                    minFromRightNode = minFromRightNode.left;
                }

                node.data = minFromRightNode.data;

                node.right = removeNode(node.right, minFromRightNode.data);

                return node;
            }
        }
    }

    min() {
        if (!this.rootNode) return null;

        let currentNode = this.root();

        while (currentNode.left) {
            currentNode = currentNode.left;
        }

        return currentNode.data;
    }

    max() {
        if (!this.rootNode) return null;

        let currentNode = this.root();

        while (currentNode.right) {
            currentNode = currentNode.right;
        }

        return currentNode.data;
    }
}

module.exports = {
    BinarySearchTree,
};
