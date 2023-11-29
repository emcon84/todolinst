export interface ModalProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    openModal: boolean;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
    trigger: boolean;
}