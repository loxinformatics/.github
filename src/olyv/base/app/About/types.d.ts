import type { SectionResponse } from "../../widgets/layout/types";

export interface AboutResponse extends SectionResponse {
  section_instance?: string;
  section_version?: "V1";
  about_content?: string;
  about_image?: string;
  about_video?: string;
  about_alt?: string;
}
