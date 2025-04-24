"use client";

import React from "react";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import type { TImageProps } from "@/app/model/types";
import styles from "./ImageElement.module.scss";

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
  // 임시로 사용한 이미지입니다
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
      className={`${styles.image} ${isSelected ? styles.selected : ""}`}
      style={{
        width: `${props.width}%`,
        borderRadius: props.radius,
      }}
    />
  );
};

export default ImageElement;
