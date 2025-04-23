"use client";

import React from "react";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import type { TVideoProps } from "@/app/model/types";
import { convertToEmbedURL } from "@/util/video.util";

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

  const placeholderImage =
    "https://d2uolguxr56s4e.cloudfront.net/img/kartrapages/video_player_placeholder.gif";

  const isValidURL = !!props.videoURL;

  return (
    <div
      style={{
        position: "relative",
        width: `${props.width}%`,
        maxWidth: "100%",
        outline: isSelected ? "2px dashed #2684FF" : undefined,
      }}
    >
      {!isValidURL ? (
        <img
          src={placeholderImage}
          alt="video placeholder"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "cover",
          }}
        />
      ) : props.videoSrcType === "youtube" ? (
        <div
          style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
        >
          <iframe
            src={convertToEmbedURL(props.videoURL)}
            title="YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
              pointerEvents: "auto",
            }}
          />
        </div>
      ) : (
        <video
          src={props.videoURL}
          controls={!isSelected}
          style={{
            width: "100%",
            maxWidth: "100%",
            display: "block",
            pointerEvents: "auto",
          }}
        >
          <track kind="captions" label="default" />
        </video>
      )}

      <div
        onClick={handleClick}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
          background: "transparent",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default VideoElement;
