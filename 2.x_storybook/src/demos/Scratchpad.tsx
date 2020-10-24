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
} from 'chonky';
import 'chonky/style/main.css';
import React, { useMemo, useState } from 'react';

import { useStoryLinks } from '../util';

const storyName = 'Scratchpad';
export const Scratchpad: React.FC = () => {
    const [selectionString, setSelectionString] = useState('');
    const files: FileArray = useMemo(
        () => [
            { id: 'cvb', name: '111' },
            { id: 'cab', name: '222' },
            { id: 'cnb', name: '333' },
            { id: 'cob', name: '444' },
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
            <button>Hello World!</button>
            <button>
                <div>Hello World!</div>
            </button>
            <FileBrowser files={files} onFileAction={handleFileAction}>
                <FileNavbar />
                <FileToolbar />
                <FileList />
            </FileBrowser>
            <pre>{selectionString}</pre>
        </div>
    );
};
(Scratchpad as any).storyName = storyName;
