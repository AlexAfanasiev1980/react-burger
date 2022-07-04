import React from "react";
import styleModal from "./modal-overlay.module.css";

interface ModalOverlayProps {
  onClick: () => void;
}

export default function ModalOverlay(props: ModalOverlayProps) {
  return (
    <div className={styleModal.modalOverlay} onClick={props.onClick}></div>
  );
}
