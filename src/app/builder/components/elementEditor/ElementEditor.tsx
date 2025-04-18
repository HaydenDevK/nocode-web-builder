import { useSelectedElementStore } from "@/app/store/selectedElement.store";
import ButtonEditor from "@/app/builder/components/elementEditor/ElementEditor";
import TextEditor from "@/components/TextEditor";

export default function ElementEditor() {
  const { selectedType } = useSelectedElementStore();

  switch (selectedType) {
    case "button":
      return <ButtonEditor />;
    case "text":
      return <TextEditor />;
    default:
      return null;
  }
}
