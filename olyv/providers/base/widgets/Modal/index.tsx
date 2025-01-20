"use client";

import type { ModalProps } from "../../types";

const Modal = ({
  id,
  toggleButtonColor,
  isModalOpen,
  toggleModal,
  children,
}: ModalProps) => {
  const toggle_color =
    toggleButtonColor || "text-color dark:text-color-reverse";

  return (
    <div
      id={id}
      className={
        isModalOpen
          ? `fixed overflow-hidden z-40 inset-0 bg-black/90 transition duration-300`
          : "lg:hidden"
      }
    >
      {/* Modal */}
      <div
        className={` ${
          isModalOpen ? "block" : "hidden"
        } absolute overflow-y-auto bg-body dark:bg-body-reverse top-[55px] right-[15px] bottom-[15px] left-[15px] py-2.5 transition-all duration-300`}
      >
        {children}
      </div>
      {/* Toggle button */}
      <button className="bg-transparent border-0" onClick={toggleModal}>
        {isModalOpen ? (
          <i
            className={`bi bi-x text-white absolute top-[15px] end-[15px] text-3xl border-0 cursor-pointer transition duration-500`}
          ></i>
        ) : (
          <i
            className={`bi bi-list ${toggle_color} text-3xl border-0 cursor-pointer transition duration-500`}
          ></i>
        )}
      </button>
    </div>
  );
};

export default Modal;
