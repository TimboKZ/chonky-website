/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import { FileBrowser, FileList, FileSearch, FileToolbar } from 'chonky';
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
    rootFolderId,
    useFileActionHandler,
    useFiles,
    useFolderChain,
} from './FullDemo-hooks';

export default { title: 'File Browser' };

export interface FullDemoProps {}

export const VirtualFileSystem: React.FC<FullDemoProps> = (props) => {
    const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);
    const files = useFiles(currentFolderId);
    const folderChain = useFolderChain(currentFolderId);
    const handleFileAction = useFileActionHandler(setCurrentFolderId);
    return (
        <div style={{ maxWidth: 1280, height: 600 }}>
            <DndProvider backend={HTML5Backend}>
                <FileBrowser
                    files={files}
                    folderChain={folderChain}
                    onFileAction={handleFileAction}
                    enableDragAndDrop={true}
                >
                    <FileToolbar />
                    <FileSearch />
                    <FileList />
                </FileBrowser>
            </DndProvider>
        </div>
    );
};
(VirtualFileSystem as any).storyName = 'Virtual File System';

export const S3Browser: React.FC<FullDemoProps> = (props) => {
    const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);
    const files = useFiles(currentFolderId);
    const folderChain = useFolderChain(currentFolderId);
    const handleFileAction = useFileActionHandler(setCurrentFolderId);
    return (
        <div style={{ maxWidth: 1280, height: 600 }}>
            <DndProvider backend={HTML5Backend}>
                <FileBrowser
                    files={files}
                    folderChain={folderChain}
                    onFileAction={handleFileAction}
                    enableDragAndDrop={true}
                >
                    <FileToolbar />
                    <FileSearch />
                    <FileList />
                </FileBrowser>
            </DndProvider>
        </div>
    );
};
(S3Browser as any).storyName = 'AWS S3 Browser';
