import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ActionsCellProps {
  objectId: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const ActionsCell: React.FC<ActionsCellProps> = React.memo(
  ({ objectId, onDelete, onEdit }) => {
    return (
      <div className="flex items-center justify-center w-full h-full gap-2">
        <IconButton
          aria-label="editar"
          size="small"
          color="inherit"
          onClick={() => onEdit(objectId)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="eliminar"
          size="small"
          color="inherit"
          onClick={() => onDelete(objectId)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    );
  }
);
