"use client";

import styles from "./Copyright.module.css";
import { useBaseContext } from "../../../app/base/context";

export default function Copyright() {
  const { base } = useBaseContext();
  const name = base?.name;

  return (
    <div className={styles.copyright}>
      &copy; Copyright{" "}
      <strong>
        <span>{name || "Your company"}</span>
      </strong>
      . All Rights Reserved
    </div>
  );
}
