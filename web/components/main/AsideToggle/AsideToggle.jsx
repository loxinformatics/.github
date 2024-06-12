import styles from "./AsideToggle.module.css";
import { BsList } from "react-icons/bs";

export default function AsideToggle({ toggleAside }) {
  return (
    <div
      className={`${styles.toggleAsideBtn}`}
      onClick={() => {
        toggleAside();
      }}
    >
      <BsList />
    </div>
  );
}
