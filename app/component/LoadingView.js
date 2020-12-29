import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import commonUtil from '../common/commonUtil';
import { PropTypes } from 'prop-types';
import style from '../common/themes/default/style';

export default class LoadingView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: this.props.loading,
			isEmpty: this.props.isEmpty,
			loadingShowContent: this.props.loadingShowContent,
		};
	}

	static propTypes = {
		loading: PropTypes.bool,
		isEmpty: PropTypes.bool,
		loadingShowContent: PropTypes.bool,
		loadingColor: PropTypes.string,
		loadingSize: PropTypes.string,
		relative: PropTypes.bool,
		cancelable: PropTypes.bool,
	};

	static defaultProps = {
		loading: true,
		isEmpty: false,
		loadingShowContent: false,
		emptyText: '',
		loadingColor: '',
		loadingSize: 'small',
		loadingText: false,
		cancelable: false,
	};

	componentWillReceiveProps(nextProps) {
		const { loading, isEmpty } = nextProps;
		this.setState({ loading, isEmpty });
	}

	_renderContent(styles) {
		let { loading, isEmpty, loadingShowContent } = this.state;
		if (loading === false) {
			if (isEmpty === true) {
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

	_renderLoading(styles) {
		if (this.state.loading) {
			if (this.props.loadingStyle == 'over') {
				return (
					<TouchableOpacity
						onPress={() => {
							this.props.cancelable ? this.setState({ loading: false }) : null;
						}}
						style={[this.props.relative ? style.background_relative : styles.background]}>
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
