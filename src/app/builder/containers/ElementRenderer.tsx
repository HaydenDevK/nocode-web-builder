import { CreateElement } from "@/app/builder/types/createElementTypes";
import LinkButton from "@/app/builder/components/LinkButton";

export default function ElementRenderer({
  element,
}: {
  element: CreateElement;
}) {
  switch (element.type) {
    case "버튼":
      return <LinkButton data={element} />;
    default:
      return null;
  }
}
