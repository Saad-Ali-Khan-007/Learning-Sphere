import { TreeNode } from "./tree";

export const searchTree = <T>(
  root: TreeNode<T>,
  searchTerm: T
): TreeNode<T> | null => {
  return root.findNode(searchTerm);
};
