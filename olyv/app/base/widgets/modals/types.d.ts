export interface ModalProps {
  id?: string;
  toggleButtonColor?: string;
  isModalOpen: boolean;
  toggleModal: any; //TODO: change this to match the function type
  children: React.ReactNode;
}
