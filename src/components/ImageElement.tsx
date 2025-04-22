"use client";

import React from "react";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import type { TImageProps } from "@/app/model/types";

interface ImageElementProps {
  elementId: string;
}

const ImageElement: React.FC<ImageElementProps> = ({ elementId }) => {
  const element = useBuilderStore((s) => s.elements.byId[elementId]);
  const selectedItemInfo = useBuilderStore((s) => s.selectedItemInfo);
  const setSelectedItemInfo = useBuilderStore((s) => s.setSelectedItemInfo);

  if (!element || element.type !== "image") return null;

  const props = element.props as TImageProps;

  const isSelected =
    selectedItemInfo?.type === "image" && selectedItemInfo.itemId === elementId;

  const alignmentStyle: Record<
    TImageProps["align"],
    React.CSSProperties["alignItems"]
  > = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedItemInfo({ type: "image", itemId: elementId });
      }}
      style={{
        display: "flex",
        flexDirection: "column", // ✅ 수직 정렬
        alignItems: alignmentStyle[props.align],
        width: "100%",
        cursor: "pointer",
        outline: isSelected ? "2px dashed #2684FF" : undefined,
        padding: 8,
      }}
    >
      {isDev ? (
        <img
          src={props.imageURL}
          alt="img link"
          style={{
            width: `${props.width}%`,
            borderRadius: props.radius,
            display: "block",
          }}
        />
      ) : (
        // 실제 배포 환경에서만 링크 활성화하도록 임시로 해놓겠습니다
        <a href={props.link} target="_blank" rel="noopener noreferrer">
          <img
            src={props.imageURL}
            alt="img link"
            style={{
              width: `${props.width}%`,
              borderRadius: props.radius,
              display: "block",
            }}
          />
        </a>
      )}
    </div>
  );
};

export default ImageElement;
