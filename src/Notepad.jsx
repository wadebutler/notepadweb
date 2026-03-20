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
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  subscribeToNotes,
  addNote,
  updateNote,
  deleteNote,
} from "./firebase/endpoints";

export default function Notepad() {
  const [note, setNote] = useState({ title: "", body: "" });
  const [activeId, setActiveId] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => subscribeToNotes(setNotes), []);

  const handleChange = (field) => (e) =>
    setNote((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = async () => {
    if (!note.title.trim() && !note.body.trim()) return;
    const saved = { ...note };
    if (!saved.title.trim()) saved.title = `Note ${notes.length + 1}`;
    if (activeId) {
      await updateNote(activeId, saved);
    } else {
      await addNote(saved);
    }
    setNote({ title: "", body: "" });
    setActiveId(null);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mt: 4, px: 2 }}>
      <Box
        sx={{
          flex: "0 0 80%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {activeId && (
          <Button
            variant="contained"
            style={{ background: "#209CEE" }}
            onClick={() => {
              setActiveId("");
              setNote({ title: "", body: "" });
            }}
          >
            New Note
          </Button>
        )}
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
          rows={20}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleSave}
          style={
            !note.body.trim()
              ? { background: "#9c9c9c", color: "#c2c2c2" }
              : { background: "#209CEE" }
          }
          disabled={!note.body.trim()}
        >
          {activeId ? "Update Note" : "Add Note"}
        </Button>
      </Box>

      <Box sx={{ flex: "0 0 20%", overflow: "auto" }}>
        <List>
          {notes.map((n) => (
            <Box key={n.id}>
              <ListItem
                onClick={() => {
                  setNote({ title: n.title, body: n.body });
                  setActiveId(n.id);
                }}
                sx={{ cursor: "pointer" }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(n.id);
                    }}
                  >
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
                }
              >
                <ListItemText primary={n.title} />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
}
