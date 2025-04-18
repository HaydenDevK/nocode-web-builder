"use client";

import { Button } from "@mui/material";
import { ButtonElement } from "@/app/builder/types/createElementTypes";
import { useSelectedElementStore } from "@/app/store/selectedElement.store";

interface Props {
  data: ButtonElement;
}

export default function LinkButton({ data }: Props) {
  const { id, text, href, color, fontSize, fontWeight, borderRadius } = data;
  const { selectedId, setSelectedType, setElementProps } =
    useSelectedElementStore();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedType(data.type, data.id);
    setElementProps({ ...data });
  };

  const isSelected = selectedId === id;

  return (
    <Button
      href={data.href}
      onClick={handleClick}
      sx={{
        backgroundColor: color,
        fontSize,
        fontWeight,
        borderRadius,
        px: 3,
        py: 1,
        border: isSelected ? "2px solid #1976d2" : "none",
        boxShadow: isSelected ? "0 0 4px #1976d2" : "none",
        "&:hover": {
          backgroundColor: color,
        },
      }}
    >
      {data.text}
    </Button>
  );
}
