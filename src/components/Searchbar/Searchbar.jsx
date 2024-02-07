import propTypes from 'prop-types';
import { useRef } from 'react';
import css from './Searchbar.module.css';

export default function Searchbar() {
  const inputRef = useRef();

  handleSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    onSubmit(inputRef.current.value);
    form.reset();
  };
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <input
            className={css.input}
            type="text"
            placeholder="Search images and photos"
            ref={inputRef}
          />
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>
        </form>
      </header>
    );
  }

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

