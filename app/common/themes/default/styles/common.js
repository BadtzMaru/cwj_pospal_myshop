import { Dimensions, Platform } from 'react-native';
import color from '../color';
let { width, height } = Dimensions.get('window');

let publicStyle = {
	ft_10: {
		fontSize: 10,
	},
	ft_12: {
		fontSize: 12,
	},
	ft_14: {
		fontSize: 14,
	},
	ft_16: {
		fontSize: 16,
	},
	ft_18: {
		fontSize: 18,
	},
	ft_20: {
		fontSize: 20,
	},
	ft_22: {
		fontSize: 22,
	},
	ft_24: {
		fontSize: 24,
	},
	ft_36: {
		fontSize: 36,
	},
	primaryColor: {
		color: color.primary,
	},
};
let commonStyle = {
	container: {
		flex: 1,
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color.background,
	},
	fillParent: {
		flex: 1,
		alignSelf: 'stretch',
	},
	main_text: {
		fontSize: 16,
		color: color.mainText,
	},
	regular_text: {
		fontSize: 16,
		color: color.regularText,
	},
	secondary_text: {
		fontSize: 12,
		color: color.secondaryText,
	},
	bold_text: {
		fontWeight: 'bold',
	},
	navigator_container: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 44,
		paddingLeft: 10,
		paddingRight: 10,
		marginTop: Platform.OS == 'ios' ? 20 : 0,
	},
	navigation_title: {
		fontWeight: 'bold',
		fontSize: 16,
		color: color.mainText,
	},
	navigation_image: {
		width: 24,
		height: 24,
		resizeMode: 'contain',
	},
	navigation_image_place: {
		width: 24,
		height: 24,
	},
	navigation_back_image: {
		width: 11,
		height: 11,
		resizeMode: 'contain',
		margin: 8,
	},
	navigation_back_image_place: {
		width: 11,
		height: 11,
		margin: 8,
	},
	vertical_line: {
		alignSelf: 'stretch',
		width: 1,
		backgroundColor: color.bgLine,
	},
	horizontal_line: {
		alignSelf: 'stretch',
		height: 1,
		backgroundColor: color.bgLine,
	},
	row: {
		alignSelf: 'stretch',
		height: 48,
		backgroundColor: color.background,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 10,
	},
	row_touch_container: {
		alignSelf: 'stretch',
	},
	row_title: {
		fontWeight: 'bold',
		fontSize: 14,
		flex: 1,
		color: color.mainText,
	},
	row_tip: {
		fontSize: 12,
		color: color.placeholderText,
		marginLeft: 8,
		marginRight: 8,
	},
	row_arrow: {
		width: 10,
		height: 10,
		resizeMode: 'contain',
	},
	// 列表布局
	list_container: {
		alignSelf: 'stretch',
		flex: 1,
		backgroundColor: color.bgLine,
	},
	list_header: {
		paddingLeft: 17,
	},
	list_title: {
		fontSize: 12,
		paddingTop: 8,
		paddingBottom: 8,
		color: color.secondaryText,
	},
	list_content: {
		backgroundColor: color.background,
		paddingLeft: 18,
	},
	list_touchItem: {
		alignSelf: 'stretch',
	},
	list_item: {
		flexDirection: 'row',
		height: 48,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: color.line,
	},
	list_lastItem: {
		borderBottomWidth: 0,
	},
	list_itemTitle: {
		fontSize: 14,
		color: color.secondaryText,
		width: 96,
	},
	list_itemDesc: {
		flex: 1,
		fontSize: 14,
		color: color.mainText,
	},
	list_itemDesc_secondary: {
		color: color.secondaryText,
	},
	// 搜索
	filter_container: {
		alignSelf: 'stretch',
		height: 40,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: color.bgLine,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: color.background,
	},
	filter_vline: {
		width: 1,
		height: 40,
		backgroundColor: color.line,
	},
	filter_icon: {
		width: 16,
		height: 16,
		marginLeft: 20,
		marginRight: 20,
	},
	greyBg: {
		backgroundColor: color.bgLine,
	},
	greyPlace: {
		backgroundColor: color.bgLine,
		height: 12,
		width: width,
	},
	// radio
	radioItem: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		alignItems: 'center',
	},
	radioItem_line: {
		borderTopColor: color.line,
		borderTopWidth: 1,
	},
	radioTextNormal: {
		paddingTop: 10,
		paddingBottom: 10,
		color: color.mainText,
		flex: 1,
		fontSize: 14,
	},
	radioTextSelect: {
		color: color.primary,
	},
	checkItem: {
		flex: 1,
		padding: 10,
		borderBottomWidth: 1,
		borderColor: color.bgLine,
	},
	// dialog
	dialogStyle: {
		position: 'absolute',
		bottom: 10,
		backgroundColor: '#fdfdfd',
	},
	dialog_title: {
		borderBottomWidth: 1,
		borderColor: color.line,
		backgroundColor: '#fdfdfd',
	},
	dialog_titleText: {
		fontSize: 16,
		color: color.mainText,
	},
	dialog_footer: {
		borderTopWidth: 1,
		borderColor: color.line,
	},
	dialog_button: {
		paddingTop: 16,
		paddingBottom: 16,
	},
	dialog_buttonText: {
		fontSize: 15,
		color: color.regularText,
	},
	dialog_buttonText_com: {
		fontSize: 15,
		color: color.primary,
	},
	// 展开收起框
	toggle_item: {
		width: '100%',
		flex: 1,
		paddingTop: 12,
		backgroundColor: color.background,
		borderBottomWidth: 1,
		borderColor: color.bgLine,
		marginBottom: 12,
	},
	toggle_hd: {
		flexDirection: 'row',
		paddingBottom: 10,
		paddingLeft: 18,
		paddingRight: 18,
	},
	toggle_hdLine: {
		borderBottomWidth: 1,
		borderColor: color.line,
	},
	toggle_hd_l: {
		flex: 1,
	},
	toggle_black: {
		fontSize: 16,
		color: color.mainText,
	},
	toggle_grey: {
		fontSize: 12,
		color: color.regularText,
	},
	toggle_light: {
		fontSize: 12,
		color: color.secondaryText,
	},
	toggle_primary: {
		fontSize: 12,
		color: color.primary,
	},
	toggle_img: {
		marginLeft: 12,
	},
	toggle_rotate: {
		transform: [{ rotate: '180deg' }],
	},
	toggle_hd_r: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	toggle_bd: {
		paddingLeft: 18,
		paddingRight: 18,
	},
	toggle_bd_grey: {
		backgroundColor: '#F5F5F5',
		borderRadius: 4,
	},
	toggle_bd_info: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		fontSize: 12,
		minHeight: 120,
		color: '#616161',
		marginBottom: 18,
	},
	double_container: {
		backgroundColor: color.bgLine,
		borderRadius: 4,
		paddingTop: 12,
		paddingHorizontal: 16,
		marginBottom: 18,
	},
	double_containerLight: {
		backgroundColor: color.background,
		borderTopWidth: 1,
		borderColor: color.line,
		paddingHorizontal: 18,
		marginBottom: 0,
	},
	double_item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 18,
	},
	double_black: {
		fontSize: 12,
		color: color.mainText,
	},
	toggle_greyBold: {
		fontSize: 12,
		color: color.regularText,
		fontWeight: 'bold',
	},
	toggle_primaryBold: {
		fontSize: 12,
		color: color.primary,
		fontWeight: 'bold',
	},
	tabContaniner: {
		width: '100%',
		backgroundColor: color.background,
		paddingHorizontal: 18,
		paddingTop: 12,
		paddingBottom: 16,
	},
	tabTitle: {
		color: color.mainText,
		fontSize: 14,
		marginBottom: 12,
		width: '100%',
	},
	tabContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	tabText: {
		borderWidth: 1,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 4,
		fontSize: 14,
		borderColor: color.borderColorGray,
		color: color.mainText,
	},
	tabText_active: {
		backgroundColor: color.primary,
		borderColor: color.primary,
		color: color.background,
	},
	// 数据空
	emptyTextContainer: {
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		minHeight: height - 260,
		padding: 50,
	},
	emptyText: {
		color: color.placeholderText,
		lineHeight: 30,
		textAlign: 'center',
	},
	size_color_text: {
		color: color.warning,
		fontSize: 11,
	},
};
export default Object.assign(publicStyle, commonStyle);
