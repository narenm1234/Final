import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    root: {
        width: "30px",
        height: "30px",
        backgroundColor: "#B80F0A",
        borderRadius: "50%",
        fontSize: "12px",
        padding: "10px 20px 13px 12px",
        color: "white",
    },
    sideBarCSS: {
        marginLeft: "16px",
    }
}));
export default function NotesSection() {
    const [open, setOpen] = React.useState(true);
    const classes = useStyles();
    const handleClick = () => {
        //setOpen(!open);
    };
    return (
        <div className="notesSection">
            <ListItem className="notesSectionHeader">
                NotesSection
            </ListItem>
            <ListItem>
                <div className="notesText">
                    <p className="notesTextContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

            </ListItem>
            <ListItem >
                <Button autoFocus onClick={handleClick} className="closeButton" color="secondary" align="right">
                    Save
                </Button>
            </ListItem>
            <Divider variant="middle" />

            <ListItem >
                <p className="notesSectionContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </ListItem>
            <ListItem >
                <p className="notesSectionContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </ListItem>
            <ListItem >
                <p className="notesSectionContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </ListItem>

        </div>
    )
}