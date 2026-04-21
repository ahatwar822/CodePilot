export const buildTree = (folders, files) => {
    const map = {};
    const tree = [];

    folders.forEach((folder) => {
        map[folder._id] = { ...folder, children: [], files: [] };
    });

    folders.forEach((folder) => {
        if (folder.parentFolder) {
            map[folder.parentFolder]?.children.push(map[folder._id]);
        } else {
            tree.push(map[folder._id]);
        }
    });

    files.forEach((file) => {
        if (file.folder) {
            map[file.folder]?.files.push(file);
        } else {
            tree.push(file);
        }
    });

    return tree;
};