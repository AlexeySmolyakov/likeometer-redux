import { VK_API_VERSION } from '../constants'

export function fetchAlbums (options = {}) {
	options = {
		...options,
		need_covers: 1,
		need_system: 1,
		photo_sizes: 1,
		v: VK_API_VERSION,
	};

	return new Promise((resolve, reject) => {
		VK.api('photos.getAlbums', options, (response) => {
			if (response.response) resolve(response.response);
			else reject(response.error);
		})
	})
}