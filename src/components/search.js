import React from 'react';
import './search.css';

import SearchResultCard from './searchResultCard';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			category: '',
			searchResults: [],
			error: false
		};
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleImageSave = this.handleImageSave.bind(this);
	}

	adjustSearchString = string => {
		let lowerCase = string.toLowerCase();
		let trimmedSpace = lowerCase
			.replace(/\s+/g, ' ')
			.trim()
			.split(' ');
		let finalString = '';
		trimmedSpace.forEach((term, index) => {
			if (index === 0) {
				finalString += term;
			} else {
				finalString += `+${term}`;
			}
		});
		return finalString;
	};

	searchAndDisplayResults = () => {
		this.setState({
			searchResults: []
		});

		let urlString = `https://pixabay.com/api/?key=${
			process.env.REACT_APP_API_KEY_PIXABAY
		}`;

		let queryString = this.state.searchTerm.length
			? `&q=${this.state.searchTerm}`
			: null;

		let category = this.state.category.length
			? `&category=${this.state.category}`
			: null;

		if (queryString) {
			urlString += queryString;
		}

		if (category) {
			urlString += category;
		}

		urlString += '&per_page=20';

		apiGet(urlString)
			.then(data => {
				this.setState({ error: false });
				this.setState({
					searchResults: data.hits
				});
			})
			.catch(err => {
				this.setState({ error: true });
			});
	};

	handleImageSave(id, url) {
		this.props.handleImageSave(id, url);
	}

	handleSearchInputChange(e) {
		let string = this.adjustSearchString(e.target.value);
		this.setState({
			searchTerm: string
		});
	}

	handleCategoryChange(e) {
		this.setState({
			category: e.target.value
		});
	}

	handleFormSubmit(e) {
		e.preventDefault();
		this.searchAndDisplayResults();
	}

	render() {
		if (!this.state.error) {
			return (
				<div>
					<form>
						<input
							className="text-input"
							type="text"
							placeholder="Keyword..."
							onChange={this.handleSearchInputChange}
						/>

						<select
							className="dropdown-input"
							onChange={this.handleCategoryChange}
						>
							<option value="">Category...</option>
							<option value={null}>No Category</option>
							<option value="fashion">Fashion</option>
							<option value="nature">Nature</option>
							<option value="backgrounds">Backgrounds</option>
							<option value="science">Science</option>
							<option value="education">Education</option>
							<option value="people">People</option>
							<option value="feelings">Feelings</option>
							<option value="religion">Religion</option>
							<option value="health">Health</option>
							<option value="places">Places</option>
							<option value="animals">Animals</option>
							<option value="industry">Industry</option>
							<option value="food">Food</option>
							<option value="computer">Computer</option>
							<option value="sports">Sports</option>
							<option value="transportation">
								Transportation
							</option>
							<option value="travel">Travel</option>
							<option value="buildings">Buildings</option>
							<option value="business">Business</option>
							<option value="music">Music</option>
						</select>
						<button onClick={this.handleFormSubmit}>Search</button>
					</form>
					<div className="search-results">
						{this.state.searchResults.map((image, index) => {
							let savedImage = this.props.favs[image.id]
								? true
								: false;
							return (
								<SearchResultCard
									id={image.id}
									key={`${image.id}${index}`}
									src={image.webformatURL}
									user={image.user}
									tags={image.tags}
									likes={image.likes}
									favorites={image.favorites}
									saved={savedImage}
									onSelectImage={this.handleImageSave}
								/>
							);
						})}
					</div>
				</div>
			);
		} else {
			return (
				<div className="error">
					You have encountered an error, likely a 429 error from
					Pixabay asking us to stop making the same request.
				</div>
			);
		}
	}
}

async function apiGet(urlString) {
	try {
		const resp = await fetch(urlString);
		return resp.json();
	} catch (err) {
		throw err;
	}
}

export default Search;
