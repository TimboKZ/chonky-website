/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import {
    ChonkyActions,
    ChonkyFileActionData,
    FileArray,
    FileBrowser,
    FileContextMenu,
    FileData,
    FileHelper,
    FileList,
    FileNavbar,
    FileToolbar,
} from 'chonky';
import 'chonky/style/main.css';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { showActionNotification, useStoryLinks } from '../util';
import DemoFsMap from './demo.fs_map.json';

type CustomFileData = FileData & {
    parentId?: string;
    childrenIds?: string[];
};
type CustomFileMap = { [fileId: string]: CustomFileData };

const RootFolderId = DemoFsMap.rootFolderId;
const BaseFileMap = (DemoFsMap.fileMap as unknown) as CustomFileMap;

export const useCustomFileMap = () => {
    const [fileMap, setFileMap] = useState(BaseFileMap);
    const [currentFolderId, setCurrentFolderId] = useState(RootFolderId);

    const currentFolderIdRef = useRef(currentFolderId);
    useEffect(() => {
        currentFolderIdRef.current = currentFolderId;
    }, [currentFolderId]);

    const resetFileMap = useCallback(() => {
        setFileMap(BaseFileMap);
        setCurrentFolderId(RootFolderId);
    }, []);

    const deleteFiles = useCallback(
        (files: CustomFileData[]) =>
            setFileMap((oldFileMap) => {
                const newFileMap = { ...oldFileMap };
                files.map((file) => {
                    delete newFileMap[file.id];
                    if (file.parentId) {
                        const parent = newFileMap[file.parentId]!;
                        const newChildrenIds = parent.childrenIds!.filter(
                            (id) => id !== file.id
                        );
                        newFileMap[file.parentId] = {
                            ...parent,
                            childrenIds: newChildrenIds,
                            childrenCount: newChildrenIds.length,
                        };
                    }
                });
                return newFileMap;
            }),
        []
    );

    const moveFiles = useCallback(
        (
            files: CustomFileData[],
            source: CustomFileData,
            destination: CustomFileData
        ) =>
            setFileMap((oldFileMap) => {
                const newFileMap = { ...oldFileMap };

                const moveFileIds = new Set(files.map((f) => f.id));
                const newSourceChildrenIds = source.childrenIds!.filter(
                    (id) => !moveFileIds.has(id)
                );
                newFileMap[source.id] = {
                    ...source,
                    childrenIds: newSourceChildrenIds,
                    childrenCount: newSourceChildrenIds.length,
                };
                const newDestinationChildrenIds = [
                    ...destination.childrenIds!,
                    ...files.map((f) => f.id),
                ];
                newFileMap[destination.id] = {
                    ...destination,
                    childrenIds: newDestinationChildrenIds,
                    childrenCount: newDestinationChildrenIds.length,
                };
                files.map((file) => {
                    newFileMap[file.id] = {
                        ...file,
                        parentId: destination.id,
                    };
                });
                return newFileMap;
            }),
        []
    );

    const idCounter = useRef(0);
    const createFolder = useCallback(
        (folderName: string) =>
            setFileMap((oldFileMap) => {
                const newFileMap = { ...oldFileMap };
                const newFolderId = `new-folder-${idCounter.current++}`;
                newFileMap[newFolderId] = {
                    id: newFolderId,
                    name: folderName,
                    isDir: true,
                    modDate: new Date(),
                    parentId: currentFolderIdRef.current,
                    childrenIds: [],
                    childrenCount: 0,
                };
                const parent = newFileMap[currentFolderIdRef.current];
                newFileMap[currentFolderIdRef.current] = {
                    ...parent,
                    childrenIds: [...parent.childrenIds!, newFolderId],
                };
                return newFileMap;
            }),
        [currentFolderIdRef]
    );

    return {
        fileMap,
        currentFolderId,
        setCurrentFolderId,
        resetFileMap,
        deleteFiles,
        moveFiles,
        createFolder,
    };
};

export const useFiles = (
    fileMap: CustomFileMap,
    currentFolderId: string
): FileArray => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];
        const files = currentFolder.childrenIds
            ? currentFolder.childrenIds.map((fileId: string) => fileMap[fileId] ?? null)
            : [];
        return files;
    }, [currentFolderId, fileMap]);
};

export const useFolderChain = (
    fileMap: CustomFileMap,
    currentFolderId: string
): FileArray => {
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
                break;
            }
        }

        return folderChain;
    }, [currentFolderId, fileMap]);
};

export const useFileActionHandler = (
    setCurrentFolderId: (folderId: string) => void,
    deleteFiles: (files: CustomFileData[]) => void,
    moveFiles: (files: FileData[], source: FileData, destination: FileData) => void,
    createFolder: (folderName: string) => void
) => {
    return useCallback(
        (data: ChonkyFileActionData) => {
            if (data.id === ChonkyActions.OpenFiles.id) {
                const { targetFile, files } = data.payload;
                const fileToOpen = targetFile ?? files[0];
                if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
                    setCurrentFolderId(fileToOpen.id);
                    return;
                }
            } else if (data.id === ChonkyActions.DeleteFiles.id) {
                deleteFiles(data.state.selectedFilesForAction!);
            } else if (data.id === ChonkyActions.MoveFiles.id) {
                moveFiles(
                    data.payload.files,
                    data.payload.source!,
                    data.payload.destination
                );
            } else if (data.id === ChonkyActions.CreateFolder.id) {
                const folderName = prompt('Provide the name for your new folder:');
                if (folderName) createFolder(folderName);
            }

            showActionNotification(data);
        },
        [createFolder, deleteFiles, moveFiles, setCurrentFolderId]
    );
};

const VFSBrowser: React.FC<{ instanceId: string }> = (props) => {
    const {
        fileMap,
        currentFolderId,
        setCurrentFolderId,
        resetFileMap,
        deleteFiles,
        moveFiles,
        createFolder,
    } = useCustomFileMap();
    const files = useFiles(fileMap, currentFolderId);
    const folderChain = useFolderChain(fileMap, currentFolderId);
    const handleFileAction = useFileActionHandler(
        setCurrentFolderId,
        deleteFiles,
        moveFiles,
        createFolder
    );
    const fileActions = useMemo(
        () => [ChonkyActions.CreateFolder, ChonkyActions.DeleteFiles],
        []
    );
    return (
        <>
            <button onClick={resetFileMap} style={{ marginBottom: 10 }}>
                Reset file map
            </button>
            <div style={{ height: 400 }}>
                <FileBrowser
                    instanceId={props.instanceId}
                    files={files}
                    folderChain={folderChain}
                    fileActions={fileActions}
                    onFileAction={handleFileAction}
                    thumbnailGenerator={(file: FileData) =>
                        file.thumbnailUrl
                            ? `https://chonky.io${file.thumbnailUrl}`
                            : null
                    }
                >
                    <FileNavbar />
                    <FileToolbar />
                    <FileList />
                    <FileContextMenu />
                </FileBrowser>
            </div>
        </>
    );
};

const storyName = 'VFS (Mutable)';
export const MutableVirtualFileSystem: React.FC = () => {
    return (
        <div className="story-wrapper">
            <div className="story-description">
                <h1 className="story-title">
                    {storyName.replace('VFS', 'Virtual File System')}
                </h1>
                <p>
                    This example simulates a file system on client-side, without any
                    backend interactions. The "file system" is represented as a file map
                    (a JS object), where keys are file IDs and values are objects of{' '}
                    <code>FileData</code> type.
                </p>
                <p>
                    This example shows a <strong>mutable</strong> file system - you can
                    delete files, move files around using drag & drop, or even create
                    new folders.
                </p>
                <div className="story-links">
                    {useStoryLinks([
                        { gitPath: '2.x_storybook/src/demos/VFSMutable.tsx' },
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
(MutableVirtualFileSystem as any).storyName = storyName;
