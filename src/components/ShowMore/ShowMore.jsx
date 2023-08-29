import './ShowMore.css';

function ShowMore({ onClick }) {
    return (
        <div className='show-more'>
            <button className='show-more__btn' type='button' onClick={onClick}>Ещё</button>
        </div>
    )
};

export default ShowMore;