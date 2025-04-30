"use client";

import React from "react";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import type { TImageProps } from "@/app/model/types";
import styles from "./ImageElement.module.scss";
import { PLACEHOLDER_IMAGE } from "@/constants/placeholders";

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

  return (
    <img
      onClick={(e) => {
        e.stopPropagation();
        setSelectedItemInfo({ type: "image", itemId: elementId });
      }}
      src={props.imageURL || PLACEHOLDER_IMAGE}
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
