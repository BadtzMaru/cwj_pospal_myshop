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
		this.storeListener = RCTDeviceEventEmitter.addListener(config.NOTIFIES.CURRENTSTORE_CHANGE, (value) => {
			this.onStoreChange();
		});
	}
	componentWillUnmount() {
		this.setState = (status, callback) => {
			return;
		};
		this.dateRangeListener && this.dateRangeListener.remove();
		this.storeListener && this.storeListener.remove();
	}
	// 时间范围改变处理函数
	onDateRangeChange() {}
	// 当前分店改变事件
	onStoreChange() {}
}
