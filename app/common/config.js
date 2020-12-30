import { Platform } from 'react-native';

const _environment = 'development';
const _versionCode = '1.4.4';
const _version = '1.4.4';

const _environments = {
	//生产环境
	production: {
		DEBUG: true,
		API_BASE_URL: 'https://area{area}-bizapi.pospal.cn/',
		IMAGE_BASE_URL: 'https://pospalstoreimg.pospal.cn/',
	},
	//开发环境
	development: {
		DEBUG: true,
		// API_BASE_URL: 'https://wxservice-dev.pospal.cn/',
		API_BASE_URL: 'https://dev1-bizapi.pospal.cn/',
		// API_BASE_URL: 'https://hsy006.pospal.cn/',
		IMAGE_BASE_URL: 'https://order.dev.pospal.cn:12080/',
	},
	//本地调试环境
	local: {
		DEBUG: true,
		API_BASE_URL: 'http://192.168.2.162:29929/',
		//API_BASE_URL: 'http://192.168.1.90:29929/',
		IMAGE_BASE_URL: 'http://order.dev.pospal.cn:12080/',
	},
};

const _api = {
	// 登陆
	API_SIGNIN: '/myshopapi/Account/SignIn',
};

module.exports = {
	ENVIRONMENT: _environments[_environment],
	API: _api,
	VERSIONCODE: _versionCode,
	VERSION: _version,
	DEBUG: _environments[_environment].DEBUG,
};
