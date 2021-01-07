import { createStackNavigator, createAppContainer } from 'react-navigation';

import login from './app/pages/login/login';
import main from './app/pages/main/main';
import businessRanking from './app/pages/overview/more/businessRanking';

const navigator = createStackNavigator(
	{
		login: { screen: login },
		main: { screen: main },
		businessRanking: {
			screen: businessRanking,
		},
	},
	{
		initialRouteName: 'login', //初始界面
		mode: 'card', // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
		headerMode: 'none', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
		onTransitionStart: () => {},
		onTransitionEnd: () => {},
	}
);

export default createAppContainer(navigator);
