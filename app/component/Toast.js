import React, { Component } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import commonUtil from '../common/commonUtil';

export const DURATION = {
	LENGTH_LONG: 2400,
	LENGTH_SHORT: 500,
	FOREVER: 0,
};

const { height, width } = Dimensions.get('window');

export default class Toast extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: false,
			text: '',
			opacityValue: new Animated.Value(this.props.opacity),
		};
	}
	static defaultProps = {
		position: 'center',
		positionValue: 120,
		fadeInDuration: 600,
		fadeOutDuration: 600,
		opacity: 1,
	};
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}
	show(text, duration) {
		this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_LONG;
		this.setState({ isShow: true, text });
		Animated.timing(this.state.opacityValue, {
			toValue: this.props.opacity,
			duration: this.props.fadeInDuration,
		}).start(() => {
			this.isShow = true;
			if (duration !== DURATION.FOREVER) this.close();
		});
	}
	close(duration) {
		let delay = typeof duration === 'undefined' ? this.duration : duration;
		if (delay === DURATION.FOREVER) delay = this.props.defaultCloseDelay || 250;

		if (!this.isShow && !this.state.isShow) return;
		this.timer && clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			Animated.timing(this.state.opacityValue, {
				toValue: 0.0,
				duration: this.props.fadeOutDuration,
			}).start(() => {
				this.setState({
					isShow: false,
				});
				this.isShow = false;
			});
		}, delay);
	}

	render() {
		let theme = commonUtil.getTheme();
		let styles = theme.style.component.Toast;

		let positionStyle = {};
		switch (this.props.position) {
			case 'top':
				positionStyle = { justifyContent: 'flex-start', paddingTop: 30 };
				break;
			case 'bottom':
				positionStyle = { justifyContent: 'flex-start', paddingBottom: 30 };
				break;
		}

		let view = this.state.isShow ? (
			<View style={[styles.container, positionStyle]} pointerEvents='none'>
				<Animated.View style={[styles.content, { opacity: this.state.opacityValue }]}>
					<Text style={styles.text}>{this.state.text}</Text>
				</Animated.View>
			</View>
		) : null;
		return view;
	}
}
