import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ModalContext from "../context/ModalContext";

// Le interfacce rimangono le stesse
interface ModalProviderProps {
  children: ReactNode;
}

interface ModalState {
  content: ReactNode;
}

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState | null>(null);
  // 1. Stato per memorizzare il riferimento al nostro nodo DOM per il portale.
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  // 2. useEffect per creare e rimuovere il nodo del portale.
  useEffect(() => {
    let element = document.getElementById('modal-root');

    if (!element) {
      element = document.createElement('div');
      element.id = 'modal-root';
      document.body.appendChild(element);
    }
    setPortalRoot(element);

    // 3. Funzione di cleanup: viene eseguita quando il provider viene smontato.
    return () => {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, []);

  const openModal = useCallback((content: ReactNode) => {
    setModalState({ content });
  }, []);

  const closeModal = useCallback(() => setModalState(null), []);

  return (
    <ModalContext.Provider
      value={{
        isOpen: Boolean(modalState),
        openModal,
        closeModal,
      }}
    >
      {children}
      {modalState && portalRoot && createPortal(
        modalState.content,
        portalRoot
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;