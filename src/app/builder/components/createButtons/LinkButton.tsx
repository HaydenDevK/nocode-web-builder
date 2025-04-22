"use client";

// LinkButton
import { Button } from "@mui/material";
import { TElement } from "@/app/model/types";
import { useBuilderStore } from "@/app/store/useBuilder.store";

interface LinkProps {
  data: TElement;
}

export default function LinkButton({ data }: LinkProps) {
  const {
    id,
    type,
    props: {
      text,
      href,
      color,
      fontSize,
      fontWeight,
      width,
      height,
      borderRadius,
    },
  } = data;
  const { selectedItemInfo, setSelectedItemInfo } = useBuilderStore();

  const isSelected = selectedItemInfo?.itemId === id;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedItemInfo({ type, itemId: id });
  };

  return (
    <Button
      href={href || undefined}
      onClick={(e) => {
        e.preventDefault();
        handleClick(e);
      }}
      sx={{
        backgroundColor: color,
        fontSize,
        fontWeight: fontWeight,
        width: width || "auto",
        height: height || "auto",
        borderRadius: borderRadius || "auto",
        border: isSelected ? "2px solid purple" : "none",
        boxShadow: isSelected ? "0 0 4px purple" : "none",
        "&:hover": {
          backgroundColor: color,
        },
      }}
    >
      {text}
    </Button>
  );
}
