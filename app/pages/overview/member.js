import {
	React,
	View,
	Text,
	Component,
	TouchableOpacity,
	commonUtil,
	storageUtil,
	httpUtil,
	config,
	LoadingView,
	PullRefreshScrollView,
	InteractionManager,
	ImageBackground,
	Image,
	ScrollableTabView,
	LinearGradient,
	Alert,
	Toast,
	RCTDeviceEventEmitter,
} from '../../common/importUtil';
import { Dimensions } from 'react-native';
import { PieChart } from '../../component/victoryChart';

class Member extends Component {
	// 消费占比：消费单据量/总单据数量
	// 活跃率：统计时间范围内有消费的会员总数/总会员数
	constructor(props) {
		super(props);
		this.state = {
			isShowMenberTip: false, // 门店会员提示
			loading: false,
			newCustomerNum: null, //新增会员数量
			newCustomerNumSellPer: null, //新增会员消费占比
			allCustomerNum: null, //全部会员数量
			allCustomerSellPre: null, //全部会员消费占比
			activeCustomerPre: null, //会员活跃率
			allCustomerTicketNum: null, //会员总消费单据数量
			pieDatas: null, // 饼状图数据
			storeCustomerNumList: null, //各门店会员数排名
			storeCustomerActivityRates: null, //各门店会员活跃率排名
			init: true,
			lastLoadDataTime: null,
		};
	}
	componentDidMount() {
		super.componentDidMount();
		InteractionManager.runAfterInteractions(() => {
			this.loadData(true, 1);
		});
	}
	// 加载数据
	loadData(showLoading, pageIndex) {
		let storeCustomerNumList = [];
		let storeCustomerActivityRates = [];
		this.setState({ loading: true });
		storageUtil.getDateRangeAndUserIdsParam().then((params) => {
			Promise.all([httpUtil.post(config.API.API_LoadCustomerConsumptionData, params), params.isChain && httpUtil.post(config.API.API_LoadCustomerRanking, params)])
				.then((values) => {
					console.log('XHR_门店会员:', values);
					let response0 = values[0];
					let allCustomerNum = 0;
					let newCustomerNum = 0;
					let allCustomerTicketNum = 0;
					let newCustomerNumSellPer = 0;
					let allCustomerSellPre = 0;
					let activeCustomerPre = 0;
					if (response0.successed && response0.result.summary) {
						let summary = response0.result.summary;
						allCustomerNum = summary.allCustomerNum;
						newCustomerNum = summary.newCustomerNum;
						allCustomerTicketNum = summary.allCustomerTicketNum;
						let activeCustomerNum = summary.activeCustomerNum;
						let newCustomerTicketNum = summary.newCustomerTicketNum;
						let allTicketNum = summary.allTicketNum;
						if (allTicketNum && allTicketNum > 0) {
							newCustomerNumSellPer = newCustomerTicketNum / allTicketNum; // 新增会员消费占比
							allCustomerSellPre = allCustomerTicketNum / allTicketNum; // 总会员消费占比
						}
						if (allCustomerNum && allCustomerNum > 0) {
							activeCustomerPre = activeCustomerNum / allCustomerNum; // 会员活跃率
						}
					}
					let pieDatas = [];
					if (response0.successed && response0.result.consumptions) {
						let over20 = response0.result.consumptions.over20;
						let over15 = response0.result.consumptions.over15;
						let over10 = response0.result.consumptions.over10;
						let over5 = response0.result.consumptions.over5;
						let over1 = response0.result.consumptions.over1;
						let over20rate = response0.result.consumptions.over20rate;
						let over15rate = response0.result.consumptions.over15rate;
						let over10rate = response0.result.consumptions.over10rate;
						let over5rate = response0.result.consumptions.over5rate;
						let over1rate = response0.result.consumptions.over1rate;
						pieDatas = [
							{
								num: over20,
								name: this.translate('消费>=20次'),
								per: commonUtil.formatPercent(over20rate),
								numtxt: `${over20 + this.translate('人')}`,
							},
							{
								num: over15,
								name: this.translate('消费15-19次'),
								per: commonUtil.formatPercent(over15rate),
								numtxt: `${over15 + this.translate('人')}`,
							},
							{
								num: over10,
								name: this.translate('消费10-14次'),
								per: commonUtil.formatPercent(over10rate),
								numtxt: `${over10 + this.translate('人')}`,
							},
							{
								num: over5,
								name: this.translate('消费5-9次'),
								per: commonUtil.formatPercent(over5rate),
								numtxt: `${over5 + this.translate('人')}`,
							},
							{
								num: over1,
								name: this.translate('消费1-4次'),
								per: commonUtil.formatPercent(over1rate),
								numtxt: `${over1 + this.translate('人')}`,
							},
						];
					}
					if (values && values.length > 1) {
						let response1 = values[1];
						if (response1.successed) {
							if (response1.result && response1.result.storeCustomerNums) {
								response1.result.storeCustomerNums.map((item) => {
									storeCustomerNumList.push({
										name: item.userName,
										topNum: item.customerNum,
										percentageNum: item.customerNumPercent,
									});
								});
							}
							if (response1.result && response1.result.storeCustomerActivityRates) {
								response1.result.storeCustomerActivityRates.map((item) => {
									storeCustomerActivityRates.push({
										name: item.userName,
										topNum: item.activityCustomerNum,
										percentageNum: item.activityRate,
									});
								});
							}
						}
					}
					console.log(newCustomerNum);
					this.setState({
						loading: false,
						newCustomerNum,
						newCustomerNumSellPer,
						allCustomerNum,
						allCustomerSellPre,
						activeCustomerPre,
						allCustomerTicketNum,
						pieDatas,
						storeCustomerNumList,
						storeCustomerActivityRates,
						init: true,
						lastLoadDataTime: new Date(),
					});
				})
				.catch((error) => {
					this.setState({ loading: false });
					if (this.props.toast) {
						this.props.toast(error.message);
					} else {
						this.refs.toast && this.refs.toast.show(error.message);
					}
				});
		});
	}
	// 渲染条状图
	renderList(datas, hideTopNum) {
		console.log(datas);
		if (datas && datas.length == 0) {
			return null;
		} else {
			let theme = this.theme();
			let styles = theme.style.pages.overview.main;
			let { width } = Dimensions.get('window');
			let topNumMax = datas[0].topNum;
			let views = [];
			datas.map((p, i) => {
				var _width = (p.topNum / topNumMax) * (width - 36);
				_width = _width > 0 ? _width : 0;
				views.push(
					<View style={[styles.across_body_item]} key={i}>
						<View style={[styles.across_item_up]}>
							<Text style={[styles.across_item_hd]}>{p.name}</Text>
							<Text style={[styles.across_item_bd]}>{hideTopNum ? '' : p.topNum}</Text>
							<Text style={[styles.across_item_ft]}>{commonUtil.formatPercent(p.percentageNum)}</Text>
						</View>
						<View style={[styles.across_item_down]}>
							<View style={[styles.across_item_bg]}>
								<LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#55D0FF', '#00B3FF']} style={[styles.across_item_bgli, { width: _width }]} />
							</View>
						</View>
					</View>
				);
			});
			return views;
		}
	}
	render() {
		let theme = this.theme();
		let styles = theme.style.pages.overview.main;
		let color = theme.color;
		let image = theme.image;
		console.log(this.state.pieDatas);
		return (
			<View style={styles.cells}>
				{/* 标题 -S */}
				<View style={[styles.flexRow, styles.flexRowHead]}>
					<View style={[styles.menberHead]}>
						<Text style={[styles.menber_title]}>{this.translate('门店会员')}</Text>
						<TouchableOpacity
							style={[styles.menberHead]}
							onPress={() => {
								this.setState({ isShowMenberTip: !this.state.isShowMenberTip });
							}}>
							<Image source={image.help_icon} style={[styles.arrow_r]} />
						</TouchableOpacity>
						{this.state.isShowMenberTip && (
							<View style={[styles.MenberTips]}>
								<View style={[styles.MenberTips_arrow]} />
								<Text style={[styles.MenberTips_txt]}>{this.translate('会员活跃率：统计时间范围内有消费的会员总数/总会员数')}</Text>
							</View>
						)}
					</View>
				</View>
				{/* 标题 -E */}

				<LoadingView loading={this.state.loading} loadingShowContent={false} cancelable={false} loadingStyle={'inside'}>
					{/* 新增会员|总会员|会员活跃率 -S */}
					<View style={[styles.memberBgcell]}>
						<ImageBackground source={image.scape_glare_pic} style={[styles.bg]} imageStyle={{ borderRadius: 4 }}>
							<View style={styles.member_cell_one}>
								<Text style={[styles.cell_sellTxt, styles.textWhite]}>{this.translate('新增会员')}</Text>
								<Text style={[styles.cell_sellTotal, styles.textWhite, { fontSize: commonUtil.formatTextSize(this.state.newCustomerNum, 6, 20) }]}>
									{this.state.newCustomerNum}
									{this.translate('人')}
								</Text>
								<Text style={[styles.cell_sellTxt, styles.textWhite]}>
									{this.translate('消费占比')}
									{commonUtil.formatPercent(this.state.newCustomerNumSellPer)}
								</Text>
							</View>
							<View style={styles.member_cell_one}>
								<Text style={[styles.cell_sellTxt, styles.textWhite]}>{this.translate('总会员')}</Text>
								<Text style={[styles.cell_sellTotal, styles.textWhite, { fontSize: commonUtil.formatTextSize(this.state.allCustomerNum, 6, 20) }]}>
									{this.state.allCustomerNum}
									{this.translate('人')}
								</Text>
								<Text style={[styles.cell_sellTxt, styles.textWhite]}>
									{this.translate('消费占比')}
									{commonUtil.formatPercent(this.state.allCustomerSellPre)}
								</Text>
							</View>
							<View style={styles.member_cell_one}>
								<Text style={[styles.cell_sellTxt, styles.textWhite]}>{this.translate('会员活跃率')}</Text>
								<Text style={[styles.cell_sellTotal, styles.textWhite]}>{commonUtil.formatDecimal(this.state.activeCustomerPre)}</Text>
								<Text style={[styles.cell_sellTxt, styles.textWhite]}>
									{this.translate('总消费')}
									{this.state.allCustomerTicketNum}
									{this.translate('笔')}
								</Text>
							</View>
						</ImageBackground>
					</View>
					{/* 新增会员|总会员|会员活跃率 -E */}

					{/* 会员活跃分布饼图 -S */}
					<View style={[styles.pieChart]}>
						<Text style={[styles.pieChart_title]}>{this.translate('会员活跃分布')}</Text>
						<LoadingView loading={this.state.loading} loadingShowContent={false} cancelable={false} loadingStyle={'inside'}>
							<PieChart
								data={this.state.pieDatas}
								formatCenterNumber={(num) => {
									return commonUtil.formatDecimal(num, 0);
								}}
								centerTxt={this.translate('活跃人数')}
							/>
						</LoadingView>
					</View>
					{/* 会员活跃分布饼图 -E */}

					{/* 各个分店会员数条状图 -S */}
					{this.state.storeCustomerNumList && this.state.storeCustomerNumList.length > 0 && (
						<View style={[styles.across, { height: (this.state.storeCustomerNumList.length || 0) * 80 + 20 }]}>
							<ScrollableTabView containerWidth={200} tabbarStyle={{ width: 200, borderWidth: 0 }} tabsContainerStyle={{ width: 200 }}>
								<View tabLabel={this.translate('各门店会员数')}>
									<View style={[styles.across_body]}>{this.renderList(this.state.storeCustomerNumList)}</View>
								</View>
								<View tabLabel={this.translate('活跃率')}>
									<View style={[styles.across_body]}>{this.renderList(this.state.storeCustomerActivityRates, true)}</View>
								</View>
							</ScrollableTabView>
						</View>
					)}
					{/* 各个分店会员数条状图 -E */}
				</LoadingView>
				<Toast ref='toast' />
			</View>
		);
	}
}

export default Member;
