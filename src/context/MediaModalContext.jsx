import { createContext, useContext, useState } from "react";
import MediaDetailModal from "../components/MediaDetailModal";

const MediaModalContext = createContext({
  openMediaModal: () => {},
  closeMediaModal: () => {},
});

export const MediaModalProvider = ({ children }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openMediaModal = (item) => {
    setSelectedMedia(item);
    setIsOpen(true);
  };

  const closeMediaModal = () => {
    setIsOpen(false);
  };

  return (
    <MediaModalContext.Provider value={{ openMediaModal, closeMediaModal }}>
      {children}
      <MediaDetailModal
        item={selectedMedia}
        isOpen={isOpen}
        onClose={closeMediaModal}
      />
    </MediaModalContext.Provider>
  );
};

export const useMediaModal = () => useContext(MediaModalContext);
