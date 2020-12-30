import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import commonUtil from '../common/commonUtil';

export default class Toast extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: false,
			opacityValue: new Animated.Value(this.props.opacity),
			text: '',
		};
	}
	static defaultProps = {
		opacity: 1,
	};
	render() {
		let theme = commonUtil.getTheme();
		let styles = theme.style.component.Toast;
		let view = this.state.isShow ? (
			<View style={[styles.container]} pointerEvents='none'>
				<Animated.View style={[styles.content, { opacity: this.state.opacityValue }]}>
					<Text style={styles.text}>{this.state.text}</Text>
				</Animated.View>
			</View>
		) : null;
		return view;
	}
}
