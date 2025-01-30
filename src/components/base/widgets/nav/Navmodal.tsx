"use client";

import { useEffect, useMemo } from "react";
import { useBase } from "../../management";
import Modal from "../modals/Modal";
import Nav from "./Nav";
import styles from "./styles.module.css";
import type { NavmodalProps } from "./types";

export default function Navmodal({
  toggleColor,
  navigation_items,
}: NavmodalProps) {
  const {
    bgBodyHover,
    setAsideExists,
    asideExists,
    isNavModalOpen,
    setIsNavModalOpen,
  } = useBase();

  const filteredNavItems = useMemo(
    () =>
      navigation_items?.filter(
        (item) => !item.type || item.type === "normal"
      ) ?? [],
    [navigation_items]
  );

  const toggleMobileNavModal = () => {
    setIsNavModalOpen(!isNavModalOpen);
  };

  useEffect(() => {
    setAsideExists(!!document.querySelector("aside"));
  }, []);

  return (
    !asideExists && (
      <Modal
        id="mobile-nav-toggle"
        toggleButtonColor={toggleColor}
        isModalOpen={isNavModalOpen}
        toggleModal={toggleMobileNavModal}
      >
        <Nav
          variant="Navmodal"
          className={styles.navmodal}
          navlinks={filteredNavItems}
          navLinkClass={`${styles.navlink} block px-4 py-2 transition-all ease-in-out duration-150 text-color dark:text-color-reverse ${bgBodyHover}`}
          navLinkIconClass={styles.navlinkIcon}
        />
      </Modal>
    )
  );
}
