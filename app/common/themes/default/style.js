import LoadingView from './styles/component/LoadingView';
import login from './styles/pages/login/login';
import Toast from './styles/component/Toast';
import main from './styles/pages/main/main';
import Container from './styles/component/Container';
import Header from './styles/component/Header';

export default {
	component: {
		LoadingView,
		Toast,
		Container,
		Header,
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
