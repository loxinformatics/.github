import type { SectionData } from "../../widgets/sections/types";

interface Item {
  image?: string | null;
  icon?: string;
  title?: string;
  description?: string;
}

export interface ListData extends SectionData {
  section_instance?: string;
  section_version?: "V1" | "V2" | "V3";
  items?: Item[];
}
