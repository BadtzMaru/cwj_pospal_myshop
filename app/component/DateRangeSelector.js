import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Modal from './Modal';
import commonUtil from '../common/commonUtil';
import storageUtil from '../common/storageUtil';
import DatePicker from 'react-native-datepicker';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import config from '../common/config';
import DateTimePicker from './datepicker/index';

export default class DateRangeSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dateRange: null,
			dateTime: '0:00',
			isDateTimePickerVisible: false,
			currentDateTime: new Date(),
			currentPicker: 'begin',
		};
		storageUtil.getDateRange().then((dateRange) => {
			this.setState({ dateRange, dateTime: dateRange.dateTime });
		});
	}
	open() {
		this.refs.modal.open();
	}
	close() {
		this.refs.modal.close();
	}
	save() {
		this.close();
		setTimeout(() => {
			storageUtil.setDateRange(this.state.dateRange);
		}, 200);
	}
	componentDidMount() {
		this.dateRangeListener = RCTDeviceEventEmitter.addListener(config.NOTIFIES.DATERANGE_CHANGE, (value) => {
			this.setState({ dateRange: value, dateTime: value.dateTime });
		});
	}
	componentWillUnmount() {
		this.setState = (state, callback) => {
			return;
		};
		this.dateRangeListener && this.dateRangeListener.remove();
	}
	changeTime = (dateTime) => {
		this.setState({ dateTime });
	};
	showBeginDateTimePicker() {
		let { dateRange, currentDateTime } = this.state;
		if (dateRange != null) {
			currentDateTime = dateRange.begin.toDate();
		}
		this.setState({ isDateTimePickerVisible: true, currentDateTime, currentPicker: 'begin' });
	}
	showEndDateTimePicker() {
		let { dateRange, currentDateTime } = this.state;
		if (dateRange != null) {
			currentDateTime = dateRange.end.toDate();
		}
		this.setState({ isDateTimePickerVisible: true, currentDateTime, currentPicker: 'end' });
	}
	changeDateType(type) {
		let { dateRange, dateTime } = this.state;
		const dateHour = parseInt(dateTime.split(':')[0]);
		const dateMinute = parseInt(dateTime.split(':')[1]);
		let begin = moment(new Date()).hours(dateHour).minutes(dateMinute).seconds(0);
		let end = moment(new Date()).add(1, 'days').hours(dateHour).minutes(dateMinute).seconds(0).subtract(1, 'seconds');
		if (type == 'yesterday') {
			begin = begin.subtract(1, 'day');
			end = end.subtract(1, 'day');
		} else if (type == 'thisweek') {
			begin = begin.startOf('week');
			console.log(begin.format('YYYY-MM-DD HH:mm:ss'));
		} else if (type == 'thismonth') {
			begin = begin.startOf('month').hours(dateHour).minutes(dateMinute).seconds(0);
		} else if (type == 'last3day') {
			begin = begin.subtract(3, 'day');
		} else if (type == 'last7day') {
			begin = begin.subtract(7, 'day');
		} else if (type == 'lastweek') {
			begin = begin.startOf('week').add(-1, 'weeks').hours(dateHour).minutes(dateMinute).seconds(0);
			end = end.endOf('week').add(-1, 'weeks').add(1, 'days').hours(dateHour).minutes(dateMinute).seconds(0).subtract(1, 'seconds');
			console.log(begin.format('YYYY-MM-DD HH:mm:ss'));
			console.log(end.format('YYYY-MM-DD HH:mm:ss'));
		} else if (type == 'lastmonth') {
			begin = begin.startOf('month').add(-1, 'months').hours(dateHour).minutes(dateMinute).seconds(0);
			end = end.add(-1, 'months').endOf('month').add(1, 'days').hours(dateHour).minutes(dateMinute).seconds(0).subtract(1, 'seconds');
		}
		dateRange.begin = begin;
		dateRange.end = end;
		dateRange.type = type;
		dateRange.dateTime = dateTime;
		this.setState({ dateRange });
	}
	handleDatePicked(date) {
		let { dateRange, currentPicker, dateTime } = this.state;
		const dateHour = parseInt(dateTime.split(':')[0]);
		const dateMinute = parseInt(dateTime.split(':')[1]);
		if (currentPicker == 'begin') {
			dateRange.begin = moment(date).hours(dateHour).minutes(dateMinute).seconds(0).subtract(1, 'seconds');
		} else {
			dateRange.end = moment(date).add(1, 'days').hours(dateHour).minutes(dateMinute).seconds(0).subtract(1, 'seconds');
		}
		dateRange.type = 'custom';
		this.setState({ isDateTimePickerVisible: false, dateRange });
	}
	hideDateTimePicker() {
		this.setState({ isDateTimePickerVisible: false });
	}
	render() {
		let { dateRange, isDateTimePickerVisible, currentDateTime } = this.state;
		let dateType = dateRange != null ? dateRange.type : 'today';
		let theme = commonUtil.getTheme();
		let styles = theme.style.component.DateRangeSelector;
		let types = [
			{ type: 'today', text: commonUtil.translate('今天') },
			{ type: 'yesterday', text: commonUtil.translate('昨天') },
			{ type: 'thisweek', text: commonUtil.translate('本周') },
			{ type: 'thismonth', text: commonUtil.translate('本月') },
			{ type: 'last3day', text: commonUtil.translate('最近3天') },
			{ type: 'last7day', text: commonUtil.translate('最近7天') },
			{ type: 'lastweek', text: commonUtil.translate('上周') },
			{ type: 'lastmonth', text: commonUtil.translate('上月') },
		];
		let buttons = [];
		types.map((item, index) => {
			let selected = dateType == item.type;
			buttons.push(
				<TouchableOpacity
					key={'b_' + index}
					style={[styles.datetype_button, selected && styles.datetype_button_selected]}
					onPress={this.changeDateType.bind(this, item.type)}>
					<Text style={[styles.datetype_button_text, selected && styles.datetype_button_text_selected]}>{item.text}</Text>
				</TouchableOpacity>
			);
		});
		return (
			<Modal ref='modal'>
				<View style={styles.container}>
					{/* 开始时间 和 结束时间 -S */}
					<View style={styles.date_container}>
						<View style={{ flex: 1 }}>
							<Text style={styles.date_tip_text}>{commonUtil.translate('开始时间')}</Text>
							<TouchableOpacity onPress={this.showBeginDateTimePicker.bind(this)}>
								<Text style={styles.date_text}>{moment(dateRange != null ? dateRange.begin : new Date()).format('YYYY-MM-DD')}</Text>
							</TouchableOpacity>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={styles.date_tip_text}>{commonUtil.translate('结束时间')}</Text>
							<TouchableOpacity onPress={this.showEndDateTimePicker.bind(this)}>
								<Text style={styles.date_text}>{moment(dateRange != null ? dateRange.end : new Date()).format('YYYY-MM-DD')}</Text>
							</TouchableOpacity>
						</View>
					</View>
					{/* 开始时间 和 结束时间 -E */}

					{/* 按钮组 -S */}
					<View style={styles.item_container}>{buttons}</View>
					{/* 按钮组 -E */}

					{/* 营业起始时间 -S */}
					<View style={styles.open_container}>
						<Text style={styles.open_container_title}>{commonUtil.translate('营业起始时间')}:</Text>
						<DatePicker
							style={{ flex: 1 }}
							date={this.state.dateTime}
							showIcon={false}
							mode='time'
							format='H:mm'
							confirmBtnText='确认'
							cancelBtnText='取消'
							placeholder='select date'
							customStyles={{
								dateInput: {
									borderColor: '#eee',
								},
							}}
							onDateChange={this.changeTime}
						/>
					</View>
					{/* 营业起始时间 -E */}

					{/* 提示 -S */}
					<View style={styles.open_container_tip}>
						<Text style={{ color: '#616161' }}>
							{commonUtil.translate('设置营业起始时间用于查询')} <Text style={{ color: '#F44337' }}> {commonUtil.translate('每日销售报表')}</Text>。{' '}
							{commonUtil.translate('如设置为8:00，请求日期为2014-8-8，则每日报表的请求时间为')} <Text style={{ color: '#0E95FF' }}> 2014-8-8 8:00 </Text>{' '}
							{commonUtil.translate('至')} <Text style={{ color: '#0E95FF' }}> 2014-8-9 8：00</Text>。
						</Text>
					</View>
					{/* 提示 -E */}

					{/* 确认取消按钮 -S */}
					<View style={styles.button_container}>
						<TouchableOpacity style={{ flex: 1 }} onPress={this.close.bind(this)}>
							<Text style={styles.button_cancel_text}>{commonUtil.translate('取消')}</Text>
						</TouchableOpacity>
						<View style={styles.button_v_line} />
						<TouchableOpacity style={{ flex: 1 }} onPress={this.save.bind(this)}>
							<Text style={styles.button_ok_text}>{commonUtil.translate('确定')}</Text>
						</TouchableOpacity>
					</View>
					{/* 确认取消按钮 -E */}

					{/* 时间弹窗 -S */}
					<DateTimePicker
						date={currentDateTime}
						isVisible={isDateTimePickerVisible}
						onConfirm={this.handleDatePicked.bind(this)}
						onCancel={this.hideDateTimePicker.bind(this)}
					/>
					{/* 时间弹窗 -E */}
				</View>
			</Modal>
		);
	}
}
