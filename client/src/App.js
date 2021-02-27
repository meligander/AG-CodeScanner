import React from 'react';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

import './styles/main.scss';

const App = () => {
	return (
		<>
			<Navbar />
			<Header />
			<section className='container'>Info</section>
			<Footer />
		</>
	);
};

export default App;
