import React from 'react';
import { ChonkyActions, FileBrowser } from 'chonky';

const myComp = (
    <FileBrowser
        files={[]}
        defaultSortActionId={null}
        disableDefaultFileActions={[
            ChonkyActions.SortFilesByName.id,
            ChonkyActions.SortFilesByDate.id,
            ChonkyActions.SortFilesBySize.id,
        ]}
    >
        {/* ... */}
    </FileBrowser>
);
