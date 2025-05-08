"use client";

import React from "react";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import type { TImageProps } from "@/app/model/types";
import styles from "./ImageElement.module.scss";
import { PLACEHOLDER_IMAGE } from "@/constants/placeholders";
import Image from "next/image";

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
      <Image
        src={props.imageURL || PLACEHOLDER_IMAGE}
        alt="img"
        width={500}
        height={300}
        className={`${styles.image} ${isSelected ? styles.selected : ""}`}
        style={{
          width: `${props.width}%`,
          borderRadius: props.radius,
          cursor: "pointer",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default ImageElement;
