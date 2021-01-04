import { Dimensions } from 'react-native';
import color from '../../color';
let { width, height } = Dimensions.get('window');

export default {
	container: {
		width,
		height,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color.background,
	},
	header: {
		alignSelf: 'stretch',
	},
	loadingView: {
		alignSelf: 'stretch',
		flex: 1,
	},
};
