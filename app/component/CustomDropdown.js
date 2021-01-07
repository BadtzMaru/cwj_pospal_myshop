import React, { Component } from 'react';
import { View, Text, Image, Dimensions, Platform, TextInput } from 'react-native';
import commonUtil from '../common/commonUtil';
import CustomModalDropdown from './CustomModalDropdown';

const { width, height } = Dimensions.get('window');

class Dropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			idx: this.props.defaultIndex,
			isShow: true,
		};
	}
	static defaultProps = {
		disabled: false,
		defaultIndex: -1,
		defaultId: -1,
		defaultValue: '',
		options: [],
		buttonTextStyle: {},
		buttonArrowStyle: {},
		isSearch: false,
	};
	adjustFrame(style) {
		style.left = 0;
		style.right = 0;
		style.top += 10;
		let searchHeight = 0;
		style.height = this.props.options.length > 15 ? height - style.top - searchHeight : height - style.top;
		style.paddingBottom = Platform == 'ios' ? 60 : 80;
		return style;
	}
	onSelect(idx, rowData) {
		this.setState({ idx });
		if (this.props.onSelect) {
			this.props.onSelect(parseInt(idx), rowData);
		}
	}
	render() {
		let theme = commonUtil.getTheme();
		let styles = theme.style.component.Dropdown;
		let image = theme.image;
		let btnText = this.props.defaultValue;
		return (
			<CustomModalDropdown
				options={this.props.options}
				defaultIndex={this.props.defaultIndex}
				defaultId={this.props.defaultId}
				dropdownStyle={styles.dropdown_style}
				adjustFrame={this.adjustFrame.bind(this)}
				onSelect={this.onSelect.bind(this)}
				onDropdownWillShow={() => {
					this.setState({
						isShow: true,
					});
				}}
				onDropdownWillHide={() => {
					this.setState({
						isShow: false,
					});
				}}>
				<View style={styles.button_text_row}>
					<Text style={[styles.button_text_default, this.props.buttonTextStyle]}>{btnText}</Text>
					<Image style={[styles.button_arrow_icon, this.props.buttonArrowStyle, this.state.isShow ? styles.toggle_rotate : '']} source={image.menu_arrow_icon} />
				</View>
			</CustomModalDropdown>
		);
	}
}

export default Dropdown;
