export class TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
  parent: TreeNode<T> | null;

  constructor(value: T, parent: TreeNode<T> | null = null) {
    this.value = value;
    this.children = [];
    this.parent = parent;
  }

  addChild(value: T): TreeNode<T> {
    const childNode = new TreeNode(value, this);
    this.children.push(childNode);
    return childNode;
  }

  removeChild(value: T): TreeNode<T> | null {
    const index = this.children.findIndex((child) => child.value === value);
    if (index > -1) {
      const [removedNode] = this.children.splice(index, 1);
      return removedNode;
    }
    return null;
  }

  findNode(value: T): TreeNode<T> | null {
    if (this.value === value) return this;
    for (const child of this.children) {
      const found = child.findNode(value);
      if (found) return found;
    }
    return null;
  }
}
