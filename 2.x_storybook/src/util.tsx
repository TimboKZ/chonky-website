import { ChonkyActions, ChonkyFileActionData } from 'chonky';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/relax.css';
import React, { ReactElement, useMemo } from 'react';
import './override.css';

// We ignore some actions to avoid creating noise
const ignoredActions = new Set<String>();
ignoredActions.add(ChonkyActions.MouseClickFile.id);
ignoredActions.add(ChonkyActions.KeyboardClickFile.id);
ignoredActions.add(ChonkyActions.StartDragNDrop.id);
ignoredActions.add(ChonkyActions.EndDragNDrop.id);
ignoredActions.add(ChonkyActions.ChangeSelection.id);

export const showActionNotification = (data: ChonkyFileActionData) => {
    if (ignoredActions.has(data.action.id)) return;

    const textParts: string[] = [];

    if (data.id === ChonkyActions.MoveFiles.id) {
        textParts.push(
            `You moved ${data.payload.files.length} file(s) from ` +
                `${data.payload.source ? data.payload.source.name : '~'} ` +
                `to ${data.payload.destination.name}.`
        );
    }

    if (data.id === ChonkyActions.OpenFiles.id) {
        const fileNames = data.payload.files.map((f) => f.name);
        textParts.push(`You opened multiple files:<br/>${fileNames.join(', ')}.`);
    }

    textParts.push(`<b>Action:</b> ${data.action.id}`);

    // if (payload) {
    //     textParts.push(
    //         `<b>Payload:</b> <pre>${JSON.stringify(payload, null, 2)}</pre>`
    //     );
    // }
    // if (data.target) {
    //     textParts.push(`<b>Target:</b> <code>${data.target.name}</code>`);
    // }
    // if (data.files) {
    //     const fileNames = data.files.map((f: FileData) => f.name);
    //     const fileComps = fileNames.map((name: string) => `<code>${name}</code>`);
    //     const fileCount = fileComps.length;
    //     const fileTitle = `${fileCount} ${fileCount === 1 ? 'file' : 'files'}:`;
    //     textParts.push(`<b>${fileTitle}</b> [${fileComps.join(', ')}]`);
    // }
    const text = textParts.join('<br/>');

    new Noty({
        text,
        type: 'success',
        theme: 'relax',
        timeout: 3000,
    }).show();
};

const GIT_BRANCH = 'master';
export interface StoryLinkData {
    name?: string;
    url?: string;
    docsUrl?: string;
    gitPath?: string;
}
export const useStoryLinks = (links: StoryLinkData[]): ReactElement[] => {
    return useMemo(
        () => {
            const components = [];
            for (let i = 0; i < links.length; ++i) {
                const link = links[i];
                let name = link.name;
                let href = link.url;
                if (link.docsUrl) {
                    href = link.docsUrl;
                    if (!name) name = 'Relevant docs';
                } else if (link.gitPath) {
                    href = getGitHubLink(link.gitPath);
                    if (!name) name = 'Story source code';
                } else if (!href) {
                    throw new Error(`Link "${link.name}" has no URL specified!`);
                }

                components.push(
                    <a
                        key={`story-link-${i}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        href={href}
                    >
                        {name}
                    </a>
                );
            }
            return components;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
        // We deliberately leave hook deps empty as we don't exepct links to change.
    );
};
export const getGitHubLink = (filePath: string) =>
    `https://github.com/TimboKZ/chonky-website/blob/${GIT_BRANCH}/${filePath}`;
