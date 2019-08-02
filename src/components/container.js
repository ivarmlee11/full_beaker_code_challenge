import React from 'react';
import Search from './search';
import Saved from './saved';
import './container.css';

class Container extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			savedImages: {}
		};
		this.handleImageUnsave = this.handleImageUnsave.bind(this);
		this.handleImageSave = this.handleImageSave.bind(this);
	}

	componentDidMount() {
		let name = process.env.REACT_APP_LOCAL_STORAGE_ID;
		let localStorageRef = localStorage.getItem(name);

		if (localStorageRef) {
			let parsedArray = JSON.parse(window.localStorage.getItem(name));

			this.setState({
				savedImages: parsedArray
			});
		} else {
			window.localStorage.setItem(name, JSON.stringify({}));
		}
	}

	handleImageSave(id, url) {
		let name = process.env.REACT_APP_LOCAL_STORAGE_ID;
		let savedImages = { ...this.state.savedImages };
		savedImages[id] = {
			id,
			url,
			favorited: true
		};
		this.setState(
			{
				savedImages: savedImages
			},
			() => {
				window.localStorage.setItem(name, JSON.stringify(savedImages));
			}
		);
	}

	handleImageUnsave(id) {
		let name = process.env.REACT_APP_LOCAL_STORAGE_ID;
		var hereWeGo = { ...this.state.savedImages };
		delete hereWeGo[id];

		this.setState(
			{
				savedImages: hereWeGo
			},
			() => {
				window.localStorage.setItem(name, JSON.stringify(hereWeGo));
			}
		);
	}

	render() {
		return (
			<div className="flexable-container">
				<main>
					<Search
						handleImageSave={this.handleImageSave}
						favs={this.state.savedImages}
					/>
				</main>
				<aside>
					<Saved
						handleImageUnsave={this.handleImageUnsave}
						saves={this.state.savedImages}
					/>
				</aside>
			</div>
		);
	}
}

export default Container;
