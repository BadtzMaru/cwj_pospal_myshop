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
	ScrollView,
	Dimensions,
	LinearGradient,
	Alert,
	Toast,
	Platform,
	Container,
	ToggleSwitch,
} from '../../../common/importUtil';

export default class businessRanking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			groupByRegion: false,
			loading: false,
			hasRegionUsers: false,
			shopSaleList: [],
		};
	}
	componentDidMount() {
		super.componentDidMount();
		InteractionManager.runAfterInteractions(() => {
			storageUtil.getStoreInfo().then((store) => {
				if (store.hasRegionUsers) {
					this.setState({ hasRegionUsers: true });
				}
				this.loadData();
			});
		});
	}
	// 加载数据
	loadData() {
		storageUtil.getDateRangeAndUserIdsParam().then((params) => {
			console.log(params);
			params.pageSize = params.userIds ? params.userIds.length + 10 : 10;
			params.groupByRegion = this.state.groupByRegion;
			var shopSaleList = [];
			this.setState({ loading: true });
			httpUtil.post(config.API.API_LoadSaleRanking, params).then((response) => {
				console.log('XHR_门店销售排行:', response);
				if (response.successed) {
					if (response.result && response.result.totalAmountRanking) {
						response.result.totalAmountRanking.map((item) => {
							shopSaleList.push({
								name: item.userName,
								topNum: item.totalAmount,
								percentageNum: item.totalAmountPercent,
							});
						});
						console.log(shopSaleList);
						this.setState({ loading: false, shopSaleList });
					} else {
						this.setState({ loading: false });
						this.refs.toast && this.refs.toast.show(error.message);
					}
				}
			});
		});
	}
	render() {
		let theme = this.theme();
		let styles = theme.style.pages.overview.main;
		let commonstyles = theme.style.common;

		return (
			<Container
				headerProps={{
					mode: 'titleBack',
					titleDisplayName: '门店销售排行',
					navigation: this.props.navigation,
				}}>
				<View style={commonstyles.greyPlace} />
				<LoadingView loading={this.state.loading} loadingShowContent={false} cancelable={false}>
					<View style={[styles.table]}>
						<View style={[styles.row, styles.row_head]}>
							<Text style={[styles.column_head]}>{this.translate('排名')}</Text>
							<Text style={[styles.column_head]}>{this.translate('门店')}</Text>
							<Text style={[styles.column_head, styles.column_end]}>{this.translate('销售额')}</Text>
							<Text style={[styles.column_head, styles.column_end]}>{this.translate('占比')}</Text>
						</View>
						<ScrollView style={[styles.table_content]}>
							{this.state.hasRegionUsers && (
								<View style={[styles.group_region_container]}>
									<Text>{this.translate('按区域汇总')}</Text>
									<ToggleSwitch
										isOn={this.state.groupByRegion}
										onToggle={(isOn) => {
											this.setState({ groupByRegion: isOn });
											this.loadData();
										}}
									/>
								</View>
							)}
							{/* 门店销售排名列表 -S */}
							{this.state.shopSaleList.map((p, idx) => {
								return (
									<View key={idx} style={[styles.row]}>
										<Text style={[styles.column_name]}>{idx + 1}</Text>
										<Text style={[styles.column_name]}>{p.name}</Text>
										<Text style={[styles.column_num]}>{commonUtil.formatDecimal(p.topNum, 2)}</Text>
										<Text style={[styles.column_num]}>{commonUtil.formatPercent(p.percentageNum)}</Text>
									</View>
								);
							})}
							{/* 门店销售排名列表 -E */}

							{/* IOS 底部横线遮挡 -S */}
							<View style={Platform.OS == 'ios' ? { height: 30 } : {}} />
							{/* IOS 底部横线遮挡 -E */}

							{/* 暂无数据 -S */}
							{this.state.shopSaleList.length == 0 && (
								<View style={commonstyles.emptyTextContainer}>
									<Text style={commonstyles.emptyText}>{this.translate('暂无数据')}</Text>
								</View>
							)}
							{/* 暂无数据 -E */}
						</ScrollView>
					</View>
				</LoadingView>
				<Toast ref='toast' />
			</Container>
		);
	}
}
