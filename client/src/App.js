import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

import CodeScanner from './components/pages/CodeScanner';
import CodeGenerator from './components/pages/CodeGenerator';
import FileUploader from './components/pages/FileUploader';
import NotFound from './components/pages/NotFound';
import List from './components/pages/List';

import PrivateRoutes from './components/routing/PrivateRoutes';

import setAuthToken from './utils/setAuthToken';

import './styles/main.scss';

const App = () => {
	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
	}, []);
	return (
		<>
			<Navbar />
			<Header />
			<section className='container'>
				<Switch>
					<Route exact path='/' component={CodeScanner} />
					<Route exact path='/list' component={List} />
					<PrivateRoutes path='/generator' component={CodeGenerator} />
					<PrivateRoutes path='/fileuploader' component={FileUploader} />
					<Route component={NotFound} />
				</Switch>
			</section>
			<Footer />
		</>
	);
};

export default App;
