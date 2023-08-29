import React from 'react';
import './Checkbox.css';

function FilterCheckbox({ isChecked, toggleCheckbox }) {
    return (
        <div className='search__checkbox-wrap'>
            <label className='search__checkbox-switch'>
                <input
                    className='search__checkbox'
                    id='search-checkbox'
                    name='search-checkbox'
                    type='checkbox'
                    onChange={toggleCheckbox}
                    checked={isChecked}
                />
                <span className='search__checkbox-slider round' />
            </label>
            <p className='search__checkbox-title'>Короткометражки</p>
        </div>
    );
};

export default FilterCheckbox;