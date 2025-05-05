"use client";

import React from "react";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import type { TVideoProps } from "@/app/model/types";
import { convertToEmbedURL } from "@/util/video.util";
import styles from "./VideoElement.module.scss";
import { PLACEHOLDER_VIDEO } from "@/constants/placeholders";
import Image from "next/image";

interface VideoElementProps {
  elementId: string;
}

const VideoElement: React.FC<VideoElementProps> = ({ elementId }) => {
  const element = useBuilderStore((s) => s.elements.byId[elementId]);
  const selectedItemInfo = useBuilderStore((s) => s.selectedItemInfo);
  const setSelectedItemInfo = useBuilderStore((s) => s.setSelectedItemInfo);

  if (!element || element.type !== "video") return null;
  const props = element.props as TVideoProps;

  const isSelected =
    selectedItemInfo?.type === "video" && selectedItemInfo.itemId === elementId;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItemInfo({ type: "video", itemId: elementId });
  };

  const isValidURL = !!props.videoURL;

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
        justifyContent: getAlignmentStyle(props.videoAlign || "center"),
        width: "100%",
      }}
      onClick={handleClick}
    >
      <div
        style={{
          width: `${props.width || 100}%`,
          ...(isSelected && { outline: "2px dashed #2684FF" }),
          position: "relative",
        }}
      >
        {!isValidURL ? (
          <Image
            src={PLACEHOLDER_VIDEO}
            alt="video placeholder"
            width={500}
            height={300}
            className={styles.placeholder}
          />
        ) : props.videoSrcType === "youtube" ? (
          <div className={styles.youtubeWrapper}>
            <iframe
              src={convertToEmbedURL(props.videoURL)}
              title="YouTube Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.iframe}
            />
          </div>
        ) : (
          <video
            src={props.videoURL}
            controls={!isSelected}
            className={styles.video}
          >
            <track kind="captions" label="default" />
          </video>
        )}

        <div className={styles.overlay} />
      </div>
    </div>
  );
};

export default VideoElement;
