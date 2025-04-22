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
  props: TElementProps;
};

export type TElementProps = TTextProps | any;

export type TTextProps = {
  text: string;
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2";
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

export type TImageProps = {
  srcType: "url" | "upload";
  imageURL: string;
  width: number;
  align: "left" | "center" | "right";
  link: string;
  radius: number;
};
