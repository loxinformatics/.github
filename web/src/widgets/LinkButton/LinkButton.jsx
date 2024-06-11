"use client";

import Link from "next/link";
import { forwardRef } from "react";

const LinkButton = forwardRef(({ href, children, ...rest }, ref) => (
  <Link href={href} passHref>
    <div ref={ref} {...rest}>
      {children}
    </div>
  </Link>
));

LinkButton.displayName = "LinkButton";

export { LinkButton };
