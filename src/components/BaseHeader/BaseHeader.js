import React from 'react';
import styled from 'styled-components';
import Autosuggest from 'react-autosuggest';
import Link from 'components/Link';
import {
  escapeRegexCharacters,
} from 'utils/common';
import Paragraph from './P';
import Img from './Img';
import HeaderWrapper from './HeaderWrapper';
import Logo from './PhoneCataloguesLogo.svg';
import FixedHeaderContainer from './FixedHeaderContainer';
import AutosuggestWrapper from './AutosuggestWrapper';
import NavigationWrapper from './NavigationWrapper';
import NavSearchWrapper from './NavSearchWrapper';
import UnorderedListWrapper from './UnorderedListWrapper';
import ListItemWrapper from './ListItemWrapper';
import RenderSuggestionsContainer from './RenderSuggestionsContainer';
import InputGroupButton from './InputGroupButton';

const Thumbnail = styled(Img) `
  width: 30px;
  margin: 0;
`;

const SuggestionDiv = styled.div`
  display: flex;
`;

const SuggestionText = styled.div`
  margin-left: 10px;
`;

const getSuggestions = (value, allDevices) => {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue !== '') {
    const regex = new RegExp(`${escapedValue}`, 'i');
    const results = [];
    allDevices.map((device) => {
      if (results.length < 100) {
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
  <SuggestionDiv>
    <span><Thumbnail src={suggestion.imageurl} /></span>
    <SuggestionText><Paragraph>{suggestion.name}</Paragraph></SuggestionText>
  </SuggestionDiv>
);

const renderInputComponent = inputProps => (
  <div className="inputContainer">
    <InputGroupButton className="fa fa-search" />
    <input {...inputProps} />
  </div>
);

class Header extends React.Component {
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

  onFormSubmit = (event) => {
    event.preventDefault();
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state.value);
  };

  render() {
    const { value, suggestions } = this.state;
    const { onSuggestionSelected } = this.props;
    const inputProps = {
      placeholder: 'Search PhoneCatalogues',
      value,
      onChange: this.onChange,
    };

    return (
      <FixedHeaderContainer>
        <HeaderWrapper>
          <header>
            <Link to="/">
              <Img src={Logo} alt="Phone Catalogues - Logo" />
            </Link>
            <NavigationWrapper>
              <nav>
                <UnorderedListWrapper>
                  <NavSearchWrapper>
                    <AutosuggestWrapper>
                      <form onSubmit={this.onFormSubmit}>
                        <Autosuggest
                          suggestions={suggestions}
                          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                          onSuggestionSelected={onSuggestionSelected}
                          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                          getSuggestionValue={getSuggestionValue}
                          renderSuggestion={renderSuggestion}
                          inputProps={inputProps}
                          renderSuggestionsContainer={RenderSuggestionsContainer}
                          renderInputComponent={renderInputComponent}
                        />
                      </form>
                    </AutosuggestWrapper>
                  </NavSearchWrapper>
                  <ListItemWrapper>
                    <Link to="/">
                      Home
                    </Link>
                  </ListItemWrapper>
                  <ListItemWrapper>
                    <Link to="/reviews">
                      Reviews
                    </Link>
                  </ListItemWrapper>
                </UnorderedListWrapper>
              </nav>
            </NavigationWrapper>
          </header>
        </HeaderWrapper>
      </FixedHeaderContainer>
    );
  }
}

Header.propTypes = {
  onSuggestionSelected: React.PropTypes.func,
  onFormSubmit: React.PropTypes.func,
  allDevices: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
};

export default Header;
