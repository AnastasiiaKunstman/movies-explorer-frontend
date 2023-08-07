import './SearchForm.css';

function SearchForm() {
    return (
        <section className='search'>
            <form className='search__form'>
                <span className='search__icon' />
                <div className='search__input-wrap'>
                    <input className='search__input' type='text' placeholder='Фильм' required />
                    <button className='search__button' type='submit'>Найти</button>
                </div>
                <div className='search__checkbox-wrap'>
                    <label className='search__checkbox-switch'>
                        <input className='search__checkbox' id='search-checkbox' type='checkbox' />
                        <span className='search__checkbox-slider round' />
                    </label>
                    <p className='search__checkbox-title'>Короткометражки</p>
                </div>
            </form>
            <hr />
        </section>
    )
};

export default SearchForm;