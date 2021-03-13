import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

import CodeScanner from './components/pages/CodeScanner';
import CodeGenerator from './components/pages/CodeGenerator';
import NotFound from './components/pages/NotFound';

import './styles/main.scss';

const App = () => {
	return (
		<>
			<Navbar />
			<Header />
			<section className='container'>
				<Switch>
					<Route exact path='/' component={CodeScanner} />
					<Route exact path='/generator' component={CodeGenerator} />
					<Route component={NotFound} />
				</Switch>
			</section>
			<Footer />
		</>
	);
};

export default App;
