import type { SectionResponse } from "../../types";

export interface SectionTitleProps {
  titleH2?: SectionResponse["title_h2"];
  titleH3?: SectionResponse["title_h3"];
  titleP?: SectionResponse["title_p"];
  titleVersion?: SectionResponse["title_version"];
}

export interface SectionProps extends SectionResponse {
  container?: boolean;
  padding?: boolean;
  fullscreen?: boolean;
  children?: React.ReactNode;
  ref?: MutableRefObject<HTMLDivElement | null>;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
