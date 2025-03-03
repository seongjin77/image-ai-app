import { ReactNode, useContext } from 'react';
import { ModalSetterContext, ModalStateContext } from '../context/ModalProvider';

interface Modal {
  id: string;
  component: ReactNode;
}

const useModal = () => {
  const modalList = useContext(ModalStateContext);
  const setModalList = useContext(ModalSetterContext);

  // 모달 열기 함수
  const openModal = (modal: Modal) => {
    const isDuplicate = modalList.some((existingModal) => existingModal.id === modal.id);

    if (!isDuplicate) {
      setModalList((prev) => [...prev, modal]);
    }
  };

  // 모달 닫기 함수
  const closeModal = (id: string) => {
    // setModalList((prev) =>
    //   prev.map((modal) => (modal.id === id ? { ...modal, isClosing: true } : modal)),
    // );

    // 비밀번호 확인 모달은 닫기 애니메이션 없이 바로 삭제
    if (id === 'PasswordCheckModal') {
      setModalList((prev) => prev.filter((modal) => modal.id !== id));
      return;
    }

    // 모달 닫기 애니메이션 후 삭제
    setTimeout(() => {
      setModalList((prev) => prev.filter((modal) => modal.id !== id));
    }, 300);
  };

  return { openModal, closeModal };
};

export default useModal;
