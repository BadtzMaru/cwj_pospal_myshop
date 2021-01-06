import { Component } from 'react';
import commonUtil from '../common/commonUtil';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import config from '../common/config';

export default class baseComponent extends Component {
	theme() {
		return commonUtil.getTheme();
	}
	translate(key) {
		return commonUtil.translate(key);
	}
	componentDidMount() {
		this.dateRangeListener = RCTDeviceEventEmitter.addListener(config.NOTIFIES.DATERANGE_CHANGE, (value) => {
			this.onDateRangeChange();
		});
	}
	componentWillUnmount() {
		this.setState = (status, callback) => {
			return;
		};
		this.dateRangeListener && this.dateRangeListener.remove();
	}
	// 时间范围改变处理函数
	onDateRangeChange() {}
}
