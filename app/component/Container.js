import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import commonUtil from '../common/commonUtil';
import Header from './Header';

export default class Container extends Component {
	static defaultProps = {
		headerProps: {},
		loadingProps: {},
	};

	render() {
		let theme = commonUtil.getTheme();
		let styles = theme.style.component.Container;
		return (
			<View style={styles.container}>
				{Platform.OS === 'ios' && <View style={{ alignSelf: 'stretch', height: 20 }} />}
				<Header />
			</View>
		);
	}
}
