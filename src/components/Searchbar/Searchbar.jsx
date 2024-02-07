import propTypes from 'prop-types';
import { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    inputText: '',
  };

  handleChange = event => {
    this.setState({ inputText: event.target.value });
  };
  handleSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    this.props.onSubmit(this.state.inputText);
    this.setState({
      inputText: '',
    });
    form.reset();
  };
  render() {
    const { inputText } = this.state;
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <input
            className={css.input}
            type="text"
            placeholder="Search images and photos"
            value={inputText}
            onChange={this.handleChange}
          />
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

export default Searchbar;
