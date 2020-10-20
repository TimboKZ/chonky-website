import React from 'react';
import { useStoryLinks } from '../util';

export default {
    title: 'Introduction',
};

export const About: React.FC = () => {
    return (
        <div className="story-wrapper">
            <div className="story-description">
                <h1 className="story-title">Chonky v2.x Storybook</h1>
                <p>
                    This is the Storybook for Chonky v2.x. It contains code examples for
                    different Chonky use cases. Please use the sidebar to choose a
                    relevant story.
                </p>
                <p>
                    Code examples do not include an in-depth documentation. If you're
                    looking for documentation, please follow links below.
                </p>
                <div className="story-links">
                    {useStoryLinks([
                        {
                            name: 'Chonky v2.x Docs',
                            url: 'https://chonky.io/docs/2.x/',
                        },
                    ])}
                </div>
            </div>
        </div>
    );
};
