import API from '../api'
import {
	FETCH_PHOTOS,
	FETCH_PHOTOS_STATE,
	FETCH_PHOTOS_BY_ID,
	FETCH_PHOTOS_BY_ID_STATE
} from '../constants'

export const fetchPhotos = (options) => {
	return (dispatch, getState) => {
		const state = getState();
		const { owner_id, album_id } = options;
		const key = `${owner_id}_${album_id}`;

		// Should make API request?
		if (state.photos.photos[key]) {
			return Promise.resolve(state.photos.photos[key].items);
		}

		dispatch({
			type: FETCH_PHOTOS_STATE,
			payload: true,
		});

		// API request, returns Promise with response
		return API.photos.fetchPhotos(options)
		.then(response => {
			dispatch({
				type: FETCH_PHOTOS,
				payload: {
					album_id: options.album_id,
					owner_id: options.owner_id,
					photos: response,
				}
			});
			return response.items;
		})
		.catch(error => {
			console.warn('[API ERROR PHOTOS]', error)
		})
		.then(response => {
			dispatch({
				type: FETCH_PHOTOS_STATE,
				payload: false,
			});
			return response;
		})
	}
};

export const fetchPhotosById = (options) => {
	return (dispatch, getState) => {
		const state = getState();
		const { photos } = options;

		dispatch({
			type: FETCH_PHOTOS_BY_ID_STATE,
			payload: true,
		});

		return API.photos.fetchPhotosById({ photos })
		.then(response => {
			return response;
		})
		.catch(error => {
			console.warn('[API ERROR PHOTOS_BY_ID]', error)
		})
		.then(response => {
			dispatch({
				type: FETCH_PHOTOS_BY_ID_STATE,
				payload: false,
			});
			return response;
		});
	}
};