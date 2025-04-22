// ElementRenderer
import { TElementProps } from "@/app/model/types";
import LinkButton from "@/app/builder/components/createButtons/LinkButton";

export default function ElementRenderer({
  element,
}: {
  element: TElementProps;
}) {
  switch (element.type) {
    case "button":
      return <LinkButton data={element} />;
    default:
      return null;
  }
}
