import 'chonky/style/main.css';

import {
    ChonkyActions,
    FileActionHandler,
    FileArray,
    FileData,
    FileHelper,
} from 'chonky';
import { useCallback, useMemo } from 'react';

import { showActionNotification } from '../util';
import DemoFsMap from './demo.fs_map.json';

export const { rootFolderId } = DemoFsMap;

const fileMap = (DemoFsMap.fileMap as unknown) as {
    [fileId: string]: FileData & { childrenIds: string[] };
};

export const useFiles = (currentFolderId: string): FileArray => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];
        const files = !currentFolder.childrenIds
            ? []
            : currentFolder.childrenIds.map((fileId) => {
                  const file = fileMap[fileId];
                  return file ? file : null;
              });
        return files;
    }, [currentFolderId]);
};

export const useFolderChain = (currentFolderId: string): FileArray => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];

        const folderChain = [currentFolder];

        let parentId = currentFolder.parentId;
        while (parentId) {
            const parentFile = fileMap[parentId];
            if (parentFile) {
                folderChain.unshift(parentFile);
                parentId = parentFile.parentId;
            } else {
                parentId = null;
            }
        }

        return folderChain;
    }, [currentFolderId]);
};

export const useFileActionHandler = (
    setCurrentFolderId: (folderId: string) => void
): FileActionHandler => {
    const handleFileAction = useCallback(
        (action, actionData) => {
            if (action.id === ChonkyActions.OpenFiles.id) {
                let targetFile = null;
                if (actionData.target) {
                    targetFile = actionData.target;
                } else if (actionData.files && actionData.files.length === 1) {
                    targetFile = actionData.files[0];
                }
                if (targetFile && FileHelper.isDirectory(targetFile)) {
                    setCurrentFolderId(targetFile.id);
                    return;
                }
            }
            showActionNotification({ action, data: actionData });
        },
        [setCurrentFolderId]
    );
    return handleFileAction;
};
