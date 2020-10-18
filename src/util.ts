import 'noty/lib/noty.css';
import 'noty/lib/themes/relax.css';

import { ChonkyActions, FileAction, FileActionData } from 'chonky';
import Noty from 'noty';

export const showActionNotification = (params: {
    action: FileAction;
    data: FileActionData;
}) => {
    const { action, data } = params;

    if (action.id === ChonkyActions.ChangeSelection.id) {
        // Don't show notifications for "change_selection" action as it creates too
        // much noise.
        return;
    }

    const textParts: string[] = [];
    textParts.push(`<b>Action:</b> ${action.id}`);
    if (data.target) {
        textParts.push(`<b>Target:</b> <code>${data.target.name}</code>`);
    }
    if (data.files) {
        const fileNames = data.files.map((f) => f.name);
        const fileComps = fileNames.map((name) => `<code>${name}</code>`);
        const fileCount = fileComps.length;
        const fileTitle = `${fileCount} ${fileCount === 1 ? 'file' : 'files'}:`;
        textParts.push(`<b>${fileTitle}</b> [${fileComps.join(', ')}]`);
    }
    const text = textParts.join('<br/>');

    new Noty({
        text,
        type: 'success',
        theme: 'relax',
        timeout: 3000,
    }).show();
};
