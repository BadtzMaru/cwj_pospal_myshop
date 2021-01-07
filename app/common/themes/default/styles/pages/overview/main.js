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
		width: width,
		height: height - statusBarHeight,
	},
	spaceView: {
		backgroundColor: color.bgLine,
		height: 10,
	},
	shopContainer: {
		width: width,
		flex: 1,
		height: height - statusBarHeight,
		backgroundColor: color.bgLine,
		paddingBottom: 100,
	},
	downLine: {
		height: 12,
		width: width,
		backgroundColor: color.bgLine,
	},
	flexRow: {
		flexDirection: 'row',
	},

	topNavContian: {
		paddingLeft: 15,
		paddingRight: 15,
		height: 70,
		marginBottom: 12,
		width: width,
	},
	topNav: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headView: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 50,
	},
	headImg: {
		marginRight: 8,
	},
	headText: {
		fontSize: 14,
		color: color.regularText,
	},
	cells: {
		width: width,
		backgroundColor: color.background,
		marginBottom: 12,
	},
	cell_title: {
		fontSize: 18,
		color: color.mainText,
		paddingLeft: 15,
		paddingRight: 15,
		marginBottom: 20,
		marginTop: 20,
		fontWeight: 'bold',
	},
	bgcell: {
		paddingLeft: 15,
		paddingRight: 15,
		height: 104,
	},
	memberBgcell: {
		paddingLeft: 15,
		paddingRight: 15,
		height: 136,
	},
	bg: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	flexRowHead: {
		justifyContent: 'space-between',
		// alignItems: 'center',
		// paddingLeft: 15,
		paddingRight: 15,
		marginTop: 8,
		paddingTop: 10,
	},
	flexItemsCenter: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	menberHead: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	menber_title: {
		fontSize: 18,
		color: color.mainText,
		paddingLeft: 15,
		paddingRight: 15,
		fontWeight: 'bold',
	},
	cell_standLine: {
		height: 64,
		width: 1,
		backgroundColor: color.background,
		opacity: 0.25,
	},
	textWhite: {
		color: color.whiteText,
	},
	cell_one: {
		flex: 0.5,
		alignItems: 'center',
	},
	member_cell_one: {
		flex: 0.5,
		alignItems: 'center',
		justifyContent: 'space-around',
		alignSelf: 'stretch',
		padding: 6,
	},
	cell_sellTotal: {
		fontSize: 24,
		marginTop: -5,
		marginBottom: 0,
	},
	cell_sellTxt: {
		fontSize: 12,
		opacity: 0.8,
	},

	pieChart: {
		paddingBottom: 20,
	},
	pieChart_title: {
		fontSize: 16,
		paddingLeft: 15,
		paddingRight: 15,
		color: color.mainText,
		marginTop: 20,
		marginBottom: 10,
	},
	across: {
		borderTopColor: color.line,
		borderTopWidth: 1,
		paddingLeft: 15,
		paddingRight: 15,
	},
	arrow_r: {
		marginTop: 3,
		resizeMode: 'contain',
	},
	back_wrap: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 42,
		height: 66,
	},
	across_head: {
		paddingTop: 20,
		paddingBottom: 20,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	across_head_hd: {
		fontSize: 16,
		color: color.mainText,
	},
	across_head_text: {
		color: color.primary,
		fontSize: 12,
		marginRight: 2,
	},
	across_body: {
		marginTop: 20,
	},
	across_item_up: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 11,
	},
	across_item_hd: {
		flex: 1,
		fontSize: 12,
		color: color.regularText,
	},
	across_item_bd: {
		fontSize: 12,
		color: color.regularText,
		marginRight: 12,
	},
	across_item_ft: {
		fontSize: 12,
		color: color.secondaryText,
	},
	across_item_down: {
		borderRadius: 5,
		height: 10,
		marginBottom: 20,
	},
	across_item_bg: {
		borderRadius: 5,
		flex: 1,
		height: 10,
		backgroundColor: color.bgLine,
	},
	across_item_bgli: {
		borderRadius: 5,
		height: 10,
	},
	//  异常单据。
	btnsContian: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 18,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
	},
	btns_item: {
		width: (width - 30) / 3,
		height: (width - 30) / 3,
		paddingBottom: 6,
		paddingLeft: 6,
		paddingRight: 6,
		paddingTop: 6,
	},
	btns_item_bg: {
		borderRadius: 8,
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},

	btns_item_img: {
		marginBottom: 8,
	},
	btns_item_txt: {
		fontSize: 12,
		color: color.whiteText,
		marginBottom: 8,
	},
	btns_item_num: {
		fontSize: 20,
		color: color.whiteText,
	},

	btns_item_4: {
		width: (width - 30) / 4,
		height: (width - 30) / 4 + 10,
		paddingBottom: 6,
		paddingLeft: 6,
		paddingRight: 6,
		paddingTop: 6,
	},
	btns_item_4_bg: {
		borderRadius: 8,
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	btns_item_4_img: {
		marginTop: 5,
	},
	btns_item_4_txt: {
		fontSize: 12,
		color: color.whiteText,
		marginTop: 2,
	},
	btns_item_4_num: {
		fontSize: 18,
		color: color.whiteText,
	},

	hotProducts: {
		paddingLeft: 18,
		paddingRight: 18,
	},
	hotProduct: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	hotProduct_head: {
		width: 28,
		height: 28,
		borderRadius: 14,
		marginRight: 17,
		marginTop: 14,
		marginBottom: 14,
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: '#A9ACBC',
	},
	headNumColor0: {
		backgroundColor: '#FF9B39',
	},
	headNumColor1: {
		backgroundColor: '#24CB5E',
	},
	headNumColor2: {
		backgroundColor: '#8B7BFF',
	},
	hotProduct_mun: {
		fontSize: 14,
		color: color.whiteText,
	},
	hotProduct_body: {
		flex: 1,
	},
	hotProduct_name: {
		fontSize: 14,
		color: color.mainText,
	},
	hotProduct_txt: {
		fontSize: 12,
		color: color.secondaryText,
	},
	hotProduct_price: {
		fontSize: 18,
		color: color.primary,
	},
	hotTtitle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	//tips..
	MenberTips: {
		// position:'relative',
	},
	MenberTips: {
		position: 'relative',
		height: 30,
		left: 12,
		top: -10,
	},
	MenberTips_arrow: {
		position: 'absolute',
		// backgroundColor: "#000000",
		width: 0,
		height: 0,
		borderTopWidth: 10,
		borderTopColor: 'transparent',
		borderRightWidth: 10,
		borderRightColor: '#000000',
		borderLeftWidth: 7,
		borderLeftColor: 'transparent',
		borderBottomWidth: 10,
		borderBottomColor: 'transparent',
		// borderRadius: 4,
		top: 13,
		left: -15,
		zIndex: 22,
	},
	MenberTips_txt: {
		fontSize: 12,
		color: color.whiteText,
		backgroundColor: '#000000',
		borderRadius: 4,
		width: 192,
		height: 54,
		padding: 12,
		zIndex: 22,
	},
	bottomSpaceView: {
		alignSelf: 'stretch',
		height: 60,
	},
	table: {
		alignSelf: 'stretch',
		flex: 1,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: color.line,
		borderBottomWidth: 1,
		paddingVertical: 15,
	},
	row_head: {
		paddingVertical: 12,
		paddingHorizontal: 18,
	},
	table_content: {
		paddingHorizontal: 18,
	},
	column_name: {
		flex: 1,
		color: color.regularText,
	},
	column_num: {
		flex: 1,
		color: color.regularText,
		textAlign: 'right',
	},
	column_head: {
		flex: 1,
		fontSize: 14,
		color: color.mainText,
	},
	column_center: {
		textAlign: 'center',
	},
	column_end: {
		textAlign: 'right',
	},
	group_region_container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginLeft: 0,
		marginRight: 0,
		marginTop: 10,
	},

	//美业概况
	beauty_bgcell: {
		paddingLeft: 15,
		paddingRight: 15,
		height: 160,
	},
	beauty_bg: {
		flex: 1,
		justifyContent: 'space-around',
		padding: 15,
	},
	beauty_tips: {
		position: 'relative',
		height: 30,
		left: 12,
		top: -10,
	},
	beauty_tips_arrow: {
		position: 'absolute',
		// backgroundColor: "#000000",
		width: 0,
		height: 0,
		borderTopWidth: 10,
		borderTopColor: 'transparent',
		borderRightWidth: 10,
		borderRightColor: '#000000',
		borderLeftWidth: 7,
		borderLeftColor: 'transparent',
		borderBottomWidth: 10,
		borderBottomColor: 'transparent',
		// borderRadius: 4,
		top: 13,
		left: -15,
		zIndex: 22,
	},
	beauty_tipss_txt: {
		fontSize: 12,
		color: color.whiteText,
		backgroundColor: '#000000',
		borderRadius: 4,
		width: 192,
		height: 54,
		padding: 12,
		zIndex: 22,
	},
	beauty_bg_total_amount_logo: {
		position: 'absolute',
		top: 32,
		right: 16,
		width: 48,
		height: 33,
	},
	beauty_bg_total_num_logo: {
		position: 'absolute',
		top: 24,
		right: 17,
		width: 43,
		height: 46,
	},
	beauty_total_title: {
		fontSize: 28,
		color: color.whiteText,
	},
	beauty_total_title_tip: {
		fontSize: 12,
		color: color.whiteText,
	},
	beauty_bg_splite_line: {
		height: 1,
		backgroundColor: '#ffffff32',
	},
	beauty_total_item_title: {
		fontSize: 16,
		color: color.whiteText,
	},
	beauty_total_item_tip: {
		fontSize: 12,
		color: color.whiteText,
		opacity: 0.8,
	},
	beauty_border_line_container1: {
		margin: 15,
		padding: 15,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#F5F5F5',
		height: 91,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	beauty_title1: {
		fontSize: 22,
		color: color.primary,
	},
	beauty_title2: {
		fontSize: 14,
		color: color.mainText,
	},
	beauty_tip1: {
		fontSize: 12,
		color: color.regularText,
	},
	beauty_moer_title_container: {
		margin: 15,
		marginBottom: 5,
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	beauty_moer_title: {
		fontSize: 16,
		color: color.mainText,
		flex: 1,
	},
	beauty_moer_tip: {
		fontSize: 12,
		color: color.primary,
	},
	beauty_moer_row_container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	beauty_border_line_container2: {
		flex: 1,
		padding: 15,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: color.bgLine,
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	beauty_tip3: {
		fontSize: 12,
		color: color.secondaryText,
	},
	beauty_title3: {
		fontSize: 14,
		color: color.mainText,
	},
	beauty_logo3: {},

	beauty_royalty_title_container: {
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingRight: 15,
	},
	beauty_royalty_bgcell: {
		paddingLeft: 15,
		paddingRight: 15,
		height: 92,
	},
	beauty_royalty_background: {
		flex: 1,
		justifyContent: 'space-around',
		padding: 15,
	},
	beauty_royalty_item_title: {
		fontSize: 22,
		color: color.whiteText,
	},
	beauty_royalty_item_tip: {
		fontSize: 12,
		color: color.whiteText,
		opacity: 0.8,
	},
	beauty_royalty_commission_container: {
		marginBottom: 10,
		marginLeft: 18,
		marginRight: 18,
	},
	beauty_royalty_commission_title: {
		fontSize: 18,
		color: color.mainText,
		marginTop: 20,
		marginBottom: 15,
	},
	beauty_royalty_commission_row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	beauty_royalty_commission_row_title: {
		fontSize: 12,
		color: color.secondaryText,
	},
	beauty_royalty_commission_item_title: {
		fontSize: 14,
		color: color.mainText,
	},
	beauty_royalty_commission_item_value: {
		fontSize: 14,
		color: color.primary,
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
};
