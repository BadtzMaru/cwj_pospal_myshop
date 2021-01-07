import React, { Component } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	Text,
	ListView,
	TouchableWithoutFeedback,
	TouchableNativeFeedback,
	TouchableOpacity,
	TouchableHighlight,
	Modal,
	ActivityIndicator,
	TextInput,
	Image,
	FlatList,
} from 'react-native';
import commonUtil from '../common/commonUtil';

const TOUCHABLE_ELEMENTS = ['TouchableHighlight', 'TouchableOpacity', 'TouchableWithoutFeedback', 'TouchableNativeFeedback'];

export default class ModalDropdown extends Component {
	constructor(props) {
		super(props);
		this._button = null;
		this._buttonFrame = null;
		this._flatList = null;
		this.state = {
			buttonText: props.defaultValue,
			showDropdown: false,
			loading: !props.options,
			keyword: '',
			dataSource: this.props.options,
			selectedIndex: props.defaultId,
			accessible: !!props.accessible,
		};
	}
	static defaultProps = {
		isSearch: false,
		disabled: false,
		scrollEnabled: true,
		defaultIndex: -1,
		defaultId: 0,
		defaultValue: 'Please select...',
		options: null,
		animated: true,
		showsVerticalScrollIndicator: true,
		keyboardShouldPersistTaps: 'never',
	};

	_renderButton() {
		const { disabled, accessible, children, textStyle } = this.props;
		const { buttonText } = this.state;
		return (
			<TouchableOpacity ref={(button) => (this._button = button)} disabled={disabled} accessible={accessible} onPress={this._onButtonPress}>
				{children || (
					<View style={styles.button}>
						<Text style={[styles.buttonText, textStyle]} numberOfLines={1}>
							{buttonText}
						</Text>
					</View>
				)}
			</TouchableOpacity>
		);
	}
	_renderModal() {
		const { animated, accessible, dropdownStyle } = this.props;
		const { showDropdown, loading } = this.state;
		if (showDropdown && this._buttonFrame) {
			const frameStyle = this._calcPosition();
			const animationType = animated ? 'fade' : 'none';
			return (
				<Modal
					animationType={animationType}
					visible={true}
					transparent={true}
					onRequestClose={this._onRequestClose}
					supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
					<TouchableWithoutFeedback accessible={accessible} disabled={!showDropdown} onPress={this._onModalPress}>
						<View style={[styles.dropdown, dropdownStyle, frameStyle, loading ? { justifyContent: 'center' } : {}]}>
							{loading ? this._renderLoading() : this._renderDropdown()}
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			);
		}
	}
	_onModalPress = () => {
		const { onDropdownWillHide } = this.props;
		if (!onDropdownWillHide || onDropdownWillHide() !== false) {
			this.hide();
		}
	};
	_onButtonPress = () => {
		const { onDropdownWillShow } = this.props;
		if (!onDropdownWillShow || onDropdownWillShow() !== false) {
			this.show();
		}
	};
	show() {
		this._updatePosition(() => {
			let selectIdx = 0;
			this.props.options.map((item, index) => {
				if (item.id === this.props.defaultId) {
					return (selectIdx = index);
				}
			});
			this.setState({ showDropdown: true });
		});
	}
	_updatePosition(callback) {
		if (this._button && this._button.measure) {
			this._button.measure((fx, fy, width, height, px, py) => {
				this._buttonFrame = { x: px, y: py, w: width, h: height };
				callback && callback();
			});
		}
	}
	_calcPosition() {
		const { dropdownStyle, style, adjustFrame } = this.props;
		const dimensions = Dimensions.get('window');
		const windowWidth = dimensions.width;
		const windowHeight = dimensions.height;
		const dropdownHeight = (dropdownStyle && StyleSheet.flatten(dropdownStyle).height) || StyleSheet.flatten(styles.dropdown).height;
		const bottomSpace = windowHeight - this._buttonFrame.y - this._buttonFrame.h;
		const rightSpace = windowWidth - this._buttonFrame.x;
		const showInBottom = bottomSpace >= dropdownHeight || bottomSpace >= this._buttonFrame.y;
		const showInLeft = rightSpace >= this._buttonFrame.x;
		const positionStyle = {
			height: dropdownHeight,
			top: showInBottom ? this._buttonFrame.y + this._buttonFrame.h : Math.max(0, this._buttonFrame.y - dropdownHeight),
		};
		if (showInLeft) {
			positionStyle.left = this._buttonFrame.x;
		} else {
			const dropdownWidth = (dropdownStyle && StyleSheet.flatten(dropdownStyle).width) || (style && StyleSheet.flatten(style).width) || -1;
			if (dropdownWidth !== -1) {
				positionStyle.width = dropdownWidth;
			}
			positionStyle.right = rightSpace - this._buttonFrame.w;
		}
		return adjustFrame ? adjustFrame(positionStyle) : positionStyle;
	}
	_onRequestClose = () => {
		const { onDropdownWillHide } = this.props;
		if (!onDropdownWillHide || onDropdownWillHide() !== false) {
			this.hide();
		}
	};
	// 隐藏模态框
	hide() {
		this.setState({ showDropdown: false, keyword: '' });
	}
	_renderLoading() {
		return <ActivityIndicator size='small' />;
	}
	_renderDropdown() {
		const { scrollEnabled, renderSeparator, showsVerticalScrollIndicator, keyboardShouldPersistTaps, isSearch, options } = this.props;
		return (
			<View
				style={{
					backgroundColor: '#fff',
				}}>
				{this.props.options.length > 15 && (
					<View style={styles.search_wrapper}>
						<Image source={require('../common/themes/default/images/search-icon.png')} />
						<TextInput
							style={styles.text_input}
							underlineColorAndroid='transparent'
							placeholder='请输入关键字'
							value={this.state.keyword}
							onChangeText={(text) => {
								this.setState({ keyword: text });
								this._dataSource(text);
							}}
						/>
					</View>
				)}
				<FlatList
					ref={(flatList) => (this._flatList = flatList)}
					data={this.state.dataSource}
					extraData={this.state}
					renderItem={this._renderItem}
					keyExtractor={(item, index) => item.key}
					automaticallyAdjustContentInsets={false}
					showsVerticalScrollIndicator={showsVerticalScrollIndicator}
					keyboardShouldPersistTaps={keyboardShouldPersistTaps}
					getItemLayout={(data, index) => {
						return { length: 50, offset: 50 * index, index };
					}}
				/>
			</View>
		);
	}
	_renderItem = ({ item, index, separators }) => {
		let theme = commonUtil.getTheme();
		let styles = theme.style.component.Dropdown;
		let image = theme.image;
		const { dropdownTextStyle, dropdownTextHighlightStyle, accessible } = this.props;
		const { selectedIndex } = this.state;
		const key = `row_${item.value.userId}`;
		const highlighted = item.value.userId == selectedIndex;
		const row = (
			<View onLayout={this._onLayout} style={[styles.dropdown_row_container, { height: 50 }]}>
				<Text style={[styles.dropdown_text, highlighted && styles.dropdown_text_highlight]}>{item.key}</Text>
				{highlighted && <Image style={styles.dropdown_icon} source={image.sort_select_icon} />}
			</View>
		);
		const preservedProps = {
			key,
			accessible,
			onPress: () => this._onRowPress(item),
		};
		return <TouchableHighlight {...preservedProps}>{row}</TouchableHighlight>;
	};
	_onRowPress(item) {
		const { onSelect, renderButtonText, onDropdownWillHide } = this.props;
		if (!onSelect || onSelect(item.value.userId, item) !== false) {
			const value = (renderButtonText && renderButtonText(item.value.userId)) || item.value.userId.toString();
			this._nextValue = value;
			this._nextIndex = item.value.userId;
			this.setState({ buttonText: value, selectedIndex: item.value.userId, keyword: '' });
			this._dataSource('');
		}
		if (!onDropdownWillHide || onDropdownWillHide() !== false) {
			this.setState({
				showDropdown: false,
			});
		}
	}
	_onLayout = (e) => {
		let { x, y, width, height } = e.nativeEvent.layout;
	};
	// 过滤options数组列表
	_dataSource(keyword) {
		const { options } = this.props;
		let cacheList = [];
		options.map((item) => {
			if (item.key.indexOf(keyword) > -1) {
				cacheList.push(item);
			}
		});
		this.setState({
			dataSource: cacheList,
		});
	}
	render() {
		return (
			<View {...this.props}>
				{this._renderButton()}
				{this._renderModal()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
	},
	buttonText: {
		fontSize: 12,
	},
	modal: {
		flexGrow: 1,
	},
	dropdown: {
		position: 'absolute',
		height: (33 + StyleSheet.hairlineWidth) * 5,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: 'lightgray',
		borderRadius: 2,
		backgroundColor: 'white',
	},
	loading: {
		alignSelf: 'center',
	},
	list: {
		//flexGrow: 1,
	},
	rowText: {
		paddingHorizontal: 6,
		paddingVertical: 10,
		fontSize: 11,
		color: 'gray',
		backgroundColor: 'white',
		textAlignVertical: 'center',
	},
	highlightedRowText: {
		color: 'black',
	},
	separator: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: 'lightgray',
	},
	search_wrapper: {
		flexDirection: 'row',
		backgroundColor: '#f6f6f6',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 15,
		borderRadius: 20,
		marginVertical: 10,
		marginHorizontal: 10,
	},
	text_input: {
		flex: 1,
		backgroundColor: '#f6f6f6',
		color: '#212121',
		height: 40,
		padding: 10,
		fontSize: 16,
	},
});
