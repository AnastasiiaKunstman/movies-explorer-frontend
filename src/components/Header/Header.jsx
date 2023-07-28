import './Header.css';
import logoMain from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import NavTab from '../NavTab/NavTab';

function Header({ isLogged }) {
    return (
        <header className={`header ${!isLogged ? 'header_landing' : 'header_movies'}`}>
            <Link className='header__logo' to='/'>
                <img src={logoMain} alt='Логотип' />
            </Link>
            <NavTab isLogged={isLogged} />
        </header>
    );
};

export default Header;