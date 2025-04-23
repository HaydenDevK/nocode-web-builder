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

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedItemInfo({ type: "video", itemId: elementId });
      }}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        cursor: "pointer",
        outline: isSelected ? "2px dashed #2684FF" : undefined,
      }}
    >
      <div
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
        onClick={(e) => {
          e.stopPropagation();
          setSelectedItemInfo({ type: "video", itemId: elementId });
        }}
      />

      {props.videoSrcType === "youtube" ? (
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            width: `${props.width}%`,
            maxWidth: "100%",
          }}
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
              pointerEvents: isSelected ? "none" : "auto",
            }}
          />
        </div>
      ) : (
        <video
          src={props.videoURL}
          controls={!isSelected}
          style={{
            width: `${props.width}%`,
            maxWidth: "100%",
            display: "block",
            pointerEvents: isSelected ? "none" : "auto",
          }}
        >
          <track kind="captions" label="default" />
        </video>
      )}
    </div>
  );
};

export default VideoElement;
