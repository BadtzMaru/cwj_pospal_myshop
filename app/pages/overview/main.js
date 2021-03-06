import { React, Component, View, Text, storageUtil, Container, PullRefreshScrollView, Toast } from '../../common/importUtil';
import style from '../../common/themes/default/style';
import BusinessProfile from './businessProfile';
import Member from './member';

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			industry: null,
			isSale: false,
			isMember: false,
			navigation: storageUtil.getNavigation(),
		};
		storageUtil.getStoreInfo().then((store) => {
			this.setState({ industry: store.industry });
		});
		// 云端 销售
		storageUtil.isLock(2, 78).then((lock) => {
			this.setState({ isSale: lock });
		});
		// 云端 会员
		storageUtil.isLock(2, 176).then((lock) => {
			this.setState({ isMember: lock });
		});
	}
	componentDidMount() {
		super.componentDidMount();
	}
	// 消息弹窗
	toast(message) {
		this.refs.toast && this.refs.toast.show(message);
	}

	render() {
		let theme = this.theme();
		let styles = theme.style.pages.overview.main;
		let image = theme.image;
		let color = theme.color;
		return (
			<Container headerProps={{ mode: 'full', adType: 1 }}>
				<PullRefreshScrollView
					style={{ backgroundColor: color.bgLine }}
					onRefresh={() => {
						storageUtil.setAppState(true);
					}}>
					<View style={styles.spaceView} />
					{/* 营业概况 -S */}
					{!this.state.isSale && this.state.industry && this.state.industry != 108 && (
						<BusinessProfile ref='BusinessProfile' navigation={this.state.navigation} toast={this.toast.bind(this)} />
					)}
					{/* 营业概况 -E */}

					{/* 美妆概况 -S 未实现 */}
					{/* 美妆概况 -E 未实现 */}

					{/* 门店会员 -S */}
					{!this.state.isMember && <Member ref='Menber' navigation={this.state.navigation} toast={this.toast.bind(this)} />}
					{/* 门店会员 -E */}
				</PullRefreshScrollView>
				<Toast ref='toast' />
			</Container>
		);
	}
}
