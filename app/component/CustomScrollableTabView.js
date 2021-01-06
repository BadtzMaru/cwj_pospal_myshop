import React, { Component } from 'react';
import { Platform, ViewPropTypes } from 'react-native';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';

import commonUtil from '../common/commonUtil';

export default class CustomScrollableTabView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabIndex: this.props.initialPage || 0,
		};
		this._onTouchStart = this._onTouchStart.bind(this);
		this._onTouchMove = this._onTouchMove.bind(this);
	}

	static defaultProps = {
		initialPage: 0,
		scrollTpml: 0,
		tabbarStyle: {},
		tabsContainerStyle: {},
		onChangeTab: null,
	};

	_onTouchStart(e) {
		if (Platform.OS === 'android') {
			_touchStartX = e.nativeEvent.pageX;
		}
	}

	_onTouchMove(e) {
		if (Platform.OS === 'android') {
			if (_touchStartX - e.nativeEvent.pageX > 36) {
				this.refs.scrollableTabView.goToPage(1);
			}
		}
	}

	goToPage(index) {
		this.refs.scrollableTabView.goToPage(index);
	}

	render() {
		let theme = commonUtil.getTheme();
		let styles = theme.style.component.ScrollableTabView;
		let renderTabBarTpl = (
			<ScrollableTabBar
				style={[styles.scrollableTabBar, this.props.tabbarStyle]}
				underlineWidth={styles.tabBarUnderlineWidth}
				tabsContainerStyle={this.props.tabsContainerStyle}
			/>
		);
		if (this.props.scrollTpml == 1) {
			styles = theme.style.component.ScrollableTabViewTpml1;
			renderTabBarTpl = <DefaultTabBar style={styles.scrollableTabBar} underlineStyle={styles.tabBarUnderlineWidth} />;
		}

		return (
			<ScrollableTabView
				ref='scrollableTabView'
				style={styles.container}
				initialPage={this.props.initialPage}
				tabBarUnderlineStyle={styles.tabBarUnderline}
				tabBarTextStyle={styles.tabBarText}
				tabBarActiveTextColor={styles.tabBarActiveTextColor}
				tabBarInactiveTextColor={styles.tabBarInactiveTextColor}
				locked={Platform.OS === 'android' && this.state.tabIndex === 0}
				onChangeTab={(object) => {
					this.setState({ tabIndex: object.i });
					if (this.props.onChangeTab) {
						this.props.onChangeTab(object.i, object.ref && object.ref.ref);
					}
				}}
				renderTabBar={() => renderTabBarTpl}
				contentProps={{
					onTouchStart: this._onTouchStart,
					onTouchMove: this._onTouchMove,
				}}>
				{this.props.children}
			</ScrollableTabView>
		);
	}
}
