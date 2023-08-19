import axios from 'axios';

const BASE_URL =
	import.meta.env.VITE_ENV == 'development'
		? import.meta.env.HXH_DEV_BASE_URL
		: import.meta.env.HXH_BASE_URL;

const axiosConfig = axios.create({
	baseURL: BASE_URL
	// headers: {
	// 	Authorization: `Bearer ${token}`
	// }
});

function catchUnauthorized(error) {
	console.log(error);
	// const authStore = useAuthStore();
	// var statusCode = error.response.status;
	// var unauthorized = 401;
	// var isLogoutURL = error.request.responseURL.indexOf('logout');
	// if (statusCode == unauthorized && authStore.token && isLogoutURL < 0) {
	// 	// Dialog.create({
	// 	// 	title: 'Unauthorized',
	// 	// 	message: 'Please log in again.',
	// 	// 	persistent: true,
	// 	// }).onOk(() => {
	// 	// 	authStore.logout();
	// 	// });

	// 	authStore.logout();
	// }
}

function catchErrors(error) {
	console.log(error);
	// var unauthorized = 401;
	// if (error.response.status != unauthorized) {
	// 	var response = error.response.data;
	// 	Dialog.create({
	// 		title: 'Error',
	// 		color: 'red',
	// 		message: response.message,
	// 		persistent: true
	// 	});
	// }
}

// Add a response interceptor
axiosConfig.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error

		catchUnauthorized(error);
		catchErrors(error);
		return Promise.reject(error);
	}
);

export default axiosConfig;
