import { db } from "./config";
import { ref, push, set, remove, onValue } from "firebase/database";

export const subscribeToNotes = (callback) => {
  const notesRef = ref(db, "notes");
  return onValue(notesRef, (snapshot) => {
    const data = snapshot.val();
    const list = data
      ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
      : [];
    callback(list.reverse());
  });
};

export const addNote = async (note) => {
  const notesRef = ref(db, "notes");
  const newRef = push(notesRef);
  await set(newRef, { ...note, createdAt: Date.now() });
};

export const updateNote = async (id, note) => {
  await set(ref(db, `notes/${id}`), { ...note, createdAt: Date.now() });
};

export const deleteNote = async (id) => {
  await remove(ref(db, `notes/${id}`));
};
