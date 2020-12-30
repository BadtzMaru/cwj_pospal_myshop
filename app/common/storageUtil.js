import moment from 'moment';
import { AsyncStorage } from 'react-native';
import { storageUtil } from './importUtil';
import config from './config';

module.exports = {
	async getUserToken() {
		if (this._storeInfo) {
			return this._storeInfo.userToken;
		} else {
			let storeInfo = await AsyncStorage.getItem('STORE_INFO');
			if (storeInfo) {
				this._storeInfo = JSON.parse(storeInfo);
				this._lastChangeStoreTime = new Date();
				return this._storeInfo.userToken;
			} else {
				return null;
			}
		}
	},
	async getUserId() {
		if (this._storeInfo) {
			return this._storeInfo.userId;
		} else {
			let storeInfo = await AsyncStorage.getItem('STORE_INFO');
			if (storeInfo) {
				this._storeInfo = JSON.parse(storeInfo);
				this._lastChangeStoreTime = new Date();
				return this._storeInfo.userId;
			} else {
				return null;
			}
		}
	},
	async getArea() {
		if (this._storeInfo) {
			return this._storeInfo.area;
		} else {
			let storeInfo = await AsyncStorage.getItem('STORE_INFO');
			if (storeInfo) {
				this._storeInfo = JSON.parse(storeInfo);
				this._lastChangeStoreTime = new Date();
				return this._storeInfo.area;
			} else {
				return null;
			}
		}
	},
	async getNavigation() {
		return this._navigation;
	},
	async delStoreInfo() {
		await AsyncStorage.removeItem('STORE_INFO', (err) => {
			if (!err) {
				this._storeInfo = null;
				return true;
			}
		});
		await AsyncStorage.removeItem('CURRENT_STORE', (err) => {
			if (!err) {
				this._currentStore = null;
				return true;
			}
		});
		return true;
	},
	async setSigninOptions(options) {
		this.__signinOptions = options;
		AsyncStorage.setItem('SIGNIN_OPTIONS', JSON.stringify(options));
	},

	async setStoreInfo(storeInfo) {
		this._storeInfo = storeInfo;
		if (storeInfo) {
			this._currentStore = {
				userId: storeInfo.userId,
				company: storeInfo.company,
				account: storeInfo.account,
				parentUserId: storageUtil.parentUserId,
			};
			AsyncStorage.setItem('CURRENT_STORE', JSON.stringify(this._currentStore));
		}
		AsyncStorage.setItem('STORE_INFO', JSON.stringify(storeInfo));
	},

	async getDateRangeAndUserIdsParam() {
		let param = {};
		let userIds = [];
		let storeInfo = await this.getStoreInfo();
		let currentStore = await this.getCurrentStore();
		if (storeInfo) {
			param.industry = storeInfo.industry;
			param.secondIndustry = storeInfo.secondIndustry;
			param.userId = storeInfo.userId;
			param.loginUserId = storeInfo.userId;
			param.parentUserId = storeInfo.parentUserId;
			userIds.push(storeInfo.userId);
			if (storeInfo.subs) {
				storeInfo.subs.map((store) => {
					userIds.push(store.userId);
				});
			}
		}
		if (currentStore) {
			param.userId = currentStore.userId;
			param.parentUserId = currentStore.parentUserId;
			if (storeInfo && currentStore.userId != storeInfo.userId) {
				userIds = [currentStore.userId];
				if (storeInfo.hasRegionUsers && storeInfo.regionUsersMap) {
					if (storeInfo.regionUsersMap[currentStore.userId]) {
						userIds = storeInfo.regionUsersMap[currentStore.userId];
					}
				}
			}
		}
		console.log('storeInfo', storeInfo);
		console.log('currentStore', currentStore);
		param.userIds = userIds;
		let dateRange = await this.getDateRange();
		param.beginDateTime = moment(dateRange.begin).format('YYYY-MM-DD HH:mm:ss');
		param.endDateTime = moment(dateRange.end).format('YYYY-MM-DD HH:mm:ss');
		param.groupBy = dateRange.groupBy;
		param.version = config.VERSION;
		param.isChain = userIds && userIds.length > 1;
		return param;
	},

	async getStoreInfo() {
		if (this._storeInfo) {
			return this._storeInfo;
		} else {
			let storeInfo = await AsyncStorage.getItem('STORE_INFO');
			if (storeInfo) {
				this._storeInfo = JSON.parse(storeInfo);
				this._lastChangeStoreTime = new Date();
				return this._storeInfo;
			} else {
				return null;
			}
		}
	},

	async getCurrentStore() {
		if (this._currentStore) {
			return this._currentStore;
		} else {
			let value = AsyncStorage.getItem('CURRENT_STORE');
			if (value) {
				this._currentStore = JSON.parse(value);
				return _currentStore;
			} else {
				return null;
			}
		}
	},

	async getDateRange() {
		if (this._dateRange) {
			return {
				begin: this._dateRange.begin,
				end: this._dateRange.end,
				type: this._dateRange.type,
				groupBy: this._dateRange.groupBy,
				dateTime: this._dateRange.dateTime,
			};
		} else {
			this._lastChangeDateRangeTime = new Date();
			this._lastChangeDateRangeAndStoreTime = new Date();
			this._dateRange = {
				begin: moment(new Date()).startOf('day'),
				end: moment(new Date()).endOf('day'),
				type: 'today',
				groupBy: 'hour',
				dateTime: '0:00',
			};
			return this._dateRange;
		}
	},
};
