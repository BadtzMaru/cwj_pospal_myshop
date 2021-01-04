import color from '../../color';

export default {
	container: {
		alignSelf: 'stretch',
		paddingVertical: 15,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: color.background,
	},
	row: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	rowPad: {
		paddingHorizontal: 15,
	},
	date_icon: {
		width: 18,
		height: 18,
		resizeMode: 'contain',
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		color: color.mainText,
	},
	arrow_icon: {
		width: 11,
		height: 11,
		resizeMode: 'contain',
		marginLeft: 8,
	},
	back_wrap: {
		height: 48,
		width: 32,
		alignItems: 'center',
		justifyContent: 'center',
	},
	back_arrow_icon: {
		width: 11,
		height: 11,
		resizeMode: 'contain',
	},
	title_container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	simple_date_container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	simple_date_text_container: {
		marginLeft: 5,
	},
	simple_date_text_title: {
		fontSize: 10,
		fontWeight: 'bold',
		color: color.mainText,
	},
	simple_date_text_date: {
		fontSize: 7,
		color: color.regularText,
	},
	full_date_container: {
		marginTop: 19,
		paddingHorizontal: 15,
		// paddingBottom: 15
	},
	full_date_text_container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	full_date_text_title: {
		fontSize: 14,
		color: color.regularText,
		marginLeft: 8,
	},
	full_date_text_date: {
		fontSize: 14,
		color: color.secondaryText,
	},

	bold_text: {
		fontWeight: 'bold',
	},
	navigator_container: {
		alignSelf: 'stretch',
		height: 48,
		backgroundColor: color.background,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 10,
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
		width: 16,
		height: 16,
		resizeMode: 'contain',
	},
	navigation_back_image_place: {
		width: 11,
		height: 11,
		margin: 8,
	},
	back_container: {
		padding: 0,
		paddingVertical: 0,
		paddingRight: 15,
	},
	// ad
	ad_container: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 10,
		width: '100%',
		padding: 15,
		backgroundColor: '#def2ff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	ad_title: {
		fontSize: 14,
		flex: 1,
		color: '#212121',
	},
	ad_icon: {
		marginRight: 8,
	},
	ad_right: {
		flexDirection: 'row',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	ad_right_txt: {
		fontSize: 14,
		color: '#0E95FF',
		marginLeft: 4,
	},
	ad_right_icon: {
		marginLeft: 4,
		marginTop: -2,
	},
};
