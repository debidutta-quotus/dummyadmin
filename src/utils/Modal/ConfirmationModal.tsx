import React, { useState } from 'react';
import Modal from 'react-modal';
import './ConfirmationModal.css'; // Import the CSS file
import { X } from 'lucide-react'; // Assuming you have lucide-react for icons
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners'; // Import the spinner component

Modal.setAppElement('#root');

interface ConfirmationModalProps {
  header: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isOpen: boolean;
  onRequestClose: () => void;
  loadingColor?: string;
  loadingSize?: number;
  proceedBtnText: string;
  closeBtnText: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  header,
  message,
  onConfirm,
  onCancel,
  isOpen,
  onRequestClose,
  loadingColor = 'white',
  loadingSize = 20,
  proceedBtnText = 'Proceed',
  closeBtnText = 'Cancel',
}) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [isConfirming, setIsConfirming] = useState(false); // Local state for button loader

  const handleConfirm = async () => {
    setIsConfirming(true);
    await onConfirm();
    setIsConfirming(false);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={`confirmation-modal-content ${isDarkMode ? 'dark' : ''}`}
      overlayClassName={`confirmation-modal-overlay ${isDarkMode ? 'dark' : ''}`}
      ariaHideApp={false}
    >
      <button className="confirmation-modal-close-button" onClick={onRequestClose}>
        <X size={20} />
      </button>
      <div className="confirmation-modal-body">
        <div className="confirmation-modal-icon-container">
          <div className="confirmation-modal-icon">!</div>
        </div>
        <p className="confirmation-modal-title">{header}</p>
        <p className="confirmation-modal-message">{message}</p>
        <div className="confirmation-modal-buttons">
          <button
            className={`confirmation-modal-button confirmation-modal-delete ${isConfirming ? 'loading' : ''}`}
            onClick={handleConfirm}
            disabled={isConfirming}
          >
            {isConfirming ? (
              <ClipLoader color={loadingColor} size={loadingSize} loading={true} />
            ) : (
              `${proceedBtnText}`
            )}
          </button>
          <button
            className="confirmation-modal-button confirmation-modal-cancel"
            onClick={() => onCancel && onCancel()}
            disabled={isConfirming}
          >
            {closeBtnText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
