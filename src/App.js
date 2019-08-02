import React from 'react';
import Container from './components/container';

function App() {
	return (
		<div>
			<Container />
			{/* I read the API Docs, gotta link to their site. Haha */}
			<footer>
				<a href="https://pixabay.com">
					I am making use of the Pixabay API
				</a>
			</footer>
		</div>
	);
}

export default App;
