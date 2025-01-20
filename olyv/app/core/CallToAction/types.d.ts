// actions & config
export interface CallToActionData {
  section_instance?: string;
  section_version?: "V1" | "V2";
  cta_heading?: string;
  cta_paragraph?: string;
  cta_image?: string;
  cta_button_text?: string;
  cta_button_href?: string;
  cta_button_icon?: string;
}

// components
export interface CallToActionProps extends CallToActionData {}
