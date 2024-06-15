import styles from "./ErrorModal.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ErrorModal({ message }) {
  return (
    <Modal
      show={true}
      backdrop="static"
      keyboard={false}
      centered
      className={styles.modalBackdropCustom}
    >
      <Modal.Header>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
