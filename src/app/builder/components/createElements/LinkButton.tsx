"use client";

// LinkButton
import { Button } from "@mui/material";
import { ButtonElement } from "@/app/builder/types/createElementTypes";
import { useSelectedElementStore } from "@/app/store/selectedElement.store";

interface Props {
  data: ButtonElement;
}

export default function LinkButton({ data }: Props) {
  const { id, text, href, color, fontSize, fontWeight } = data;
  const { selectedId, setSelectedType, setElementProps } =
    useSelectedElementStore();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!data.href || data.href === "") {
      e.preventDefault();
    }

    if (selectedId === data.id) return;

    setSelectedType(data.type, data.id);
    setElementProps({ ...data });
  };

  const isSelected = selectedId === id;

  return (
    <Button
      href={data.href || undefined}
      onClick={(e) => {
        e.preventDefault();
        handleClick(e);
      }}
      sx={{
        backgroundColor: color,
        fontSize,
        fontWeight: data.fontWeight,
        width: data.width || "auto",
        height: data.height || "auto",
        borderRadius: data.borderRadius || "auto",
        border: isSelected ? "2px solid purple" : "none",
        boxShadow: isSelected ? "0 0 4px purple" : "none",
        "&:hover": {
          backgroundColor: color,
        },
      }}
    >
      {data.text}
    </Button>
  );
}
