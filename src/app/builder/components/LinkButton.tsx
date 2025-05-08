"use client";

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
      minHeight,
      borderRadius,
      backgroundColor,
    },
  } = element;
  const { selectedItemInfo, setSelectedItemInfo } = useBuilderStore();

  const isSelected = selectedItemInfo?.itemId === id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItemInfo({ type, itemId: id });

    // href 가 있으면 새 창으로 이동
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        textAlign: "center",
      }}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          handleClick(e);
        }}
        style={{
          width: `${width}%`,
          minHeight: minHeight,
          backgroundColor: backgroundColor,
          fontSize: `${fontSize}px`,
          color: color,
          fontWeight: fontWeight,
          fontFamily: fontFamily,
          borderRadius: borderRadius || "auto",
          border: isSelected ? "2px solid purple" : "1px solid",
          boxShadow: isSelected ? "0 0 4px purple" : "none",
          overflowWrap: "break-word",
          whiteSpace: "normal",
          wordBreak: "break-word",
          textAlign: "center",
          textTransform: "none",
        }}
      >
        {text}
      </button>
    </div>
  );
}
