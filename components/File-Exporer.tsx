import { useState } from "react";
import { TreeNode } from "../utils/tree";
import { Stack } from "../utils/stack";
import { searchTree } from "../utils/search";

const FileExplorer = () => {
  const [root, setRoot] = useState<TreeNode<string>>(new TreeNode("root"));
  const [trash, setTrash] = useState<Stack<TreeNode<string>>>(new Stack());
  const [searchTerm, setSearchTerm] = useState<string>("");

  const addFile = (parentValue: string, fileName: string) => {
    const parent = root.findNode(parentValue);
    if (parent) {
      parent.addChild(fileName);
    }
  };

  const deleteFile = (value: string) => {
    const parent = root.findNode("root"); // Assume deleting from root.
    if (parent) {
      const removedNode = parent.removeChild(value);
      if (removedNode) {
        trash.push(removedNode);
      }
    }
  };

  const restoreFile = () => {
    const nodeToRestore = trash.pop();
    if (nodeToRestore) {
      const parent = nodeToRestore.parent;
      if (parent) {
        parent.children.push(nodeToRestore);
      }
    }
  };

  const handleSearch = () => {
    const result = searchTree(root, searchTerm);
    if (result) {
      alert(`Found: ${result.value}`);
    } else {
      alert("Not Found");
    }
  };

  return (
    <div>
      <h1>File Explorer</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={restoreFile}>Restore Last Deleted</button>
      {/* Display the tree structure */}
      <ul>
        {root.children.map((child) => (
          <li key={child.value}>{child.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;
