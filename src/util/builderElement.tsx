import type { TElement } from "@/app/model/types";
import TextElement from "@/components/TextElement";
import LinkButton from "@/app/builder/components/LinkButton";
import ImageElement from "@/components/ImageElement";
import VideoElement from "@/components/VideoElement";

export const builderElement = (element: TElement) => {
  switch (element.type) {
    case "text":
      return <TextElement key={element.id} elementId={element.id} />;
    case "image":
      return <ImageElement key={element.id} elementId={element.id} />;
    case "link":
      return <LinkButton key={element.id} elementId={element.id} />;
    case "video":
      return <VideoElement key={element.id} elementId={element.id} />;
    default:
      return null;
  }
};
