'use strict';
import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import commonUtil from '../common/commonUtil';

const SIZES = ['small', 'large'];
const LOADINGSTYLES = ['inside', 'over'];

export default class LoadingView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: this.props.loading,
			loadingText: this.props.loadingText,
			isEmpty: this.props.isEmpty,
			loadingShowContent: this.props.loadingShowContent,
		};
	}

	static propTypes = {
		loading: PropTypes.bool,
		loadingText: PropTypes.string,
		loadingColor: PropTypes.string,
		loadingSize: PropTypes.oneOf(SIZES),
		overlayColor: PropTypes.string,
		cancelable: PropTypes.bool,
		loadingPaddingTop: PropTypes.number,
		loadingPaddingBottom: PropTypes.number,
		isEmpty: PropTypes.bool,
		emptyText: PropTypes.string,
		loadingShowContent: PropTypes.bool,
		relative: PropTypes.bool,
		loadingStyle: PropTypes.oneOf(LOADINGSTYLES),
	};

	static defaultProps = {
		loading: false,
		loadingText: '',
		loadingColor: '',
		loadingSize: 'small', // 'normal',
		overlayColor: '',
		cancelable: false,
		loadingPaddingTop: 0,
		loadingPaddingBottom: 0,
		isEmpty: false,
		emptyText: '',
		loadingShowContent: false,
		relative: false,
		loadingStyle: 'over',
	};

	close() {
		this.setState({ loading: false });
	}

	componentWillReceiveProps(nextProps) {
		const { loading, isEmpty, textContent } = nextProps;
		this.setState({ loading, isEmpty, textContent });
	}

	_renderLoading(styles) {
		if (this.state.loading) {
			if (this.props.loadingStyle == 'over') {
				return (
					<TouchableOpacity
						onPress={() => {
							this.props.cancelable ? this.setState({ loading: false }) : null;
						}}
						style={[this.props.relative ? styles.background_relative : styles.background]}>
						<View style={[styles.activityIndicatorContainer, this.props.overlayColor != '' && { backgroundColor: this.props.overlayColor }]}>
							<ActivityIndicator color={this.props.loadingColor == '' ? styles.loadingColor : this.props.loadingColor} size={this.props.loadingSize} />
							<Text style={styles.loadingText}>{commonUtil.translate('加载中')}</Text>
						</View>
					</TouchableOpacity>
				);
			} else {
				return (
					<TouchableOpacity
						onPress={() => {
							this.props.cancelable ? this.setState({ loading: false }) : null;
						}}
						style={[styles.background_relative]}>
						<View style={[styles.activityIndicatorContainer, { backgroundColor: 'transparent' }]}>
							<ActivityIndicator color={styles.insideLoadingColor} size={this.props.loadingSize} />
						</View>
					</TouchableOpacity>
				);
			}
		} else {
			return null;
		}
	}

	_renderContent(styles) {
		let { loading, isEmpty, loadingShowContent } = this.state;
		if (loading == false) {
			if (isEmpty == true) {
				return (
					<View style={styles.emptyTextContainer}>
						<Text style={styles.emptyText}>{this.props.emptyText == '' ? commonUtil.translate('暂无数据') : this.props.emptyText}</Text>
					</View>
				);
			} else {
				return this.props.children;
			}
		} else if (loadingShowContent) {
			return this.props.children;
		}
	}

	render() {
		let theme = commonUtil.getTheme();
		let styles = theme.style.component.LoadingView;
		return (
			<View style={[styles.container, this.props.style && this.props.style]}>
				{this._renderContent(styles)}
				{this._renderLoading(styles)}
			</View>
		);
	}
}
