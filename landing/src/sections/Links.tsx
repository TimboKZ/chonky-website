/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { LinkButton } from '../components/LinkButton';
import { Title } from '../components/Title';
import {
    GitHubLink,
    MostRecentDocs,
    MostRecentStorybook,
    NpmLink,
} from '../util/links';

export interface LinksProps {}

const getButtonStyles = (theme: Theme, color: string): CSSProperties => ({
    color: theme.palette.getContrastText(color),
    backgroundColor: color,
    '&:hover': {
        backgroundColor: color,
    },
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonWrapper: {
            textAlign: 'center',
        },
        button: {
            textTransform: 'none',
            fontWeight: 'bold',
            margin: 5,
        },
        githubButton: getButtonStyles(theme, '#515c67'),
        npmButton: getButtonStyles(theme, '#01a3a4'),
        docsButton: getButtonStyles(theme, '#2e86de'),
        storybookButton: getButtonStyles(theme, '#5f27cd'),
    })
);

export const Links: React.FC<LinksProps> = (props) => {
    const classes = useStyles();

    return (
        <>
            <Title>Quick links</Title>
            <Box className={classes.buttonWrapper}>
                <LinkButton linkData={GitHubLink} />
                <LinkButton linkData={NpmLink} />
                <LinkButton linkData={MostRecentDocs} />
                <LinkButton linkData={MostRecentStorybook} />
            </Box>
        </>
    );
};
