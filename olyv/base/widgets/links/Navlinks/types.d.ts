export interface NavlinkDetails {
  text: string;
  icon?: string;
  href: string;
  type?: string;
  authorized?: string[];
  children?: NavlinkDetails[];

  // ? Are these being used
  loginText?: string;
  logoutText?: string;
}
