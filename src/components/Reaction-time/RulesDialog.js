import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { purple } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';


const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText("#1F75FE"),
        backgroundColor: "#1F75FE",
        '&:hover': {
            backgroundColor: "#538EFF",
        },
    },
}))(Button);


//USE case:
//<RulesDialog  instructions = "some string"/>

export default function RulesDialog(textInput) {

    const {instructions} = textInput
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <ColorButton color="primary" size="large" onClick={handleClickOpen('paper')}>Instruction</ColorButton>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll='paper'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">How to Play</DialogTitle>
                <DialogContent dividers="true">
                    <DialogContentText
                        id="scroll-dialog-description"
                    >
                        {instructions}
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
