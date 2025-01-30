export type HeadingProps = {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
} & (
  | { children: React.ReactNode; dangerouslySetInnerHTML?: never }
  | { children?: never; dangerouslySetInnerHTML: { __html: string } }
);
