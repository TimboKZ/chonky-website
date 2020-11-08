/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import {
    defineFileAction,
    FileBrowser,
    FileList,
    FileNavbar,
    FileToolbar,
    FileViewMode,
    setChonkyDefaults,
} from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import {OpenFilesPayload} from 'chonky/lib/types/action-payloads.types';
import React from 'react';

import { useStoryLinks } from '../util';

setChonkyDefaults({ iconComponent: ChonkyIconFA });

const storyName = 'Scratchpad';
export const Scratchpad: React.FC = () => {
    const files = [
        { id: 'zxc', name: 'zxc' },
        { id: 'vfd', name: 'zxc' },
        { id: 'sdasd', name: 'zxc' },
        { id: 'drwg', name: 'zxc' },
    ];

    const action = defineFileAction({
        id: 'giant_thumbs',
        button: {
            name: 'Giant thumbs',
            toolbar: true,
        },
        fileViewConfig: {
            mode: FileViewMode.Grid,
            entryHeight: 400,
            entryWidth: 400,
        },
    });

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
            <div style={{ height: 300 }}>
                <FileBrowser
                    files={files}
                    fileActions={[action]}
                    defaultFileViewActionId={action.id}
                    disableDragAndDrop={true}
                >
                    <FileNavbar />
                    <FileToolbar />
                    <FileList />
                </FileBrowser>
            </div>
            <FileBrowser
                files={files}
                disableDragAndDrop={true}
            >
                <FileNavbar />
                <FileToolbar />
                <FileList />
            </FileBrowser>
        </div>
    );
};
(Scratchpad as any).storyName = storyName;
