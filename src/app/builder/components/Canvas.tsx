import styles from "../styles/Canvas.module.scss";
import { useBuilderStore } from "@/app/store/useBuilder.store";
import ElementRenderer from "@/app/builder/containers/ElementRenderer";

export default function Canvas() {
  const sections = useBuilderStore((state) => state.sections);
  const elements = useBuilderStore((state) => state.elements);

  return (
    <div className={styles.canvas}>
      {sections.allIds.map((sectionId) => {
        const section = sections.byId[sectionId];
        return section.elementIds.map((elementId) => (
          <ElementRenderer key={elementId} element={elements.byId[elementId]} />
        ));
      })}
    </div>
  );
}
