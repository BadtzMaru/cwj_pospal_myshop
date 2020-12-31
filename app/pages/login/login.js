import {
	React,
	Component,
	LoadingView,
	KeyboardAwareScrollView,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	LinearGradient,
	Toast,
	httpUtil,
	config,
	storageUtil,
} from '../../common/importUtil';

export default class login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			cashierLogin: false,
			account: 'qq707380414',
			password: 'cwj19961005',
			displayPassword: false,
			cashierNumber: '',
		};
	}
	renderCashierLogin(styles, color, image) {
		return (
			<View style={[styles.loginContainer]}>
				<Text style={[styles.tipTxt]}>账号</Text>
				<TextInput
					autoFocus={false}
					placeholder={'请输入账号'}
					placeholderTextColor={color.line}
					style={[styles.input]}
					value={this.state.account}
					onChangeText={(text) => this.setState({ account: text })}
				/>
				<Text style={[styles.tipTxt, { marginTop: 26 }]}>工号</Text>
				<TextInput
					placeholder={'请输入工号'}
					placeholderTextColor={color.line}
					style={[styles.input]}
					value={this.state.cashierNumber}
					onChangeText={(text) => this.setState({ cashierNumber: text })}
				/>
				<Text style={[styles.tipTxt, { marginTop: 26 }]}>{'密码'}</Text>
				<View style={{ alignSelf: 'stretch' }}>
					<TextInput
						clearButtonMode='never'
						secureTextEntry={!this.state.displayPassword}
						placeholder={'请输入密码'}
						placeholderTextColor={color.line}
						style={[styles.input]}
						value={this.state.password}
						onChangeText={(text) => this.setState({ password: text })}
					/>
					<TouchableOpacity
						style={styles.eyeContainer}
						onPress={() => {
							this.setState({ displayPassword: !this.state.displayPassword });
						}}>
						<Image style={styles.eyeImg} source={this.state.displayPassword ? image.eye_display_icon : image.eye_hide_icon} />
					</TouchableOpacity>
				</View>
				<TouchableOpacity>
					<Text style={[styles.linkTxt, { marginTop: 12 }]}>忘记密码</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.signin.bind(this, true)}>
					<LinearGradient colors={['#0E95FF', '#5CC0FF']} style={[styles.loginBtn]}>
						<Text style={[styles.loginBtnTxt]}>登录</Text>
					</LinearGradient>
				</TouchableOpacity>
			</View>
		);
	}
	renderLogin(styles, color, image) {
		return (
			<View style={[styles.loginContainer]}>
				<Text style={[styles.tipTxt]}>帐号</Text>
				<TextInput
					placeholder={'请输入帐号'}
					style={[styles.input]}
					autoFocus={false}
					placeholderTextColor={color.line}
					value={this.state.account}
					onChangeText={(text) => this.setState({ account: text })}
				/>
				<Text style={[styles.tipTxt, { marginTop: 27 }]}>密码</Text>
				<View style={{ position: 'relative', top: 0, left: 0, alignSelf: 'stretch' }}>
					<TextInput
						placeholder={'请输入密码'}
						clearButtonMode='never'
						secureTextEntry={!this.state.displayPassword}
						placeholderTextColor={color.line}
						value={this.state.password}
						onChangeText={(text) => this.setState({ password: text })}
						style={[styles.input]}
					/>
					<TouchableOpacity
						style={styles.eyeContainer}
						onPress={() => {
							this.setState({ displayPassword: !this.state.displayPassword });
						}}>
						<Image source={this.state.displayPassword ? image.eye_display_icon : image.eye_hide_icon} style={styles.eyeImg} />
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={this.signin.bind(this, false)}>
					<LinearGradient colors={['#0E95FF', '#5CC0FF']} style={[styles.loginBtn]}>
						<Text style={[styles.loginBtnTxt]}>登陆</Text>
					</LinearGradient>
				</TouchableOpacity>
			</View>
		);
	}
	// 登陆方法
	signin(cashierlogin, area) {
		let _this = this;
		_this.setState({ loading: true });
		let params = {
			account: _this.state.account,
			password: _this.state.password,
			cashierNum: cashierlogin ? _this.state.cashierNumber : null,
		};
		httpUtil
			.post(config.API.API_SIGNIN, params, area)
			.then(async (response) => {
				console.log('then', response);
				storageUtil.setSigninOptions(params);
				storageUtil.setStoreInfo(response.result);
				await this.getAnnouncementList();
				storageUtil.setPermission(response.result, cashierlogin);
				// 友盟-移动统计分析 (未实现)
				this.setState(
					{
						loading: false,
						password: '',
					},
					() => {
						this.props.navigation.replace('main');
					}
				);
			})
			.catch((error) => {
				console.log('catch', error);
			});
	}
	getAnnouncementList() {
		return new Promise((resolve, reject) => {
			storageUtil.getDateRangeAndUserIdsParam().then((params) => {
				console.log('params:', params);
				//  获取店铺数据
				httpUtil
					.post(config.API.API_LoadAnnouncements, params)
					.then((res) => {
						console.log('LoadAnnouncements获取的数据:', res);
						let list = res.result.announcements;
						for (let i in list) {
							list[i] = Object.assign({}, list[i], { show: true });
						}
						storageUtil.setAnnouncements(list);
						resolve(res);
					})
					.catch((error) => {
						resolve(error);
					});
			});
		});
	}
	render() {
		let theme = this.theme();
		let styles = theme.style.pages.login.login;
		let color = theme.color;
		let image = theme.image;
		let { cashierLogin } = this.state;
		return (
			<LoadingView loading={this.state.loading} loadingShowContent={true} cancelable={true}>
				<KeyboardAwareScrollView>
					<View style={[styles.container]}>
						<View style={[styles.topContainer]}>
							<Image style={[styles.topPic]} source={image.top_pic} />
							<TouchableOpacity>
								<View style={[styles.quickLogin]}>
									<Text style={[styles.quickLoginTxt]}>快速体验</Text>
								</View>
							</TouchableOpacity>
						</View>
						{cashierLogin ? this.renderCashierLogin(styles, color, image) : this.renderLogin(styles, color, image)}
						<TouchableOpacity onPress={() => this.setState({ cashierLogin: !cashierLogin, cashierNumber: '', password: '', loading: false })}>
							<Text style={[styles.linkTxt, { margin: 30, alignSelf: 'center' }]}>{cashierLogin ? '帐号登陆' : '工号登陆'}</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAwareScrollView>
				<Toast ref='toast' />
			</LoadingView>
		);
	}
}
