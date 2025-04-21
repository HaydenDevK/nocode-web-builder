// ElementRenderer
import { CreateElement } from "@/app/builder/types/createElementTypes";
import LinkButton from "@/app/builder/components/createElements/LinkButton";

export default function ElementRenderer({
  element,
}: {
  element: CreateElement;
}) {
  switch (element.type) {
    case "button":
      return <LinkButton data={element} />;
    default:
      return null;
  }
}
