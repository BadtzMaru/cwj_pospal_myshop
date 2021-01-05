import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, Modal, TouchableWithoutFeedback } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class DateRangeSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: this.props.visible,
			toggleAnim: this.props.visible ? new Animated.Value(0) : new Animated.Value(1),
		};
	}
	static defaultProps = {
		visible: false,
	};
	open() {
		this.setState({ visible: true });
		setTimeout(() => {
			Animated.timing(this.state.toggleAnim, {
				toValue: 0,
				duration: 360,
			}).start();
		}, 50);
	}
	close() {
		Animated.timing(this.state.toggleAnim, { toValue: 1, duration: 360 }).start();
		setTimeout(() => {
			this.setState({ visible: false });
			if (this.props.onClose) {
				this.props.onClose();
			}
		}, 400);
	}
	render() {
		let { visible, toggleAnim } = this.state;
		return (
			<Modal animationType={'none'} transparent={true} visible={visible} onRequestClose={() => {}}>
				<View
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						backgroundColor: '#000000',
						opacity: 0.75,
					}}></View>
				<TouchableWithoutFeedback onPress={this.close.bind(this)}>
					<Animated.View
						style={[
							{
								width: width,
								height: height,
								alignItems: 'center',
								justifyContent: 'center',
								marginTop: toggleAnim.interpolate({
									inputRange: [0, 1],
									outputRange: [0, height],
								}),
							},
						]}>
						<TouchableWithoutFeedback>{this.props.children}</TouchableWithoutFeedback>
					</Animated.View>
				</TouchableWithoutFeedback>
			</Modal>
		);
	}
}
