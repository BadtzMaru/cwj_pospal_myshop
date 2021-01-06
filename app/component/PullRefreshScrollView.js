import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator, Dimensions, Platform } from 'react-native';
import commonUtil from '../common/commonUtil';
import LoadingView from './LoadingView';

let { width, height } = Dimensions.get('window');

class PullRefreshScrollView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			height: 0,
			contentHeight: 0,
		};
	}
	static defaultProps = {
		refreshing: false,
		loadingmore: false,
		loadingcompleted: true,
		loading: false,
		isEmpty: false,
	};
	handleScroll(event) {
		console.log('handleScroll:在滚动的过程中调用 ', event);
	}
	renderLoadingMore(styles) {
		let { onLoadingMore, loadingmore } = this.props;
		if (onLoadingMore != null && loadingmore == true) {
			return (
				<View style={styles.activityIndicatorContainer}>
					<ActivityIndicator color={styles.loadingColor} size='large' style={{ flex: 1 }} />
				</View>
			);
		}
	}
	// 滚动到底部 --- 给外部调用
	scrollToEnd() {
		if (this.state.contentHeight > height - 240) {
			this.refs.scrollview.scrollToEnd({ animated: false });
		}
	}
	render() {
		let { onLoadingMore, loadingcompleted } = this.props;
		let theme = commonUtil.getTheme();
		let styles = theme.style.component.PullRefreshScrollView;
		return (
			<ScrollView
				ref='scrollview'
				{...this.props}
				refreshControl={
					<RefreshControl
						refreshing={this.props.refreshing}
						onRefresh={this.props.onRefresh}
						colors={[styles.loadingColor, styles.loadingColor + '88', styles.loadingColor + '22']}
						title=''
					/>
				}
				scrollEventThrottle={300}
				onScroll={onLoadingMore != null && loadingcompleted == false ? this.handleScroll.bind(this) : null}
				onContentSizeChange={(w, h) => this.setState({ contentHeight: h })}
				style={[styles.container, this.props.style]}>
				<LoadingView loading={this.props.loading} isEmpty={this.props.isEmpty} style={styles.loadingView} relative={true}>
					{this.props.children}
				</LoadingView>
				{this.renderLoadingMore(styles)}
				{Platform.OS === 'android' ? <View style={{ width: width, height: 90 }} /> : null}
			</ScrollView>
		);
	}
}

export default PullRefreshScrollView;
