import React, { useEffect, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { getNotes, insertNotes } from "../service/api";

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
  },
}));
export default function NotesSection(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [listOfNotes, setListOfNotes] = useState([]);
  const [noteval, setNoteVal] = useState("");

  useEffect(() => {
    getNotesByVin();
  }, [props.vin]);

  async function getNotesByVin() {
    let apiResponse = await getNotes(props.vin);
    console.log("getNotes==>", apiResponse);
    if (apiResponse && apiResponse.data) {
      setListOfNotes(apiResponse.data);
    }
  }

  const handleClick = () => {
    if (noteval) {
      insertNotes({ vin: props.vin, notes: noteval }).then((res) => {
        if (res.data === "Success") {
          getNotesByVin();
          setNoteVal("");
        }
      });
    }
  };

  return (
    <div className="notesSection">
      <ListItem className="notesSectionHeader">NotesSection</ListItem>
      <Box p={2}>
        <ListItem>
          <TextareaAutosize
            className="notesText notesTextContent"
            placeholder="Notes..."
            value={noteval}
            onChange={(e) => {
              setNoteVal(e.target.value);
            }}
          />
        </ListItem>
        <ListItem>
          <Box ml="auto">
            <Button
              onClick={handleClick}
              className="closeButton"
              color="secondary"
            >
              Save
            </Button>
          </Box>
        </ListItem>
        <Box py={2}>
          <Divider variant="middle" className="deviderred" />
        </Box>

        {listOfNotes &&
          listOfNotes.map((item, index) => (
            <ListItem key={index}>
              <p className="notesSectionContent">{item.notes}</p>
            </ListItem>
          ))}

        {/* <ListItem>
          <p className="notesSectionContent">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </ListItem>
        <ListItem>
          <p className="notesSectionContent">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </ListItem> */}
      </Box>
    </div>
  );
}
