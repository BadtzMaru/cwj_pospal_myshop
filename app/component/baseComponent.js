import { Component } from 'react';
import commonUtil from '../common/commonUtil';

export default class baseComponent extends Component {
	theme() {
		return commonUtil.getTheme();
	}
	translate(key) {
		return commonUtil.translate(key);
	}
	componentWillUnmount() {
		this.setState = (status, callback) => {
			return;
		};
	}
}
