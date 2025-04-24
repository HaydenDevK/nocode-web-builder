"use client";

// LinkButton
import { Button } from "@mui/material";
import { useBuilderStore } from "@/app/store/useBuilderStore";

interface LinkProps {
  elementId: string;
}

export default function LinkButton({ elementId }: LinkProps) {
  const element = useBuilderStore((state) => state.elements.byId[elementId]);
  const {
    id,
    type,
    props: {
      text,
      href,
      color,
      fontSize,
      fontWeight,
      fontFamily,
      width,
      height,
      borderRadius,
      backgroundColor,
    },
  } = element;
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
        backgroundColor: backgroundColor,
        fontSize: `${fontSize}px`,
        color: color,
        fontWeight: fontWeight,
        fontFamily: fontFamily,
        width: width || "auto",
        height: height || "auto",
        borderRadius: borderRadius || "auto",
        border: isSelected ? "2px solid purple" : "1px solid",
        boxShadow: isSelected ? "0 0 4px purple" : "none",
        "&:hover": {
          backgroundColor: "#ffffff",
          color: "#A64EFF",
        },
      }}
    >
      {text}
    </Button>
  );
}
