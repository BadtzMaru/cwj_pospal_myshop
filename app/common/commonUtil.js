import defaultTheme from './themes/default/index';
import I18n from 'react-native-i18n';
import { config } from './importUtil';
import moment from 'moment';

I18n.defaultLocale = 'zh-CN';
I18n.fallbacks = true;
I18n.translations = {
	'zh-CN': require('./langs/zh-CN.json'),
	'zh-Hans': require('./langs/zh-CN'),
	en: require('./langs/en'),
	en_US: require('./langs/en'),
	en_GB: require('./langs/en'),
	en_HK: require('./langs/en'),
	en_WW: require('./langs/en'),
	en_CA: require('./langs/en'),
	en_AU: require('./langs/en'),
	en_SG: require('./langs/en'),
	en_NZ: require('./langs/en'),
	en_ID: require('./langs/en'),
	en_PH: require('./langs/en'),
	en_TH: require('./langs/en'),
	en_MY: require('./langs/en'),
	'zh-TW': require('./langs/zh-FT'),
	'zh-HK': require('./langs/zh-FT'),
	'zh-Hant': require('./langs/zh-FT'),
};

let _theme = defaultTheme;

module.exports = {
	getTheme() {
		return _theme;
	},
	translate(key) {
		return I18n.t(key);
	},
	getTheme() {
		return _theme;
	},
	formatDateRangeType(dateRange) {
		if (dateRange != null) {
			if (dateRange.type == 'today') {
				return this.translate('今天');
			} else if (dateRange.type == 'yesterday') {
				return this.translate('昨天');
			} else if (dateRange.type == 'thisweek') {
				return this.translate('本周');
			} else if (dateRange.type == 'thismonth') {
				return this.translate('本月');
			} else if (dateRange.type == 'last3day') {
				return this.translate('最近3天');
			} else if (dateRange.type == 'last7day') {
				return this.translate('最近7天');
			} else if (dateRange.type == 'lastweek') {
				return this.translate('上周');
			} else if (dateRange.type == 'lastmonth') {
				return this.translate('上月');
			} else if (dateRange.type == 'custom') {
				return this.translate('自定义');
			}
		}
		return '';
	},
	formatDateRangeDateTime(dateRange, format, split) {
		if (dateRange != null) {
			return `${moment(dateRange.begin).format(format)}${split}${moment(dateRange.end).format(format)}`;
		}
		return '';
	},
	// 计算字体大小
	formatTextSize(value, maxLength, oriSize) {
		if (value && value.toString().length > maxLength) {
			return oriSize - oriSize / 8;
		}
		return oriSize;
	},
	formatStringDate(strData, format) {
		return moment(strData).format(format);
	},
};
