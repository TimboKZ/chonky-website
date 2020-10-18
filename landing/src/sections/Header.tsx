/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export interface HeaderProps {
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            textAlign: 'center',
            marginTop: 40,
        },
        logo: {
            maxWidth: 400,
            width: '100%',
        },
    })
);

export const Header: React.FC<HeaderProps> = (props) => {
    const classes = useStyles();

    return <header className={classes.header}>
        <img
            className={classes.logo}
            alt="Chonky - A File Browser for React"
            src="./Chonky_clear.png"
        />
        <Typography variant="h5" gutterBottom>
            A File Browser for React
        </Typography>
    </header>;
};
