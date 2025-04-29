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

  // align 처리
  const getAlignmentStyle = (align: string) => {
    switch (align) {
      case "left":
        return "flex-start";
      case "center":
        return "center";
      case "right":
        return "flex-end";
      default:
        return "center";
    }
  };

  return (
    <div
      className={`${styles.wrapper}`}
      style={{
        display: "flex",
        justifyContent: getAlignmentStyle(props.imgAlign),
        width: "100%",
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedItemInfo({ type: "image", itemId: elementId });
      }}
    >
      <img
        src={props.imageURL || placeholderImage}
        alt="img"
        className={`${styles.image} ${isSelected ? styles.selected : ""}`}
        style={{
          width: `${props.width}%`,
          borderRadius: props.radius,
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default ImageElement;
