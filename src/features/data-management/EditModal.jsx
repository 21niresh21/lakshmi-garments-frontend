// EditModal.jsx
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

export default function EditModal({ open, onClose, children }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
