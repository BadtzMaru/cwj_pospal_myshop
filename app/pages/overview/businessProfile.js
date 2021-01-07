import { Dimensions } from 'react-native';
import {
	React,
	Component,
	View,
	Text,
	TouchableOpacity,
	commonUtil,
	storageUtil,
	httpUtil,
	config,
	LoadingView,
	PullRefreshScrollView,
	ImageBackground,
	InteractionManager,
	ScrollableTabView,
	LineChart,
	Image,
	LinearGradient,
} from '../../common/importUtil';

class BusinessProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			init: false,
			loading: false,
			totalPrice: '0.00', // 总销售额
			totalOrderNum: 0, // 订单数
			totalPriceDatas: [], // 总销售额 列表数据
			totalOrderDatas: [], // 订单数 列表数据
			lastLoadDataTime: null, // 最后修改时间
			shopSaleList: [], // 分店销售排名
		};
	}
	componentDidMount() {
		super.componentDidMount();
		InteractionManager.runAfterInteractions(() => {
			this.loadData(true, 1);
		});
	}
	// 分店改变事件
	onStoreChange() {
		this.onFocusChange(storageUtil.getFocusedBottomTab() == 'overview');
	}
	// 时间范围改变时间
	onDateRangeChange() {
		this.onFocusChange(storageUtil.getFocusedBottomTab() == 'overview');
	}
	onFocusChange(focused) {
		if (this.state.init && focused) {
			if (storageUtil.getIfDateRangeTimeOrStoreChanged(this.state.lastLoadDataTime)) {
				this.loadData(true, 1);
			}
		}
	}
	// 加载门店营业数据
	loadData(showLoading, pageIndex) {
		storageUtil.getDateRangeAndUserIdsParam().then((params) => {
			console.log('门店营业数据请求参数:', params);
			var shopSaleList = [];
			this.setState({ loading: true });
			params.pageSize = 5;
			Promise.all([httpUtil.post(config.API.API_LoadSaleAnalysisList, params), params.isChain && httpUtil.post(config.API.API_LoadSaleRanking, params)])
				.then((values) => {
					console.log('门店营业数据:', values);
					var response = values[0];
					if (response.successed && response.result.chartData) {
						var totalPrice = 0;
						if (response.result.chartData.seriesData) {
							response.result.chartData.seriesData[0].map((p) => {
								totalPrice += p;
							});
						}
						var totalOrderNum = 0;
						if (response.result.chartData.seriesData) {
							response.result.chartData.seriesData[2].map((p) => {
								totalOrderNum += p;
							});
						}
						// 计算总销售额和总订单数图表
						var pDatas = [];
						var nDatas = [];
						if (response.result.chartData.xAxisData) {
							response.result.chartData.xAxisData.map((data, index) => {
								let label1 = data;
								let label2 = '';
								if (params.groupBy != 'hour') {
									label1 = commonUtil.formatStringDate(data, 'DD');
									label2 = commonUtil.formatStringDate(data, 'MMM');
								}
								pDatas.push({
									xLabel: label1,
									xLabel2: label2,
									value: response.result.chartData.seriesData[0][index],
									displayValue: `${commonUtil.translate('货币符号')}${response.result.chartData.seriesData[0][index]}`,
								});
								nDatas.push({
									xLabel: label1,
									xLabel2: label2,
									value: response.result.chartData.seriesData[2][index],
									displayValue: response.result.chartData.seriesData[2][index],
								});
							});
						}
						// 子分店存在的情况
						if (values && values.length > 1) {
							var response1 = values[1];
							if (response1.successed) {
								if (response1.result && response1.result.totalAmountRanking) {
									response1.result.totalAmountRanking.map((item) => {
										shopSaleList.push({
											name: item.userName,
											topNum: item.totalAmount,
											percentageNum: item.totalAmountPercent,
										});
									});
								}
							}
						}
						this.setState({
							loading: false,
							init: true,
							totalPrice: totalPrice.toFixed(2),
							totalOrderNum,
							totalPriceDatas: pDatas,
							totalOrderDatas: nDatas,
							shopSaleList,
							lastLoadDataTime: new Date(),
						});
					} else {
						console.log('门店营业数据失败');
						this.setState({ loading: false, init: true, totalPrice: '0.00', totalOrderNum: 0, totalPriceDatas: [], totalOrderDatas: [], shopSaleList });
					}
				})
				.catch((error) => {
					this.setState({
						loading: false,
						init: true,
						totalPrice: '0.00',
						totalOrderNum: 0,
						totalPriceDatas: [],
						totalOrderDatas: [],
						shopSaleList: shopSaleList,
					});
					if (this.props.toast) {
						this.props.toast(error.message);
					} else {
						this.refs.toast && this.refs.toast.show(error.message);
					}
				});
		});
	}
	// 渲染分店销售排行数据
	renderList(datas) {
		if (datas && datas.length == 0) {
			return null;
		} else {
			let theme = this.theme();
			let styles = theme.style.pages.overview.main;
			let { width } = Dimensions.get('window');
			var topNumMax = datas[0].topNum;
			var views = [];
			datas.map((p, i) => {
				var _width = (p.topNum / topNumMax) * (width - 36);
				_width = _width > 0 ? _width : 0;
				views.push(
					<View key={i}>
						<View style={[styles.across_item_up]}>
							<Text style={[styles.across_item_hd]}>{p.name}</Text>
							<Text style={[styles.across_item_bd]}>{commonUtil.formatDecimal(p.topNum, 2)}</Text>
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
		return (
			<View>
				<View style={styles.cells}>
					<View style={[styles.flexRow]}>
						<Text style={styles.cell_title}>{this.translate('营业概况')}</Text>
					</View>
					<LoadingView loading={this.state.loading} loadingShowContent={false} loadingStyle={'inside'}>
						{/* 销售总额|订单数 数字 -S */}
						<View style={[styles.bgcell]}>
							<ImageBackground source={image.scape_windmill_pic} style={[styles.bg]} imageStyle={{ borderRadius: 4 }}>
								<View style={styles.cell_one}>
									<Text style={[styles.cell_sellTotal, styles.textWhite, { fontSize: commonUtil.formatTextSize(this.state.totalPrice, 12, 20) }]}>
										{this.translate('货币符号')}
										{this.state.totalPrice}
									</Text>
									<Text style={[styles.cell_sellTxt, styles.textWhite]}>{this.translate('总销售额')}</Text>
								</View>
								<View style={styles.cell_standLine} />
								<View style={styles.cell_one}>
									<Text style={[styles.cell_sellTotal, styles.textWhite]}>{this.state.totalOrderNum}</Text>
									<Text style={[styles.cell_sellTxt, styles.textWhite]}>{this.translate('订单数')}</Text>
								</View>
							</ImageBackground>
						</View>
						{/* 销售总额|订单数 数字 -E */}

						{/* 销售总额|订单数 表格 -S */}
						<View style={{ height: 280 }}>
							<ScrollableTabView containerWidth={200} tabbarStyle={{ width: 200, borderWidth: 0 }} tabsContainerStyle={{ width: 200 }}>
								<LineChart tabLabel={this.translate('总销售额')} data={this.state.totalPriceDatas} />
								<LineChart tabLabel={this.translate('订单数')} data={this.state.totalOrderDatas} />
							</ScrollableTabView>
						</View>
						{/* 销售总额|订单数 表格 -E */}

						{/* 分店销售排名 -S */}
						{this.state.shopSaleList && this.state.shopSaleList.length > 0 && (
							<View style={[styles.across]}>
								<View style={[styles.across_head, styles.flexRow]}>
									<Text style={[styles.across_head_hd]}>{this.translate('排名')}</Text>
									<TouchableOpacity
										onPress={() => {
											this.props.navigation.navigate('businessRanking');
										}}>
										<View
											style={[
												styles.across_ft,
												styles.flexRow,
												{
													alignItems: 'center',
												},
											]}>
											<Text style={[styles.across_head_text]}>{this.translate('更多')}</Text>
											<Image source={image.title_more_main_arrow} />
										</View>
									</TouchableOpacity>
								</View>
								<View style={[styles.across_body]}>{this.renderList(this.state.shopSaleList)}</View>
							</View>
						)}
						{/* 分店销售排名 -E */}
					</LoadingView>
				</View>
			</View>
		);
	}
}

export default BusinessProfile;
