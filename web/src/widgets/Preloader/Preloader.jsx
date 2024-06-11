import styles from "./Preloader.module.css";

export function Preloader() {
  return (
    <div
      id="preloader"
      className={`${styles.preloader} z-3 position-fixed bg-white top-0 end-0 bottom-0 start-0 overflow-hidden`}
    ></div>
  );
}
