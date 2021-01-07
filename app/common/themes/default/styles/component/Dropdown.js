import color from '../../color';

export default {
	button_text_row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 15,
		paddingRight: 15,
	},
	button_text_default: {
		fontSize: 14,
		color: color.regularText,
	},
	button_text_selected: {
		fontSize: 14,
		color: color.primary,
	},
	button_arrow_icon: {
		width: 9,
		height: 9,
		marginLeft: 6,
	},
	toggle_rotate: {
		transform: [{ rotate: '180deg' }],
	},
	dropdown_style: {
		backgroundColor: '#00000066',
		paddingBottom: 25,
	},
	dropdown_row_container: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		backgroundColor: color.background,
		alignItems: 'center',
	},
	dropdown_text: {
		fontSize: 14,
		color: color.mainText,
		margin: 15,
		flex: 1,
	},
	dropdown_text_highlight: {
		color: color.primary,
	},
	dropdown_icon: {
		marginRight: 15,
		width: 12,
		height: 9,
	},
	dropdown_inputContainer: {
		position: 'relative',
		flexDirection: 'row',
		flex: 1,
	},
	dropdown_input: {
		height: 32,
		width: 96,
		backgroundColor: '#f5f5f5',
		borderRadius: 16,
		marginRight: 8,
		marginLeft: 15,
		color: '#212121',
		textAlign: 'center',
		marginBottom: 15,
		alignContent: 'center',
		paddingVertical: 0,
	},
	dropdown_inputTxt: {
		height: 32,
		lineHeight: 32,
		color: '#616161',
	},
	dropdown_inputImg: {
		position: 'absolute',
		right: 15,
		top: 11,
	},
	tree_icon: {
		marginLeft: 10,
		marginRight: -10,
		width: 8,
		height: 5,
	},
	dropdown_text_bold: {
		fontWeight: 'bold',
		color: color.mainText,
	},
};
