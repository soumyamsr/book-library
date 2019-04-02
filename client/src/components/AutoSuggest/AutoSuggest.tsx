import * as React from "react";
import { AutoSuggestProps } from "./AutoSuggest.props";
import { AutoSuggestState } from "./AutoSuggest.state";
import { Link } from 'react-router-dom';
import "./AutoSuggest.scss";


class AutoSuggest extends React.PureComponent<AutoSuggestProps, AutoSuggestState> {
	state = {
    inputTextVal: '',
    suggestions: [],
  };

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0
      ? []
      : this.props.items.filter((i) => i.name.toLowerCase().indexOf(inputValue) >= 0);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      inputTextVal: event.target.value,
      suggestions: this.getSuggestions(event.target.value),
    });
  }

	public render() {
    const { inputTextVal, suggestions } = this.state;

		return (
      <section className="suggestion-container">
        <input type="text"
          placeholder={this.props.placeholder}
          name="autoSuggestInput" id="autoSuggestInput"
          value={inputTextVal}
          onChange={this.handleInputChange.bind(this)}
          className="autosuggest-input"/>
        {
          suggestions.length
          ? (
            <article className="suggestion-block">
              {
                suggestions.map(s => (
                  <Link to={{pathname: `/books/${s.id}`}} key={s.id} className="suggestion">{s.name}</Link>
                ))
              }
            </article>
          )
          : ''
        }
      </section>
		);
	}
}

export default AutoSuggest;
