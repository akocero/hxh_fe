import axios from '../config/qr_axios';
import Cookies from 'js-cookie';

const handleTokenExpiration = (err) => {
	if (err.response?.data?.message === 'Expired Token') {
		Cookies.remove('user');
		Cookies.remove('token');
		window.location.reload();
		return;
	}
};

const fetch = async (uri) => {
	try {
		const res = await axios.get(uri);
		return res.data.data;
	} catch (err) {
		store.error = err?.response?.data;
		console.log(err);

		handleTokenExpiration(err);
	}
};
