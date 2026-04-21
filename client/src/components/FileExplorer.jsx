import { useEffect, useState } from "react";
import api from "../services/api";
import { useFile } from "../context/FileContext";
import { useEditor } from "../context/EditorContext";
import { getLanguageFromFile } from "../utils/getLanguage";
import { buildTree } from "../utils/buildTree";

import ContextMenu from "./ContextMenu";
import ConfirmModal from "./ConfirmModal";

import {
  renameFileAPI,
  deleteFileAPI,
} from "../services/file.service";

import {
  renameFolderAPI,
  deleteFolderAPI,
} from "../services/folder.service";

const FileExplorer = () => {
  const {
    files,
    setFiles,
    folders,
    setFolders,
    openTabs,
    setOpenTabs,
    setActiveFile,
  } = useFile();

  const { setCode, setLanguage } = useEditor();

  const [newFile, setNewFile] = useState("");
  const [newFolder, setNewFolder] = useState("");

  const [menu, setMenu] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 🔥 fetch
  const fetchData = async () => {
    try {
      const fileRes = await api.get("/file");
      const folderRes = await api.get("/folder");

      setFiles(fileRes.data.data);
      setFolders(folderRes.data.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  CLOSE MENU ON CLICK OUTSIDE
  useEffect(() => {
    const closeMenu = () => setMenu(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  //  open file
  const openFile = (file) => {
    setActiveFile(file);
    setCode(file.content || "");
    setLanguage(getLanguageFromFile(file.name));

    const exists = openTabs.find((f) => f._id === file._id);
    if (!exists) {
      setOpenTabs([...openTabs, file]);
    }
  };

  //  create file
  const createFile = async () => {
    if (!newFile) return;

    await api.post("/file", { name: newFile });
    setNewFile("");
    fetchData();
  };

  //  create folder
  const createFolder = async () => {
    if (!newFolder) return;

    await api.post("/folder", { name: newFolder });
    setNewFolder("");
    fetchData();
  };

  //  right click
  const handleRightClick = (e, item, type) => {
    e.preventDefault();

    setSelectedItem({ ...item, type });

    setMenu({
      x: e.pageX,
      y: e.pageY,
    });
  };

  //  rename
  const handleRename = async () => {
    const newName = prompt("Enter new name");
    if (!newName) return;

    try {
      if (selectedItem.type === "file") {
        await renameFileAPI(selectedItem._id, newName);
      } else {
        await renameFolderAPI(selectedItem._id, newName);
      }

      fetchData();
    } catch (err) {
      console.error("Rename error", err);
    }
  };

  //  delete
  const handleDelete = async () => {
    try {
      if (selectedItem.type === "file") {
        await deleteFileAPI(selectedItem._id);
      } else {
        await deleteFolderAPI(selectedItem._id);
      }

      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  //  render tree
  const renderTree = (node, level = 0) => {
    // FILE
    if (!node.children) {
      return (
        <div
          key={node._id}
          style={{ paddingLeft: level * 10 }}
          className="cursor-pointer hover:bg-gray-700"
          onClick={() => openFile(node)}
          onContextMenu={(e) => handleRightClick(e, node, "file")}
        >
          📄 {node.name}
        </div>
      );
    }

    // FOLDER
    return (
      <div key={node._id}>
        <div
          style={{ paddingLeft: level * 10 }}
          className="text-yellow-400 cursor-pointer hover:bg-gray-700"
          onContextMenu={(e) => handleRightClick(e, node, "folder")}
        >
          📁 {node.name}
        </div>

        {node.files?.map((file) => renderTree(file, level + 1))}
        {node.children?.map((child) => renderTree(child, level + 1))}
      </div>
    );
  };

  const tree = buildTree(folders, files);

  return (
    <div className="p-2 text-sm relative">

      <h2 className="mb-2">Explorer</h2>

      {/* Create file */}
      <input
        value={newFile}
        onChange={(e) => setNewFile(e.target.value)}
        placeholder="New file"
        className="w-full p-1 mb-1 bg-gray-700"
      />
      <button onClick={createFile} className="w-full bg-blue-600 mb-2">
        Create File
      </button>

      {/* Create folder */}
      <input
        value={newFolder}
        onChange={(e) => setNewFolder(e.target.value)}
        placeholder="New folder"
        className="w-full p-1 mb-1 bg-gray-700"
      />
      <button onClick={createFolder} className="w-full bg-green-600 mb-2">
        Create Folder
      </button>

      {/* TREE */}
      <div>
        {tree.map((node) => renderTree(node))}
      </div>

      {/*  Context Menu (GLOBAL, NOT inside tree) */}
      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          options={[
            { label: "Rename", onClick: handleRename },
            { label: "Delete", onClick: () => setShowModal(true) },
          ]}
        />
      )}

      {/*  Confirm Modal */}
      <ConfirmModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Are you sure you want to delete?"
      />

    </div>
  );
};

export default FileExplorer;