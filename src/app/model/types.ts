// 선택된 elementtype
export type TElementTypes = "text" | "link" | "image" | "video";

export type TSection = {
  id: string;
  props: TSectionProps;
  elementIds: string[];
};

export type TSectionProps = {
  backgroundColor: string;
  padding?: number;
  radius?: number;
};

export type TElement = {
  id: string;
  sectionId: string;
  type: TElementTypes;
  props: TTextProps;
};

export type TTextProps = {
  text: string;
  size: "h1" | "h2" | "h3";
  fontFamily: "sans-serif" | "serif" | "monospace";
  fontWeight: string;
  color: string;
  backgroundColor: string;
  padding: number;
  radius: number;
};

export type TSelectedItemInfo =
  | { type: "section"; itemId: string }
  | { type: "text"; itemId: string }
  | { type: "link"; itemId: string }
  | { type: "image"; itemId: string }
  | { type: "video"; itemId: string }
  | null;

export type TElementProps = TTextProps | any;
