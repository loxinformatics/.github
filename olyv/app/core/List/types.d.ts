import type { SectionData } from "../../../providers/base/types";

// actions & config
interface ItemDescription {
  image?: string | null;
  icon?: string;
  title?: string;
  description?: string;
}

export interface ListDescriptionsData extends SectionData {
  section_instance?: string;
  section_version?: "V1" | "V2" | "V3";
  items?: ItemDescription[];
}

// components
export interface ListDescriptionsProps extends ListDescriptionsData {}
