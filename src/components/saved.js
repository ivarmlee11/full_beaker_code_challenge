import React from 'react';
import ImageCard from './imageCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import './saved.css';

class Saved extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleImageUnsave = this.handleImageUnsave.bind(this);
	}

	handleImageUnsave(id) {
		this.props.handleImageUnsave(id);
	}

	render() {
		const imageArray = Object.keys(this.props.saves).map(
			i => this.props.saves[i]
		);
		return (
			<div className="saved-container">
				<h1>Saved</h1>
				{imageArray.map((image, index) => (
					<span className="image-card" key={`${image.url}${index}`}>
						<span onClick={() => this.handleImageUnsave(image.id)}>
							<FontAwesomeIcon icon={faWindowClose} />
						</span>

						<ImageCard src={image.url} id={image.id} />
					</span>
				))}
			</div>
		);
	}
}

export default Saved;
