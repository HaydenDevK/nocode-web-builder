"use client";

import { TTextProps } from "@/app/model/types";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import React from "react";

const FONT_SIZE_MAP: Record<TTextProps["size"], string> = {
  h1: "2.5rem",
  h2: "2rem",
  h3: "1.75rem",
  h4: "1.5rem",
  h5: "1.25rem",
  h6: "1rem",
};

interface TextElementProps {
  elementId: string;
}

const TextElement: React.FC<TextElementProps> = ({ elementId }) => {
  const element = useBuilderStore((s) => s.elements.byId[elementId]);
  const selectedItemInfo = useBuilderStore((s) => s.selectedItemInfo);
  const setSelectedItemInfo = useBuilderStore((s) => s.setSelectedItemInfo);

  if (element.type !== "text") return null;

  const props = element.props as TTextProps;
  const isSelected =
    selectedItemInfo?.type === "text" && selectedItemInfo.itemId === elementId;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedItemInfo({ type: "text", itemId: elementId });
      }}
      style={{
        fontSize: FONT_SIZE_MAP[props.size] ?? "1rem",
        color: props.color,
        backgroundColor: props.backgroundColor,
        padding: props.padding,
        borderRadius: props.radius,
        fontFamily: props.fontFamily,
        fontWeight: props.fontWeight,
        margin: 0,
        cursor: "pointer",
        outline: isSelected ? "2px dashed #2684FF" : undefined,
        whiteSpace: "pre-wrap",
      }}
    >
      {props.text
        .split("\n")
        .map((line: string, idx: number, arr: string[]) => (
          <React.Fragment key={idx}>
            {line}
            {idx < arr.length - 1 && <br />}
          </React.Fragment>
        ))}
    </div>
  );
};

export default TextElement;
