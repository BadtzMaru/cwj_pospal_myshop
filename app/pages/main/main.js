import { React, Component, Image, commonUtil, View, Alert, storageUtil } from '../../common/importUtil';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import overview from './../overview/main';
import sale from './../sale/main';
import member from './../member/main';
import marking from './../marking/main';
import more from './../more/main';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSale: true,
			isMember: true,
			isMarking: true,
		};
		// 云端 销售
		storageUtil.isLock(2, 78).then((lock) => {
			this.setState({ isSale: lock });
		});
		// 云端 会员
		storageUtil.isLock(2, 176).then((lock) => {
			this.setState({ isMember: lock });
		});
		// 云端 营销
		storageUtil.isLock(2, 252).then((lock) => {
			this.setState({ isMarking: lock });
		});
	}

	tabNavigator() {
		let navigateList = {
			overview: {
				screen: overview,
				navigationOptions: {
					tabBarLabel: commonUtil.translate('总览'),
					tabBarIcon: ({ focused }) => {
						if (focused) {
							return <Image style={commonUtil.getTheme().style.pages.main.main.logo} source={commonUtil.getTheme().image.toolbar_overview_icon_hl} />;
						} else {
							return <Image style={commonUtil.getTheme().style.pages.main.main.logo} source={commonUtil.getTheme().image.toolbar_overview_icon_nl} />;
						}
					},
				},
			},
			sale: {
				screen: sale,
				navigationOptions: {
					tabBarLabel: commonUtil.translate('销售'),
					tabBarIcon: ({ focused }) => {
						if (this.state.isSale) {
							return (
								<View>
									<Image style={commonUtil.getTheme().style.pages.main.main.logo} source={commonUtil.getTheme().image.toolbar_sales_icon_nl} />
									<Image style={commonUtil.getTheme().style.pages.main.main.lock} source={commonUtil.getTheme().image.toolbar_lock} />
								</View>
							);
						} else {
							if (focused) {
								return <Image style={commonUtil.getTheme().style.pages.main.main.logo} source={commonUtil.getTheme().image.toolbar_sales_icon_hl} />;
							} else {
								return <Image style={commonUtil.getTheme().style.pages.main.main.logo} source={commonUtil.getTheme().image.toolbar_sales_icon_nl} />;
							}
						}
					},
					tabBarOnPress: (tab) => {
						if (this.state.isSale) {
							Alert.alert(this.translate('您无此权限，请到云端设置[销售-营业概况]权限'));
						} else {
							tab.defaultHandler();
						}
					},
				},
			},
			member: {
				screen: member,
				navigationOptions: {
					tabBarLabel: commonUtil.translate('会员'),
					tabBarIcon: ({ focused }) => {
						if (this.state.isMember) {
							return (
								<View>
									<Image style={commonUtil.getTheme().style.pages.main.main.logo} source={commonUtil.getTheme().image.toolbar_member_icon_nl} />
									<Image style={commonUtil.getTheme().style.pages.main.main.lock} source={commonUtil.getTheme().image.toolbar_lock} />
								</View>
							);
						} else {
							if (focused) {
								return <Image style={commonUtil.getTheme().style.pages.main.main.logo} source={commonUtil.getTheme().image.toolbar_member_icon_hl} />;
							} else {
								return <Image style={commonUtil.getTheme().style.pages.main.main.logo} source={commonUtil.getTheme().image.toolbar_member_icon_nl} />;
							}
						}
					},
					tabBarOnPress: (tab) => {
						if (this.state.isMember) {
							Alert.alert(this.translate('您无此权限，请到云端设置[会员-会员概览]权限'));
						} else {
							tab.defaultHandler();
						}
					},
				},
			},
			marking: {
				screen: marking,
				navigationOptions: {
					tabBarLabel: commonUtil.translate('营销'),
					tabBarIcon: ({ focused }) => {
						if (this.state.isMarking) {
							return (
								<View>
									<Image style={commonUtil.getTheme().style.pages.main.main.logo} source={commonUtil.getTheme().image.toolbar_marking_icon_nl} />
									<Image style={commonUtil.getTheme().style.pages.main.main.lock} source={commonUtil.getTheme().image.toolbar_lock} />
								</View>
							);
						} else {
							if (focused) {
								return <Image style={commonUtil.getTheme().style.pages.main.main.logo} source={commonUtil.getTheme().image.toolbar_marking_icon_hl} />;
							} else {
								return <Image style={commonUtil.getTheme().style.pages.main.main.logo} source={commonUtil.getTheme().image.toolbar_marking_icon_nl} />;
							}
						}
					},
					tabBarOnPress: (tab) => {
						if (this.state.isMarking) {
							Alert.alert(this.translate('您无此权限，请到云端设置[营销-营销概览]权限'));
						} else {
							tab.defaultHandler();
						}
					},
				},
			},
			more: {
				screen: more,
				navigationOptions: {
					tabBarLabel: commonUtil.translate('更多'),
					tabBarIcon: ({ focused }) => {
						if (focused) {
							return <Image style={commonUtil.getTheme().style.pages.main.main.logo} source={commonUtil.getTheme().image.toolbar_more_icon_hl} />;
						} else {
							return <Image style={commonUtil.getTheme().style.pages.main.main.logo} source={commonUtil.getTheme().image.toolbar_more_icon_nl} />;
						}
					},
				},
			},
		};
		let MainStack = createAppContainer(
			createBottomTabNavigator(navigateList, {
				initialRouteName: 'overview',
				tabBarOptions: {
					//当前选中的tab bar的文本颜色和图标颜色
					activeTintColor: commonUtil.getTheme().color.primary,
					//当前未选中的tab bar的文本颜色和图标颜色
					inactiveTintColor: commonUtil.getTheme().color.secondaryText,
					//是否显示tab bar的图标，默认是false
					showIcon: true,
					//showLabel - 是否显示tab bar的文本，默认是true
					showLabel: true,
					//是否将文本转换为大小，默认是true
					upperCaseLabel: false,
					//material design中的波纹颜色(仅支持Android >= 5.0)
					pressOpacity: 0.8,
					//tab bar的样式
					style: {
						backgroundColor: '#FCFCFCAA',
						paddingBottom: 1,
						borderTopWidth: 0.5,
						padding: 3,
						borderTopColor: '#00000030',
					},
					//tab bar的文本样式
					labelStyle: {
						fontSize: 10,
						margin: 1,
					},
					//tab 页指示符的样式 (tab页下面的一条线).
					indicatorStyle: { height: 0 },
				},
				//tab bar的位置, 可选值： 'top' or 'bottom'
				tabBarPosition: 'bottom',
				//是否允许滑动切换tab页
				swipeEnabled: true,
				//是否在切换tab页时使用动画
				animationEnabled: false,
				//是否懒加载
				lazy: true,
				//返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
				backBehavior: 'none',
			})
		);
		return MainStack;
	}

	render() {
		const Tab = this.tabNavigator();
		storageUtil.setNavigation(this.props.navigation)
		return <Tab />;
	}
}

export default Main;
