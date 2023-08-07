import './Promo.css';
import projectLogo from "../../images/logo-planet.svg"

function Promo() {
    return (
        <section className="promo">
            <div className="promo__text-container">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <a className="promo__link" href='#about-project'>Узнать больше</a>
            </div>
            <img className="promo__logo-image" src={projectLogo} alt="Логотип проекта" />
        </section>
    )
};

export default Promo;