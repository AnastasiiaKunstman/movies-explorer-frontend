import './ShowMore.css';

function ShowMore({ showMore }) {
    return (
        <div className={!showMore ? 'show-more__hide' : 'show-more'}>
            <button className='show-more__btn' type='button'>Ещё</button>
        </div>
    )
};

export default ShowMore;