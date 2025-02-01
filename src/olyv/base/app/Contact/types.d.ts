import type { SectionResponse } from "../../widgets/layout/types";

export interface ContactResponse extends SectionResponse {
  section_instance?: string;
  section_version?: "V1" | "V2" | "V3";
  open_days?: string;
  open_hours?: string;
  map_URL?: string;
}
