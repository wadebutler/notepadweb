import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { subscribeToNotes, addNote, deleteNote } from "./firebase/endpoints";

export default function Notepad() {
  const [note, setNote] = useState({ title: "", body: "" });
  const [notes, setNotes] = useState([]);

  useEffect(() => subscribeToNotes(setNotes), []);

  const handleChange = (field) => (e) =>
    setNote((prev) => ({ ...prev, [field]: e.target.value }));

  const handleAdd = async () => {
    if (!note.title.trim() && !note.body.trim()) return;
    await addNote(note);
    setNote({ title: "", body: "" });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        <TextField
          label="Title"
          value={note.title}
          onChange={handleChange("title")}
          fullWidth
        />

        <TextField
          label="Body"
          value={note.body}
          onChange={handleChange("body")}
          multiline
          rows={3}
          fullWidth
        />

        <Button variant="contained" onClick={handleAdd}>
          Add Note
        </Button>
      </Box>

      <List>
        {notes.map((n) => (
          <ListItem
            key={n.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteNote(n.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={n.title} secondary={n.body} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
