export interface SectionData {
  title_h2?: string;
  title_h3?: string;
  title_p?: string;
  title_version?: "V1" | "V2" | "V3";
}

export interface SectionTitleProps {
  titleH2?: SectionData["title_h2"];
  titleH3?: SectionData["title_h3"];
  titleP?: SectionData["title_p"];
  titleVersion?: SectionData["title_version"];
}

export interface SectionProps extends SectionData {
  container?: boolean;
  padding?: boolean;
  fullscreen?: boolean;
  children?: React.ReactNode;
  ref?: MutableRefObject<HTMLDivElement | null>;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
