import { React, Component, View, Text, storageUtil, Container } from '../../common/importUtil';

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

	componentDidMount() {}

	render() {
		return <Container></Container>;
	}
}
