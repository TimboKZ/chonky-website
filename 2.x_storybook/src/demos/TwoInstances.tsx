/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import 'chonky/style/main.css';
import React from 'react';

import { useStoryLinks } from '../util';
import { VFSBrowser } from './VirtualFileSystem';

const storyName = 'Two Browser Instances';
export const TwoInstances: React.FC = () => {
    return (
        <div className="story-wrapper">
            <div className="story-description">
                <h1 className="story-title">{storyName}</h1>
                <p>
                    Example of two file browser instances side by side. Note that you
                    can drag & drop files from one to another.
                </p>
                <div className="story-links">
                    {useStoryLinks([
                        { gitPath: '2.x_storybook/src/demos/TwoInstances.tsx' },
                    ])}
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, width: 0, paddingRight: 4 }}>
                    <VFSBrowser instanceId={`${storyName}-left`} />
                </div>
                <div style={{ flex: 1, width: 0, paddingLeft: 4 }}>
                    <VFSBrowser instanceId={`${storyName}-right`} />
                </div>
            </div>
        </div>
    );
};
(TwoInstances as any).storyName = storyName;
