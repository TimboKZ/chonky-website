/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import {
    ChonkyActions,
    FileActionHandler,
    FileArray,
    FileBrowser,
    FileData,
    FileHelper,
    FileList,
    FileNavbar,
    FileToolbar,
} from 'chonky';
import 'chonky/style/main.css';
import React, { useCallback, useMemo, useState } from 'react';

import { showActionNotification, useStoryLinks } from '../util';
import DemoFsMap from './demo.fs_map.json';

const rootFolderId = DemoFsMap.rootFolderId;
const fileMap = (DemoFsMap.fileMap as unknown) as {
    [fileId: string]: FileData & { childrenIds: string[] };
};

export const useFiles = (currentFolderId: string): FileArray => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];
        const files = currentFolder.childrenIds
            ? currentFolder.childrenIds.map((fileId: string) => fileMap[fileId] ?? null)
            : [];
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

export const VFSBrowser: React.FC<{ instanceId: string }> = (props) => {
    const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);
    const files = useFiles(currentFolderId);
    const folderChain = useFolderChain(currentFolderId);
    const handleFileAction = useFileActionHandler(setCurrentFolderId);
    return (
        <div style={{ height: 400 }}>
            <FileBrowser
                instanceId={props.instanceId}
                files={files}
                folderChain={folderChain}
                onFileAction={handleFileAction}
                thumbnailGenerator={(file: FileData) =>
                    file.thumbnailUrl ? `https://chonky.io${file.thumbnailUrl}` : null
                }
            >
                <FileNavbar />
                <FileToolbar />
                <FileList />
            </FileBrowser>
        </div>
    );
};

const storyName = 'Virtual File System';
export const VirtualFileSystem: React.FC = () => {
    return (
        <div className="story-wrapper">
            <div className="story-description">
                <h1 className="story-title">{storyName}</h1>
                <p>
                    This example simulates a file system on client-side, without any
                    backend interactions. The "file system" is represented as a file map
                    (a JS object), where keys are file IDs and values are objects of{' '}
                    <code>FileData</code> type.
                </p>
                <p>
                    When you delete files or move them between folders, the file map is
                    updated in memory. You can use the control bars at bottom of the
                    page to reset the file map to initial state.
                </p>
                <div className="story-links">
                    {useStoryLinks([
                        { gitPath: '2.x_storybook/src/demos/VirtualFileSystem.tsx' },
                        {
                            name: 'File map source code',
                            gitPath: '2.x_storybook/src/demos/demo.fs_map.json',
                        },
                    ])}
                </div>
            </div>
            <VFSBrowser instanceId={storyName} />
        </div>
    );
};
(VirtualFileSystem as any).storyName = storyName;
