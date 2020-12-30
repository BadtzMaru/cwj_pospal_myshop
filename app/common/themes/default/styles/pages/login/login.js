import { Dimensions } from 'react-native';
import color from '../../../color';
let { width, height } = Dimensions.get('window');
let statusBarHeight = 24;

export default {
	container: {
		alignSelf: 'stretch',
		flex: 1,
		paddingLeft: 40,
		paddingRight: 40,
		backgroundColor: color.background,
		width,
		height: height - statusBarHeight,
	},
	topContainer: {
		alignSelf: 'stretch',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		paddingTop: 20,
	},
	loginContainer: {
		alignSelf: 'stretch',
		justifyContent: 'center',
		marginLeft: 9,
		flex: 3,
	},
	tipTxt: {
		color: color.placeholderText,
		fontSize: 14,
	},
	input: {
		marginLeft: -2,
		marginRight: -2,
		fontSize: 20,
		height: 48,
	},
	eyeContainer: {
		position: 'absolute',
		right: 0,
		bottom: 15,
	},
	eyeImg: {
		width: 14,
		height: 14,
		resizeMode: 'contain',
	},
	loginBtn: {
		alignSelf: 'stretch',
		height: 48,
		borderRadius: 24,
		marginTop: 38,
	},
	loginBtnTxt: {
		alignSelf: 'stretch',
		color: '#fff',
		textAlign: 'center',
		fontSize: 16,
		height: 48,
		lineHeight: 48,
	},
	linkTxt: {
		color: color.primary,
		borderRadius: 14,
	},
	topPic: {
		width: 80,
		height: 80,
		resizeMode: 'contain',
	},
	quickLoginTxt: {
		textAlign: 'center',
		fontSize: 16,
		height: 26,
		lineHeight: 26,
		color: color.primary,
	},
	quickLogin: {
		width: 96,
		height: 28,
		alignItems: 'center',
		borderRadius: 14,
		borderColor: color.primary,
		borderWidth: 1,
	},
};
