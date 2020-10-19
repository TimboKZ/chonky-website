import {
    ChonkyActions,
    FileAction,
    FileActionData,
    FileActionHandler,
    FileArray,
    FileData,
    FileHelper,
} from 'chonky';
import 'chonky/style/main.css';
import Noty from 'noty';

import 'noty/lib/noty.css';
import 'noty/lib/themes/relax.css';
import { useCallback, useMemo } from 'react';

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

export const showActionNotification = (params: {
    action: FileAction;
    data: FileActionData;
}) => {
    const { action, data } = params;

    if (action.id === ChonkyActions.ChangeSelection.id) {
        // Don't show notifications for "change_selection" action as it creates too
        // much noise.
        return;
    }

    const textParts: string[] = [];
    textParts.push(`<b>Action:</b> ${action.id}`);
    if (data.target) {
        textParts.push(`<b>Target:</b> <code>${data.target.name}</code>`);
    }
    if (data.files) {
        const fileNames = data.files.map((f) => f.name);
        const fileComps = fileNames.map((name) => `<code>${name}</code>`);
        const fileCount = fileComps.length;
        const fileTitle = `${fileCount} ${fileCount === 1 ? 'file' : 'files'}:`;
        textParts.push(`<b>${fileTitle}</b> [${fileComps.join(', ')}]`);
    }
    const text = textParts.join('<br/>');

    new Noty({
        text,
        type: 'success',
        theme: 'relax',
        timeout: 3000,
    }).show();
};
