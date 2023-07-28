import './NotFoundError.css';
import { Link } from "react-router-dom";

function NotFoundError() {
  return (
    <section className='not-found__error'>
      <h1 className='not-found__title'>404</h1>
      <p className='not-found__desc'>Страница не найдена</p>
      <Link className='not_found__link' to={-1}>Назад</Link>
    </section>
  )
};

export default NotFoundError;