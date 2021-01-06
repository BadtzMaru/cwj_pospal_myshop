import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import commonUtil from '../common/commonUtil';
import storageUtil from '../common/storageUtil';
import DateRangeSelector from './DateRangeSelector';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import config from '../common/config';

const HeaderMode = ['full', 'simple', 'titleBack'];

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { dateRange: null, currentStore: null, storeInfo: null, list: null };
		storageUtil.getDateRange().then((dateRange) => {
			this.setState({ dateRange });
		});
		storageUtil.getCurrentStore().then((store) => {
			this.setState({ currentStore: store });
		});
		storageUtil.getStoreInfo().then((store) => {
			this.setState({ storeInfo: store });
		});
		storageUtil.getAnnouncements().then((data) => {});
	}
	static defaultProps = {
		mode: 'simple',
		backable: false,
		hideDate: false,
	};
	// 页面初始化
	componentDidMount() {
		this.dateRangeListener = RCTDeviceEventEmitter.addListener(config.NOTIFIES.DATERANGE_CHANGE, (value) => {
			this.setState({ dateRange: value });
		});
	}
	componentWillUnmount() {
		this.setState = (state, callback) => {
			return;
		};
		this.dateRangeListener && this.dateRangeListener.remove();
	}
	renderSimpleDate(styles, image, backable) {
		return (
			<View style={[styles.row, { flex: 1 }, styles.rowPad]}>
				{backable && <View style={styles.row} />}
				<TouchableOpacity
					onPress={() => {
						this.refs.dateRangeSelector.open();
					}}>
					<View style={styles.simple_date_container}>
						<Image style={styles.date_icon} source={image.menu_date_icon_max} />
						<View style={styles.simple_date_text_container}>
							<Text style={styles.simple_date_text_title}>{commonUtil.formatDateRangeType(this.state.dateRange)}</Text>
							<Text style={styles.simple_date_text_date}>{commonUtil.formatDateRangeDateTime(this.state.dateRange, 'MM/DD', '-')}</Text>
						</View>
					</View>
				</TouchableOpacity>
				{!backable && <View style={styles.row} />}
			</View>
		);
	}
	renderTitle(styles, image) {
		let { currentStore, storeInfo } = this.state;
		let title = '';
		let options = [];
		let defaultId = -1;
		if (currentStore != null) {
			title = currentStore.company;
			// 有subs
			if (storeInfo != null && storeInfo.subs != null && storeInfo.subs.length > 0) {
				defaultId = storeInfo.userId;
				options.push({
					key: storeInfo.company,
					value: storeInfo,
					id: storeInfo.userId,
				});
				storeInfo.subs.map((item, index) => {
					options.push({ key: item.company, value: item, id: item.userId });
					if (item.company === title) {
						defaultId = item.userId;
					}
				});
			}
		}
		if (options.length > 0) {
		} else {
			return (
				<View style={styles.title_container}>
					<Text style={styles.title}>{title}</Text>
				</View>
			);
		}
	}
	// mode === 'full' 的情况下渲染 首页时间样式
	renderFullDate(styles, image) {
		return (
			<View style={[styles.row, styles.full_date_container]}>
				<TouchableOpacity
					onPress={() => {
						this.refs.dateRangeSelector.open();
					}}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Image style={styles.date_icon} source={image.menu_date_icon_max} />
						<Text style={styles.full_date_text_title}>{commonUtil.formatDateRangeType(this.state.dateRange)}</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.refs.dateRangeSelector.open();
					}}>
					<Text style={styles.full_date_text_date}>{commonUtil.formatDateRangeDateTime(this.state.dateRange, commonUtil.translate('间隔日期格式'), ' - ')}</Text>
				</TouchableOpacity>
			</View>
		);
	}
	render() {
		let theme = commonUtil.getTheme();
		let styles = theme.style.component.Header;
		let image = theme.image;
		let mode = this.props.mode;
		let backable = this.props.backable;
		let hideDate = this.props.hideDate;

		if (mode === 'titleBack') {
		}

		if (mode === 'full') {
			return (
				<View style={styles.container}>
					<View style={styles.row}>
						<View style={styles.row} />
						{this.renderTitle(styles, image)}
						<View style={styles.row} />
					</View>
					{/* 预留广告 (未实现) */}
					{this.renderFullDate(styles, image)}
					<DateRangeSelector ref={'dateRangeSelector'} />
				</View>
			);
		} else {
			if (backable) {
			} else {
				return (
					<View style={styles.container}>
						<View style={styles.row}>
							{this.renderSimpleDate(styles, image, backable)}
							{this.renderTitle(styles, image)}
							<View style={[styles.row, { flex: 1, justifyContent: 'flex-end' }]}>{this.props.renderRightMenu && this.props.renderRightMenu()}</View>
						</View>
						{/* 预留广告 (未实现) */}
						<DateRangeSelector ref={'dateRangeSelector'} />
					</View>
				);
			}
		}
	}
}

export default Header;
