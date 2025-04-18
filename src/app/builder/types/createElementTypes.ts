export type ElementType = "섹션" | "버튼" | "텍스트" | "이미지";

interface BaseElement {
  id: string;
  type: ElementType;
}

export interface SectionElement extends BaseElement {
  type: "섹션";
  content: string;
}

export interface ButtonElement extends BaseElement {
  type: "버튼";
  text: string;
  href: string;
  color: string;
  fontSize: number;
  fontWeight: number;
  borderRadius: number;
}

export interface TextElement extends BaseElement {
  type: "텍스트";
  value: string;
  fontSize: number;
}

export interface ImageElement extends BaseElement {
  type: "이미지";
  url: string;
  width: number;
  height: number;
}

export type CreateElement =
  | SectionElement
  | ButtonElement
  | TextElement
  | ImageElement;
