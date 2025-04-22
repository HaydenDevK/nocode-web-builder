// ElementEditor.tsx
import { useBuilderStore } from "@/app/store/useBuilder.store";
import ButtonEditor from "@/app/builder/components/elementEditor/ButtonEditor";
import TextEditor from "@/components/TextEditor";

export default function ElementEditor() {
  const selected = useBuilderStore((state) => state.selectedItemInfo);

  if (!selected) return null;

  switch (selected.type) {
    case "button":
      return <ButtonEditor elementId={selected.itemId} />;
    case "text":
      return <TextEditor elementId={selected.itemId} />;
    default:
      return null;
  }
}
