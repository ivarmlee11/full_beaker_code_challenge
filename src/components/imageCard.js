import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const ImageCard = props => {
	return (
		<div className="image-link">
			<a className="view-link" href={props.src}>
				<FontAwesomeIcon icon={faExternalLinkAlt} />
			</a>
			<a href={props.src}>#{props.id}</a>
		</div>
	);
};

export default ImageCard;
