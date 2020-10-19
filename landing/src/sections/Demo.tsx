/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { FileBrowser, FileList, FileSearch, FileToolbar } from 'chonky';
import React, { useState } from 'react';
import {
    rootFolderId,
    useFileActionHandler,
    useFiles,
    useFolderChain,
} from '../util/demo-util';
import { Title } from '../components/Title';

export interface DemoProps {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        demoWrapper: {
            position: 'relative',
            height: 400,
        },
    })
);

export const Demo: React.FC<DemoProps> = (props) => {
    const classes = useStyles();

    const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);
    const files = useFiles(currentFolderId);
    const folderChain = useFolderChain(currentFolderId);
    const handleFileAction = useFileActionHandler(setCurrentFolderId);

    return (
        <>
            <Title>Try it out</Title>
            <Paper className={classes.demoWrapper} elevation={3}>
                <DndProvider backend={HTML5Backend}>
                    <FileBrowser
                        files={files}
                        folderChain={folderChain}
                        onFileAction={handleFileAction}
                        enableDragAndDrop={true}
                    >
                        <FileToolbar />
                        <FileSearch />
                        <FileList />
                    </FileBrowser>
                </DndProvider>
            </Paper>
        </>
    );
};
