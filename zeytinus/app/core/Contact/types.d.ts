import type { SectionData } from "../../base/context/types";

// actions & utils
export interface ContactData extends SectionData {
  section_instance?: string;
  section_version?: "V1" | "V2" | "V3";
  map?: boolean;
}

// components
export interface ContactProps extends ContactData {}

export interface ContactItemProps {
  icon: string;
  title: { V1: string; V2: string; V3: string };
  lines: (string | undefined)[];
  linkPrefix?: string;
}
