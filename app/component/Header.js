import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import commonUtil from '../common/commonUtil';
import storageUtil from '../common/storageUtil';
import DateRangeSelector from './DateRangeSelector';

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
		storageUtil.getAnnouncements().then((data) => {
			console.log(data);
		});
	}
	static defaultProps = {
		mode: 'simple',
		backable: false,
		hideDate: false,
	};
	componentWillUnmount() {
		this.setState = (state, callback) => {
			return;
		};
	}
	render() {
		let theme = commonUtil.getTheme();
		let styles = theme.style.component.Header;
		let image = theme.image;
		let mode = this.props.mode;
		let backable = this.props.backable;
		let hideDate = this.props.hideDate;

		if (mode === 'titleBack') {
		} else if (mode === 'full') {
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
						<DateRangeSelector ref={'dateRangeSelector'} />
					</View>
				);
			}
		}
	}
	renderSimpleDate(styles, image, backable) {
		return (
			<View style={[styles.row, { flex: 1 }, styles.rowPad]}>
				{backable && <View style={styles.row} />}
				<TouchableOpacity onPress={() => {}}>
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
}

export default Header;
