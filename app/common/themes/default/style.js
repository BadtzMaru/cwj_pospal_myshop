import LoadingView from './styles/component/LoadingView';
import login from './styles/pages/login/login';
import Toast from './styles/component/Toast';
import main from './styles/pages/main/main';
import Container from './styles/component/Container';
import Header from './styles/component/Header';
import DateRangeSelector from './styles/component/DateRangeSelector';
import ScrollableTabView, { tpml1 } from './styles/component/CustomScrollableTabView';
import PullRefreshScrollView from './styles/component/PullRefreshScrollView';
import overview from './styles/pages/overview/main';
import LineChart from './styles/component/LineChart';

export default {
	component: {
		LoadingView,
		Toast,
		Container,
		Header,
		DateRangeSelector,
		PullRefreshScrollView,
		ScrollableTabView,
		ScrollableTabViewTpml1: tpml1,
		LineChart,
	},
	pages: {
		login: {
			login,
		},
		main: {
			main,
		},
		overview: {
			main: overview,
		},
	},
};
