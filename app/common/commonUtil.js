import defaultTheme from './themes/default/index';
import I18n from 'react-native-i18n';

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
};
