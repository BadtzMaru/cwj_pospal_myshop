import { Platform } from 'react-native';
import moment from 'moment';
import md5 from './../component/md5';
import config from './config';
import commonUtil from './commonUtil';
import storageUtil from './storageUtil';
import { StackActions, NavigationActions } from 'react-navigation';

var _networkError = false;
var _lastNetwork = new Date();

module.exports = {
	async post(url, data, area) {
		let _time = moment().format('X');
		let _apiToken = this.getApiToken(url, _time);
		let _userToken = await storageUtil.getUserToken();
		let _storeId = await storageUtil.getUserId();
		let _area = await storageUtil.getArea();
		let _baseUrl = config.ENVIRONMENT.API_BASE_URL;
		if (_area) {
			_baseUrl = _baseUrl.replace('{area}', _area);
		} else {
			if (area > 0) {
				_baseUrl = _baseUrl.replace('{area}', area);
			} else {
				_baseUrl = _baseUrl.replace('area{area}-', '');
			}
		}
		let _url = _baseUrl + url;

		return new Promise((resolve, reject) => {
			fetch(_url, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Plat: Platform.OS,
					Version: config.VERSIONCODE,
					TIME: _time,
					APITOKEN: _apiToken,
					USERTOKEN: _userToken,
					STOREID: _storeId,
				},
				body: data ? JSON.stringify(data) : null,
			})
				.then((response) => {
					this.processData(response, resolve, reject);
				})
				.catch((error) => {
					this.processNetworkError(reject);
				});
		});
	},

	getApiToken(url, time) {
		let action = url.split('/').pop().toUpperCase();
		return md5.hex_md5(`${action}_POSPAL_${time}`);
	},

	processData: (response, resolve, reject) => {
		_networkError = false;
		_lastNetwork = new Date();
		if (response.status !== 200) {
			reject('0002');
		} else {
			response.json().then((responseData) => {
				if (responseData == null) {
					reject('0002');
				} else if (responseData.successed) {
					resolve(responseData);
				} else {
					if (responseData.messageCode == 9012 || responseData.messageCode == 2004) {
						let navigation = storageUtil.getNavigation();
						if (navigation != null) {
							storageUtil.delStoreInfo().then(() => {
								var resetAction = StackActions.reset({
									index: 0,
									actions: [NavigationActions.navigate({ routeName: 'login' })],
								});
								navigation.dispatch(resetAction);
							});
						}
					} else {
						reject(responseData.messageCode);
					}
				}
			});
		}
	},

	processNetworkError(reject) {
		reject(new Error(this.getError('0001')));
	},

	getError(messageCode) {
		return commonUtil.translate(`MSG_${messageCode}`);
	},
};
