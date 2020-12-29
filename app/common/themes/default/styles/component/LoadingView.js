import color from '../../color';

export default {
	container: {
		alignSelf: 'stretch',
		flex: 1,
	},
	emptyTextContainer: {
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		minHeight: 120,
		marginBottom: 60,
	},
	emptyText: {
		color: color.placeholderText,
	},
	loadingColor: '#FFFFFF',
	background_relative: {
		alignSelf: 'stretch',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
		minHeight: 120,
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	activityIndicatorContainer: {
		width: 106,
		height: 36,
		borderRadius: 4,
		backgroundColor: '#000000CC',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	loadingText: {
		color: '#FFFFFF',
		fontSize: 12,
		marginLeft: 10,
	},
	insideLoadingColor: color.primary,
};
