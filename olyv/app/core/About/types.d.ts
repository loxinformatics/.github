import type { SectionData } from "../../../providers/base/types";

// actions & config
export interface AboutData extends SectionData {
  section_instance?: string;
  section_version?: "V1";
  about_content?: string;
  about_image?: string;
  about_video?: string;
  about_alt?: string;
}

// components
export interface AboutProps extends AboutData {}
