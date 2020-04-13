import Link from "next/link";
import React from "react";

import { Toolbar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
    createStyles,
    withStyles,
    WithStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

function styles() {
    return createStyles({
        root: {
            // paddingTop: theme.spacing.unit * 20
            paddingTop: 20
        }
    });
}

interface Props {
    children?: React.ReactNode;
}

interface State {
    openDialog: boolean;
}

class Index extends React.Component<
    Props & WithStyles<typeof styles>,
    State
    > {
    public state = {
        openDialog: false
    };

    constructor(props: Props & WithStyles<typeof styles>) {
        super(props);
    }

    public handleCloseDialog = () => {
        this.setState({
            openDialog: false
        });
    };

    public handleClickShowDialog = () => {
        this.setState({
            openDialog: true
        });
    };

    public render() {
        const { classes } = this.props;
        const { openDialog } = this.state;

        return (
            <div className={classes.root}>
                <Dialog open={openDialog} onClose={this.handleCloseDialog}>
                    <DialogTitle>Dialog Sample</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Easy to use Material UI Dialog.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.handleCloseDialog}
                        >
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            TypeScript + Next.js + Material UI Sample
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Typography gutterBottom={true}>
                    Material-UI
                </Typography>
                <Typography gutterBottom={true}>
                    example project
                </Typography>
                <Typography gutterBottom={true}>
                    <Link href="/about">
                        <a>Go to the about page</a>
                    </Link>
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleClickShowDialog}
                >
                    Shot Dialog
                </Button>
                <style jsx={true}>{`
                 .root {
                     text-align: center;
                 }
             `}</style>
            </div>
        );
    }
}

export default withStyles(styles)(Index);