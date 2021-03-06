import moment from 'moment';
import { AsyncStorage } from 'react-native';
import { storageUtil } from './importUtil';
import config from './config';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

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
	setNavigation(navigation) {
		this._navigation = navigation;
	},
	getNavigation() {
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
			let value = await AsyncStorage.getItem('CURRENT_STORE');
			if (value) {
				this._currentStore = JSON.parse(value);
				return this._currentStore;
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
	// 设置公告
	async setAnnouncements(data) {
		this._announcements = data;
		await AsyncStorage.setItem('ANNOUNCEMENTS', JSON.stringify(data));
	},
	// 设置权限
	async setPermission(storeInfo, type) {
		this._permission = false;
		if (storeInfo) {
			// 不是员工 或者 cashierAuths包含1376879633495704861
			if (!type || storeInfo.cashierAuths.indexOf('1376879633495704861') != -1) {
				this._permission = true;
			}
		}
		await AsyncStorage.setItem('PERMISSION', JSON.stringify(this._permission));
	},
	// 判断tabbar页面权限 是否加锁
	async isLock(type, functionId) {
		let storeInfo = await this.getStoreInfo();
		// 非工号忽略
		if (storeInfo.cashierId == null) return false;
		let list = await this.getStoreInfo();
		let ids = [];
		function change(data) {
			data.map((item) => {
				ids.push(item.id);
				if (item.subWebsiteMenus && item.subWebsiteMenus.length != 0) {
					change(item.subWebsiteMenus);
				}
			});
		}
		if (type == 1) {
			// 收银端
			ids = list.cashierAuths;
		} else if (type == 2) {
			// 云端
			change(list.websiteMenus);
		}
		if (ids.indexOf(functionId) != -1) {
			return false;
		}
		return true;
	},
	// 获取公告信息
	async getAnnouncements() {
		if (this._announcements) {
			return this._announcements;
		} else {
			let announcements = await AsyncStorage.getItem('ANNOUNCEMENTS');
			if (announcements) {
				this._announcements = JSON.parse(announcements);
				return this._announcements;
			} else {
				return null;
			}
		}
	},
	// 保存时间范围
	setDateRange(range) {
		console.log(range);
		this._dateRange = range;
		this._lastChangeDateRangeTime = new Date();
		this._lastChangeDateRangeAndStoreTime = new Date();
		if (this._dateRange != null) {
			if (this._dateRange.begin.diff(this._dateRange.end, 'days') == 0) {
				this._dateRange.groupBy = 'hour';
			} else {
				this._dateRange.groupBy = 'day';
			}
		}
		RCTDeviceEventEmitter.emit(config.NOTIFIES.DATERANGE_CHANGE, this._dateRange);
	},
	async setAppState(state) {
		console.log(state);
		this._currentAppState = state;
		AsyncStorage.setItem('CURRENT_APPSTATE', JSON.stringify(state));
		RCTDeviceEventEmitter.emit(config.NOTIFIES.HOME_CHANGE, state);
	},
	// 改变分店
	setCurrentStore(store) {
		this._currentStore = store;
		this._lastChangeStoreTime = new Date();
		this._lastChangeDateRangeAndStoreTime = new Date();
		AsyncStorage.setItem('CURRENT_STORE', JSON.stringify(store));
		RCTDeviceEventEmitter.emit(config.NOTIFIES.CURRENTSTORE_CHANGE, this._currentStore);
	},
	getFocusedBottomTab() {
		return this._FocusedBottomTab || 'overview';
	},
	// 时间或者分店改变事件
	getIfDateRangeTimeOrStoreChanged(lastLoadTime) {
		if (this._lastChangeDateRangeAndStoreTime && lastLoadTime && lastLoadTime > this._lastChangeDateRangeAndStoreTime) {
			return false;
		}
		return true;
	},
	// 获取登陆信息
	async getSigninOptions() {
		if (this._signinOptions) {
			return this._signinOptions;
		} else {
			let signinOptions = await AsyncStorage.getItem('SIGNIN_OPTIONS');
			if (signinOptions) {
				this._signinOptions = JSON.parse(signinOptions);
				return this._signinOptions;
			} else {
				return null;
			}
		}
	},
	//工号登录，修改cashierAuths和websiteMenus
	async setAuthority(author) {
		let storeInfo = await this.getStoreInfo();
		storeInfo = Object.assign({}, storeInfo, author);
		this.setStoreInfo(storeInfo);
	},
};
