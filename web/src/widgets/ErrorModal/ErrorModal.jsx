import { Modal, Button } from "react-bootstrap";
import styles from "./ErrorModal.module.css";

export function Error({ message }) {
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
