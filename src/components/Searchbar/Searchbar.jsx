import { useState } from 'react';
import PropTypes from 'prop-types';
import s from '../Searchbar/Searchbar.module.css';

export function Searchbar({ onSubmit }) {
    const [searchQuery, setSarchQuery] = useState('');
    
    const handleSubmit = event => {
        event.preventDefault();

        onSubmit(searchQuery);
        setSarchQuery('');
    };

    const handleChange = event => setSarchQuery(event.target.value);

    return (
        <header className={s.Searchbar}>
            <form onSubmit={handleSubmit} className={s.SearchForm}>
                <button type="submit" className={s.SearchFormButton}>
                    <span className={s.SearchFormButtonLabel}>Search</span>
                </button>
                <input
                    value={searchQuery}
                    onChange={handleChange}
                    className={s.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    )
 
}
   
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}