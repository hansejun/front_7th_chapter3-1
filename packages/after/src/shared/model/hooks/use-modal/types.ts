export interface BaseModalProps {
  onCloseModal: () => void;
}

export interface ModalState {
  type: string;
  props: Record<string, any>;
}

export type ModalSubscriber = () => void;
