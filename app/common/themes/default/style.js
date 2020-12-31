import LoadingView from './styles/component/LoadingView';
import login from './styles/pages/login/login';
import Toast from './styles/component/Toast';
import main from './styles/pages/main/main';

export default {
	component: {
		LoadingView,
		Toast,
	},
	pages: {
		login: {
			login,
		},
		main: {
			main,
		},
	},
};
