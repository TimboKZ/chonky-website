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
    FileList,
    FileNavbar,
    FileToolbar,
    setChonkyDefaults,
} from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import React, { useMemo, useState } from 'react';

import { useStoryLinks } from '../util';

setChonkyDefaults({ iconComponent: ChonkyIconFA });

const storyName = 'Scratchpad';
export const Scratchpad: React.FC = () => {
    const [selectionString, setSelectionString] = useState('');
    const files: FileArray = useMemo(
        () => [
            null, // Loading animation will be shown for this file
            null,
            {
                id: 'nTe',
                name: 'Normal file.yml',
                size: 890,
                modDate: new Date('2012-01-01'),
            },
            {
                id: 'zxc',
                name: 'Hidden file.mp4',
                isHidden: true,
                size: 890,
            },
            {
                id: 'bnm',
                name: 'Normal folder',
                isDir: true,
                childrenCount: 12,
            },
            {
                id: 'vfr',
                name: 'Symlink folder',
                isDir: true,
                isSymlink: true,
                childrenCount: 0,
            },
            {
                id: 'vfr',
                name: 'Symlink folder',
                isDir: true,
                isSymlink: true,
                childrenCount: 0,
            },
            {
                id: '7zp',
                name: 'Encrypted file.7z',
                isEncrypted: true,
            },
            {
                id: '7zp',
                name: 'Encrypted file.7z',
                isEncrypted: true,
            },
            {
                id: 'qwe',
                name: 'Not selectable.tar.gz',
                ext: '.tar.gz', // Custom extension
                selectable: false, // Disable selection
                size: 54300000000,
                modDate: new Date(),
            },
            {
                id: 'rty',
                name: 'Not openable.pem',
                openable: false, // Prevent opening
                size: 100000000,
            },
            {
                id: 'btj',
                name: 'Not draggable.csv',
                draggable: false, // Prevent this files from being dragged
            },
            {
                id: 'upq',
                name: 'Not droppable',
                isDir: true,
                droppable: false, // Prevent files from being dropped into this folder
            },
            {
                id: 'mRw',
                name: 'Unknown file name',
            },
        ],
        []
    );

    const handleFileAction = (data: ChonkyFileActionData) => {
        if (data.id === ChonkyActions.ChangeSelection.id) {
            setSelectionString(
                JSON.stringify(Array.from(data.payload.selection), null, 4)
            );
        }
    };

    return (
        <div className="story-wrapper">
            <div className="story-description">
                <h1 className="story-title">{storyName}</h1>
                <p>Please ignore this page. It is used to test new Chonky features.</p>
                <div className="story-links">
                    {useStoryLinks([
                        { gitPath: '2.x_storybook/src/demos/Scratchpad.tsx' },
                    ])}
                </div>
            </div>
            <div style={{ height: 500 }}>
                <FileBrowser
                    files={files}
                    onFileAction={handleFileAction}
                    defaultFileViewActionId={ChonkyActions.EnableListView.id}
                >
                    <FileNavbar />
                    <FileToolbar />
                    <FileList />
                </FileBrowser>
            </div>
            <pre>{selectionString}</pre>
        </div>
    );
};
(Scratchpad as any).storyName = storyName;
