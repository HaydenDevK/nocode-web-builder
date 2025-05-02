// 선택된 elementtype
export type TElementTypes = "section" | "text" | "link" | "image" | "video";

export type TSection = {
  id: string;
  props: TSectionProps;
  elementIds: string[];
};

export type TSectionProps = {
  backgroundColor: string;
  desktopColumns: string;
  mobileColumns: string;
  paddingDesktopTopBottom: number;
  paddingDesktopLeftRight: number;
  paddingMobileTopBottom: number;
  paddingMobileLeftRight: number;
  columns?: string;
  radius?: number;
};

export type TElement = {
  id: string;
  sectionId: string;
  type: TElementTypes;
  props: TElementProps;
};

export type TElementProps =
  | TTextProps
  | TLinkProps
  | TImageProps
  | TVideoProps
  | TSection
  | any;

type TFontSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2";
type TFontWeight = "normal" | "bold" | "lighter";

export type TTextProps = {
  text: string;
  fontFamily: "sans-serif" | "serif" | "monospace";
  desktopFontSize: TFontSize;
  mobileFontSize: TFontSize;
  desktopFontWeight: TFontWeight;
  mobileFontWeight: TFontWeight;
  textAlign: "left" | "center" | "right";
  color: string;
  backgroundColor: string;
  padding: number;
  radius: number;
};

export type TLinkProps = {
  text: string;
  href: string;
  color: string;
  fontSize: number;
  fontWeight: number;
  width: number;
  height: number;
  borderRadius: number;
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
  imgAlign: "left" | "center" | "right";
  width: number;
  radius: number;
};

export type TVideoProps = {
  videoSrcType: "youtube" | "upload";
  videoURL: string;
  videoAlign: "left" | "center" | "right";
  width: number;
};
