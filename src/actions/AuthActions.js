import API from '../api';
import { fetchUser } from './UserActions'
import { CHECKING_AUTH } from '../constants'

export const checkAuth = () => {
	return (dispatch) => {
		return API.auth.checkAuth()
		.then(() => {
			return dispatch(fetchUser())
		})
		.catch(error => {
			console.warn('[API ERROR AUTH]', error)
		})
		.then(() => {
			dispatch({
				type: CHECKING_AUTH,
				payload: false
			});
		})
	}
};

export const login = (credentials) => {
	return (dispatch) => {
		return API.auth.login(credentials)
		.then(response => {
			dispatch(checkAuth());
		})
		.catch(error => {
			console.warn('[API ERROR AUTH]', error)
		})
		.then(() => {
			dispatch({
				type: CHECKING_AUTH,
				payload: false
			});
		})
	}
};

export const logout = () => {
	return (dispatch) => {
		return API.auth.logout()
		.then(response => {
			console.warn(response)
		})
	}
};