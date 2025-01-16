import type { SectionData } from "../../../context/base/types";

// actions & utils
export interface AboutData extends SectionData {
  section_instance?: string;
  about_content?: string;
  about_image?: string;
  about_video?: string;
  about_alt?: string;
}

// components
export interface AboutProps extends AboutData {}
