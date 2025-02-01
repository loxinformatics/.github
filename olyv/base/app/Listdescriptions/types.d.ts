import type { SectionResponse } from "../../widgets/layout/types";

interface ItemDescription {
  image?: string | null;
  icon?: string;
  title?: string;
  description?: string;
}

export interface ListDescriptionsResponse extends SectionResponse {
  section_instance?: string;
  section_version?: "V1" | "V2" | "V3";
  items?: ItemDescription[];
}
