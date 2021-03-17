import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoutes = ({ component: Component, path }) => {
	if (localStorage.getItem('token')) {
		return <Route exact path={path} component={Component} />;
	} else {
		return <Redirect to='/' />;
	}
};

export default PrivateRoutes;
