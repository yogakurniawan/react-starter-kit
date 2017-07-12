import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import FaSearch from 'react-icons/lib/fa/search';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BaseHeader.css'; // eslint-disable-line
import Link from '../Link';
import Logo from './PhoneCataloguesLogo.svg';

const escapeRegexCharacters = str => (str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

const getSuggestions = (value, allDevices) => {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue !== '') {
    const regex = new RegExp(`${escapedValue}`, 'i');
    const results = [];
    allDevices.map((device) => {
      if (results.length < 8) {
        if (regex.test(device.description)) {
          results.push(device);
        }
      }
      return null;
    });
    return results;
  }
  return [];
};

const getSuggestionValue = suggestion => (suggestion.name);

const renderSuggestion = suggestion => (
  <div>
    <span style={{ marginRight: '20px', display: 'inline' }}>
      <img alt={suggestion.name} className={s.thumbnail} src={suggestion.imageurl} />
    </span>
    <span style={{ display: 'inline' }}>{suggestion.name}</span>
  </div>
);

const renderInputComponent = inputProps => (
  <div className="inputContainer">
    <FaSearch className={s.inputGroupButton} />
    <input {...inputProps} />
  </div>
);

class BaseHeader extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    const { allDevices } = this.props;
    this.setState({
      suggestions: getSuggestions(value, allDevices),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const { onSuggestionSelected } = this.props;
    const inputProps = {
      placeholder: 'Search phone',
      value,
      onChange: this.onChange,
    };
    return (
      <div className={s.fixedHeaderContainer}>
        <div className={s.headerWrapper}>
          <header>
            <Link to="/">
              <img src={Logo} alt="React" />
            </Link>
            <div className={s.navigationWrapper}>
              <nav>
                <ul className={s.ulWrapper}>
                  <li className={s.navSearchWrapper}>
                    <div className={s.autoSuggestWrapper}>
                      <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionSelected={onSuggestionSelected}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        renderInputComponent={renderInputComponent}
                      />
                    </div>
                  </li>
                  <li className={s.liWrapper}>
                    <Link to="/">
                      Home
                    </Link>
                  </li>
                  <li className={s.liWrapper}>
                    <Link to="/reviews">
                      Reviews
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

BaseHeader.propTypes = {
  onSuggestionSelected: PropTypes.func,
  allDevices: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
};

export default withStyles(s)(BaseHeader);
