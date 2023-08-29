import React, { useEffect } from 'react';
import './InfoTooltip.css';
import failIcon from '../../images/fail-icon.svg';
import successIcon from '../../images/Union.svg';
import { usePopupClose } from '../../hooks/usePopupClose';

function InfoTooltip({ isOpen, onClose, errorMessage, successMessage }) {
    usePopupClose(isOpen, onClose);

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(false);
        }, 1500);
        return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, [isOpen]);

    return (
        <div className={`popup tip-popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__container'>
                <div className='popup__content'>
                    <button onClick={onClose} className='popup__close' type='button'></button>
                    {errorMessage ? (
                        <>
                            <img className='popup__notification_image' src={failIcon} alt='Изображение уведомления' />
                            <p className='popup__notification_title'>{errorMessage}</p>
                        </>
                    ) : (
                        <>
                            <img className='popup__notification_image' src={successIcon} alt='Изображение уведомления' />
                            <p className='popup__notification_title'>{successMessage}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InfoTooltip;
