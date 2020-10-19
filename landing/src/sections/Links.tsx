/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { LinkButton } from '../components/LinkButton';
import { Title } from '../components/Title';
import {
    DiscordLink,
    Docs2x,
    GitHubLink,
    MostRecentDocs,
    NpmLink,
} from '../util/links';

export interface LinksProps {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonWrapper: {
            textAlign: 'center',
        },
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
                <LinkButton linkData={Docs2x} />
                {/*<LinkButton linkData={MostRecentStorybook} />*/}
                <LinkButton linkData={DiscordLink} />
            </Box>
        </>
    );
};
