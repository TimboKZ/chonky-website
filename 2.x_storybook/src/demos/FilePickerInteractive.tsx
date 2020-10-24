/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import {
    ChonkyActions,
    ChonkyFileActionData,
    ChonkyIconName,
    defineFileAction,
    FileAction,
    FileArray,
    FileBrowser,
    FileContextMenu,
    FileList,
    FileNavbar,
    FileToolbar,
} from 'chonky';
import 'chonky/style/main.css';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useStoryLinks } from '../util';

const useFiles = () => {
    return useMemo(() => {
        const files: FileArray = [];
        for (let i = 0; i < 8; ++i) {
            files.push({
                id: `file-${i}`,
                name: `${String.fromCharCode(65 + i).repeat(5)}.pdf`,
            });
        }
        files.push(null);
        return files;
    }, []);
};

const useFilePickerLogic = () => {
    const [names, setNames] = useState<(string | null)[]>([null, null, null]);
    const namesRef = useRef(names);
    useEffect(() => {
        namesRef.current = names;
    }, [names]);

    const setName = useCallback(
        (index: number, name: string | null) =>
            setNames((oldNames) => {
                const newNames = [...oldNames];
                newNames[index] = name;
                return newNames;
            }),
        []
    );

    const handleFileAction = useCallback(
        (data: ChonkyFileActionData) => {
            if (data.id === ChonkyActions.OpenFiles.id) {
                if (data.payload.targetFile) {
                    for (let i = 0; i < namesRef.current.length; ++i) {
                        if (namesRef.current[i] === null) {
                            setName(i, data.payload.targetFile.name);
                            break;
                        }
                    }
                }
            }
        },
        [setName]
    );

    return {
        handleFileAction,
        names,
        setName,
    };
};

const useFileActions = (
    nameCount: number,
    setName: (index: number, name: string | null) => void
) => {
    return useMemo(() => {
        const fileActions: FileAction[] = [];
        for (let i = 0; i < nameCount; ++i) {
            fileActions.push(
                defineFileAction(
                    {
                        id: `choose_file_${i + 1}`,
                        button: {
                            name: `Choose file #${i + 1}`,
                            contextMenu: true,
                            icon: ChonkyIconName.config,
                        },
                    } as const,
                    ({ state }) => {
                        if (state.contextMenuTriggerFile) {
                            setName(i, state.contextMenuTriggerFile.name);
                        }
                    }
                )
            );
        }
        return fileActions;
    }, [nameCount, setName]);
};

const FilePicker = () => {
    const files = useFiles();
    const { handleFileAction, names, setName } = useFilePickerLogic();

    const fileActions = useFileActions(names.length, setName);

    const nameComponents = names.map((name, index) => {
        const numStr = `#${index + 1}`;
        const isWaiting =
            !name && names.slice(0, index).filter((n) => n === null).length !== 0;
        return (
            <div key={`picker-${index}`} style={{ marginBottom: 10 }}>
                <em>File {numStr}:</em>{'  '}
                {isWaiting ? (
                    'Waiting...'
                ) : (
                    <strong>
                        {names[index] ??
                            `Please double click on file ${numStr} ` +
                                `(or use context menu)`}
                    </strong>
                )}{'  '}
                {name && <button onClick={() => setName(index, null)}>Reset</button>}
            </div>
        );
    });

    return (
        <>
            <div>{nameComponents}</div>
            <div style={{ height: 400 }}>
                <FileBrowser
                    files={files}
                    fileActions={fileActions}
                    onFileAction={handleFileAction}
                    disableSelection={true}
                    disableDefaultFileActions={[
                        ChonkyActions.OpenSelection.id,
                        ChonkyActions.SelectAllFiles.id,
                        ChonkyActions.ClearSelection.id,
                    ]}
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

const storyName = 'File Picker (Interactive)';
export const FilePickerInteractive: React.FC = () => {
    return (
        <div className="story-wrapper">
            <div className="story-description">
                <h1 className="story-title">{storyName}</h1>
                <p>
                    This demo shows an example application where the user needs to pick
                    3 files for some operation. Users can change their selection at any
                    point.
                </p>
                <div className="story-links">
                    {useStoryLinks([
                        {
                            gitPath:
                                '2.x_storybook/src/demos/FilePickerInteractive.tsx',
                        },
                    ])}
                </div>
                <FilePicker />
            </div>
        </div>
    );
};
(FilePickerInteractive as any).storyName = storyName;
