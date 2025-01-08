import React from 'react';
import './ImageModal.scss';

const ImageModal = ({ imageUrl, onClose }) => {
    return (
        <div className="image-modal" onClick={onClose}>
            <div className="image-modal__content" onClick={e => e.stopPropagation()}>
                <button className="image-modal__close" onClick={onClose}>×</button>
                <img 
                    src={`/storage/${imageUrl}`} 
                    alt="Receipt" 
                    className="image-modal__image"
                />
            </div>
        </div>
    );
};

export default ImageModal; 