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

  return (
    <div
      className={`${styles.container}`}
      style={{
        width: `${props.width}%`,
        ...(isSelected && { outline: "2px dashed #2684FF" }),
      }}
    >
      {!isValidURL ? (
        <Image
          src={PLACEHOLDER_VIDEO}
          alt="video placeholder"
          className={styles.placeholder}
          width={500}
          height={300}
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

      <div className={styles.overlay} onClick={handleClick} />
    </div>
  );
};

export default VideoElement;
