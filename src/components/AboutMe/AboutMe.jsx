import './AboutMe.css';
import myPhoto from '../../images/MyPhoto.png';

function AboutMe() {
    return (
        <section className='about-me'>
            <h2 className='section-title'>Студент</h2>
            <div className='about-me__info'>
                <div className='about-me__section'>
                    <h4 className='about-me__name'>Анастасия</h4>
                    <p className='about-me__desc'>Фронтенд-разработчик, 28 лет</p>
                    <p className='about-me__text'>Родилась в солнечном Севастополе, однако уже 11 лет живу в совсем не солнечной Перми. Закончила ПГФА по специальности провизор. Я люблю слушать музыку, а ещё увлекаюсь бегом(нет). С 2018 года тружусь на бигфарму в компании «BAYER». Недавно начала кодить. После того, как пройду курс по веб-разработке до конца, планирую уйти с постоянной работы.</p>
                    <a className='about-me__link' target='_blank' rel='noreferrer' href='https://github.com/AnastasiiaKunstman'>Github</a>
                </div>
                <img className='about-me__photo' src={myPhoto} alt='фото' />
            </div>
        </section>
    )
}

export default AboutMe;