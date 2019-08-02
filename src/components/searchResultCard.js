import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faStar } from '@fortawesome/free-solid-svg-icons';

import './searchResultCard.css';

const SearchResultCard = props => {
	return (
		<div className="search-result-card">
			<div className="image-container">
				<img
					id={props.id}
					src={props.src}
					alt={`Pixabay API data submitted by user ${props.user}`}
					width="130"
				/>

				{props.saved ? (
					<div className="saved">Saved</div>
				) : (
					<div
						className="not-saved"
						onClick={() => props.onSelectImage(props.id, props.src)}
					>
						Save
					</div>
				)}
			</div>

			<div className="info-container">
				<div className="tags-box">
					{props.tags.split(', ').map((tag, index) => {
						return (
							<div key={`${tag}${index}`} className="tag">
								{tag}
							</div>
						);
					})}
				</div>

				<div className="likes-and-favs">
					<div>
						<span>{props.likes}</span>
						<FontAwesomeIcon icon={faThumbsUp} />
					</div>
					<div>
						<span>{props.favorites}</span>
						<FontAwesomeIcon icon={faStar} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchResultCard;
