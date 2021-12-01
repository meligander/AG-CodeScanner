import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

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
	const [adminValues, setAdminValues] = useState({
		header: 0,
		footer: 0,
	});

	const { header, footer } = adminValues;

	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
	}, []);

	return (
		<>
			<Header
				setHeaderHeight={(value) =>
					setAdminValues((prev) => ({ ...prev, header: value }))
				}
			/>
			<section
				style={{ minHeight: `calc(100vh - ${footer}px - ${header}px)` }}
				className='container'
			>
				<Switch>
					<Route exact path='/' component={CodeScanner} />
					<Route exact path='/list' component={List} />
					<PrivateRoutes path='/generator' component={CodeGenerator} />
					<PrivateRoutes path='/fileuploader' component={FileUploader} />
					<Route component={NotFound} />
				</Switch>
			</section>
			<Footer
				setFooterHeight={(value) =>
					setAdminValues((prev) => ({ ...prev, footer: value }))
				}
			/>
		</>
	);
};

export default App;
