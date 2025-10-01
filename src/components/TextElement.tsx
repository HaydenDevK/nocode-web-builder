"use client";

import { TTextProps } from "@/app/model/types";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import { useViewportStore } from "@/app/store/useViewportStore";
import { FONT_SIZE_MAP } from "@/constants/font";
import React from "react";

interface TextElementProps {
  elementId: string;
}

const TextElement: React.FC<TextElementProps> = ({ elementId }) => {
  const element = useBuilderStore((s) => s.elements.byId[elementId]);
  const selectedItemInfo = useBuilderStore((s) => s.selectedItemInfo);
  const setSelectedItemInfo = useBuilderStore((s) => s.setSelectedItemInfo);
  const mode = useViewportStore((s) => s.mode); // "desktop" | "mobile"

  if (!element || element.type !== "text") return null;

  const props = element.props as TTextProps;
  const isSelected =
    selectedItemInfo?.type === "text" && selectedItemInfo.itemId === elementId;

  const fontSize =
    mode === "mobile"
      ? FONT_SIZE_MAP[props.mobileFontSize ?? "body1"]
      : FONT_SIZE_MAP[props.desktopFontSize ?? "body1"];

  const fontWeight =
    mode === "mobile"
      ? props.mobileFontWeight ?? "normal"
      : props.desktopFontWeight ?? "normal";

  return (
    <div
      data-element-id={elementId}
      data-mobile-font-size={FONT_SIZE_MAP[props.mobileFontSize ?? "body1"]}
      data-mobile-font-weight={props.mobileFontWeight ?? "normal"}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedItemInfo({ type: "text", itemId: elementId });
      }}
      style={{
        width: "100%",
        fontSize,
        fontWeight,
        color: props.color ?? "#000000",
        backgroundColor: props.backgroundColor ?? "#ffffff",
        padding: props.padding ?? 0,
        borderRadius: props.radius ?? 0,
        fontFamily: props.fontFamily ?? "Spoqa Han Sans Neo",
        textAlign: props.textAlign ?? "center",
        margin: 0,
        cursor: "pointer",
        outline: isSelected ? "2px dashed #2684FF" : undefined,
        whiteSpace: "pre-wrap",
      }}
    >
      {(props.text ?? "").split("\n").map((line, idx, arr) => (
        <React.Fragment key={idx}>
          {line}
          {idx < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TextElement;
