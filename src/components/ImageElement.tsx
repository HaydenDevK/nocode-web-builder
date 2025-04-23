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

  const placeholderImage =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

  return (
    <img
      onClick={(e) => {
        e.stopPropagation();
        setSelectedItemInfo({ type: "image", itemId: elementId });
      }}
      src={props.imageURL || placeholderImage}
      alt="image element"
      style={{
        cursor: "pointer",
        outline: isSelected ? "2px dashed #2684FF" : undefined,
        width: `${props.width}%`,
        borderRadius: props.radius,
        display: "block",
        objectFit: "contain",
      }}
    />
  );
};

export default ImageElement;
