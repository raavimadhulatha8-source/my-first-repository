class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

let root = null;

function height(node) {
    if (node == null) {
        return 0;
    }

    return node.height;
}

function balance(node) {
    if (node == null) {
        return 0;
    }

    return height(node.left) - height(node.right);
}

function rightRotate(y) {
    let x = y.left;
    let t = x.right;

    x.right = y;
    y.left = t;

    y.height = Math.max(height(y.left), height(y.right)) + 1;
    x.height = Math.max(height(x.left), height(x.right)) + 1;

    return x;
}

function leftRotate(x) {
    let y = x.right;
    let t = y.left;

    y.left = x;
    x.right = t;

    x.height = Math.max(height(x.left), height(x.right)) + 1;
    y.height = Math.max(height(y.left), height(y.right)) + 1;

    return y;
}

function insertNode(node, data) {

    if (node == null) {
        return new Node(data);
    }

    if (data < node.data) {
        node.left = insertNode(node.left, data);
    }
    else if (data > node.data) {
        node.right = insertNode(node.right, data);
    }
    else {
        return node;
    }

    node.height =
        Math.max(height(node.left), height(node.right)) + 1;

    let b = balance(node);

    // LL
    if (b > 1 && data < node.left.data) {
        return rightRotate(node);
    }

    // RR
    if (b < -1 && data > node.right.data) {
        return leftRotate(node);
    }

    // LR
    if (b > 1 && data > node.left.data) {
        node.left = leftRotate(node.left);
        return rightRotate(node);
    }

    // RL
    if (b < -1 && data < node.right.data) {
        node.right = rightRotate(node.right);
        return leftRotate(node);
    }

    return node;
}

function insert() {

    let input = document.getElementById("number");
    let data = Number(input.value);

    if (input.value == "") {
        alert("Enter a number");
        return;
    }

    root = insertNode(root, data);

    input.value = "";

    display();
}

function display() {

    let tree = document.getElementById("tree");
    tree.innerHTML = "";

    if (root == null) {
        tree.innerHTML = "Tree is empty";
        return;
    }

    let queue = [root];

    while (queue.length > 0) {

        let level = document.createElement("div");
        level.className = "level";

        let size = queue.length;

        for (let i = 0; i < size; i++) {

            let node = queue.shift();

            let element = document.createElement("span");
            element.className = "node";
            element.innerHTML = node.data;

            level.appendChild(element);

            if (node.left != null) {
                queue.push(node.left);
            }

            if (node.right != null) {
                queue.push(node.right);
            }
        }

        tree.appendChild(level);
    }
}

function clearTree() {
    root = null;
    document.getElementById("tree").innerHTML = "Tree is empty";
}