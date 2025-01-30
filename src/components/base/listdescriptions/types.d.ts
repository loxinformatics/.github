import type { SectionData } from "../widgets/section/types";

interface ItemDescriptionData {
  image?: string | null;
  icon?: string;
  title?: string;
  description?: string;
}

export interface ListDescriptionsData extends SectionData {
  section_instance?: string;
  section_version?: "V1" | "V2" | "V3";
  items?: ItemDescriptionData[];
}
