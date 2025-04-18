export type ElementType = "section" | "button" | "text" | "image";

interface BaseElement {
  id: string;
  type: ElementType;
}

export interface SectionElement extends BaseElement {
  type: "section";
  content: string;
}

export interface ButtonElement extends BaseElement {
  type: "button";
  text: string;
  href: string;
  color: string;
  fontSize: number;
  fontWeight: number;
  borderRadius: number;
}

export interface TextElement extends BaseElement {
  type: "text";
  value: string;
  fontSize: number;
}

export interface ImageElement extends BaseElement {
  type: "image";
  url: string;
  width: number;
  height: number;
}

export type CreateElement =
  | SectionElement
  | ButtonElement
  | TextElement
  | ImageElement;
