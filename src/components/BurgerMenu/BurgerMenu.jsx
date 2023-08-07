import './BurgerMenu.css';
import { NavLink } from 'react-router-dom';
import account from '../../images/icon_accaunt.svg';

function BurgerMenu({ onClose }) {
    return (
        <div className='burger'>
            <div className='burger__wrap'>
                <button className='burger__close-btn' type='button' onClick={onClose} />
                <nav className='burger__menu'>
                    <NavLink className='burger__link' to='/' onClick={onClose}>Главная</NavLink>
                    <NavLink className='burger__link' to='/movies' onClick={onClose}>Фильмы</NavLink>
                    <NavLink className='burger__link' to='/saved-movies' onClick={onClose}>Сохранённые фильмы</NavLink>
                </nav>
                <NavLink className='burger__account-btn' to='/profile' onClick={onClose}>
                    <img src={account} alt="аккаунт" />
                    Аккаунт
                </NavLink>
            </div>
        </div>
    );
};

export default BurgerMenu;