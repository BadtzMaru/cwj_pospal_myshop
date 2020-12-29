import { createStackNavigator, createAppContainer } from 'react-navigation';

import login from './app/pages/login/login';

const navigator = createStackNavigator(
	{
		login: { screen: login },
	},
	{
		initialRouteName: 'login', //初始界面
		mode: 'card', // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
		headerMode: 'none', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
		onTransitionStart: () => {
			console.log('导航栏切换开始');
		},
		onTransitionEnd: () => {
			console.log('导航栏切换结束');
		},
	}
);

export default createAppContainer(navigator);
