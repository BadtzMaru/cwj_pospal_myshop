import { React, View, Text, Component, ImageBackground, LinearGradient, commonUtil } from '../common/importUtil';
import {
	VictoryBar,
	VictoryChart,
	VictoryTheme,
	VictoryArea,
	VictoryPie,
	VictoryGroup,
	VictoryScatter,
	VictoryLabel,
	VictoryLine,
	VictoryAxis,
	VictoryPolarAxis,
	VictoryLegend,
	VictoryZoomContainer,
	VictoryBrushContainer,
} from 'victory-native';
import { Dimensions } from 'react-native';
let { width, height } = Dimensions.get('window');
import { PropTypes } from 'prop-types';
import { Svg, Text as SvgText, TSpan } from 'react-native-svg';
import victoryChart from 'victory-native/lib/components/victory-chart';
// 饼图
class PieChart extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	static = {
		data: PropTypes.array,
		centerNumber: PropTypes.number,
		centerTxt: PropTypes.string,
		colors: PropTypes.array,
		renderListItem: PropTypes.func,
		formatCenterNumber: PropTypes.func,
		formatPercent: PropTypes.func,
		formatNum: PropTypes.func,
		formatName: PropTypes.func,
		pieSize: PropTypes.number,
		innerRadius: PropTypes.number,
		hidePercent: PropTypes.bool,
		spaceHeight: PropTypes.number,
	};

	static defaultProps = {
		data: [],
		centerNumber: 0,
		colors: ['#0E95FF', '#FF9B39', '#24CB5E', '#FF6585', '#8B7BFF', '#02D2D8', '#607084', '#78C812', '#24CB5E', '#FF9B39', '#0E95FF', '#C34064', '#AA8064'],
		centerTxt: '',
		renderListItem: null,
		formatCenterNumber: null,
		formatPercent: null,
		formatNum: null,
		formatName: null,
		pieSize: 200,
		innerRadius: 64,
		hidePercent: false,
		spaceHeight: 0,
	};

	render() {
		let styles = this._styles();
		let txtList = [];
		let centerNumber = 0;
		let data = [];
		if (this.props.data) {
			data = this.props.data.map((p) => {
				if (!p.ignore) {
					centerNumber = centerNumber + p.num;
				}
				return p.num;
			});
		}
		if (centerNumber == 0) {
			data = [1];
		}
		if (this.props.centerNumber) {
			centerNumber = this.props.centerNumber;
		} else if (this.props.formatCenterNumber) {
			centerNumber = this.props.formatCenterNumber(centerNumber);
		} else {
			centerNumber = commonUtil.formatDecimal(centerNumber, 2);
		}
		let colors = this.props.colors;
		if (this.props.data) {
			for (let i = 0; i < this.props.data.length; i++) {
				let item = this.props.data[i];
				if (this.props.renderListItem) {
					txtList.push(
						<View style={[styles.item, { height: 20 }]} key={i}>
							<View style={[{ backgroundColor: `${colors[i % colors.length]}` }, styles.item_hd]}></View>
							{this.props.renderListItem(item)}
						</View>
					);
				} else {
					txtList.push(
						<View style={[styles.item, { height: 20 }]} key={i}>
							<View style={[{ backgroundColor: `${colors[i % colors.length]}` }, styles.item_hd]}></View>
							<Text style={styles.item_name}>{this.props.formatName ? this.props.formatName(item.name) : item.name}</Text>
							{!this.props.hidePercent && <Text style={styles.item_bd}>{this.props.formatPercent ? this.props.formatPercent(item.per) : item.per}</Text>}
							<Text style={styles.item_ft}>{this.props.formatNum ? this.props.formatNum(item.num) : item.num}</Text>
						</View>
					);
				}
			}
		}

		let pieSize = this.props.pieSize || 200;
		let innerRadius = this.props.innerRadius || 64;
		return (
			<View style={[styles.ViewContian, this.props.style]}>
				<View style={styles.picLeft}>
					<Svg width={pieSize} height={pieSize}>
						<VictoryPie
							colorScale={colors}
							standalone={false}
							width={pieSize}
							height={pieSize}
							padding={10}
							innerRadius={innerRadius}
							startAngle={-30}
							endAngle={420}
							labels={(d) => {}}
							data={data}
						/>
					</Svg>
					<View
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: pieSize,
							height: pieSize,
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Text style={[styles.centerPrice, { fontSize: commonUtil.formatTextSize(centerNumber, 8, 24) }]}>{centerNumber}</Text>
						<Text style={[styles.centerTxt]}>{this.props.centerTxt}</Text>
					</View>
				</View>
				<View style={[{ flex: 1 }, styles.fullContainer]}>
					<View style={[styles.items, { marginTop: this.props.spaceHeight }]}>{txtList}</View>
				</View>
			</View>
		);
	}
	_styles() {
		return {
			ViewContian: {
				// flexDirection: 'row',
				width: width,
				paddingLeft: 15,
				paddingRight: 15,
				alignItems: 'center',
			},
			picLeft: {
				//marginRight: 10
			},
			centerPrice: {
				color: '#212121',
				fontSize: 24,
			},
			centerTxt: {
				color: '#BDBDBD',
				fontSize: 10,
			},
			fullContainer: {
				width: width,
				paddingHorizontal: 18,
			},
			items: {
				flexDirection: 'column',
				//justifyContent: 'center',
				flex: 1,
			},
			item: {
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-around',
				marginTop: 6,
				marginBottom: 6,
			},
			item_hd: {
				marginRight: 4,
				width: 8,
				height: 8,
				borderRadius: 4,
			},
			item_name: {
				fontSize: 12,
				color: '#212121',
				flex: 4,
			},
			item_bd: {
				fontSize: 12,
				color: '#9E9E9E',
				textAlign: 'right',
				flex: 2,
			},
			item_ft: {
				fontSize: 12,
				color: '#212121',
				textAlign: 'right',
				flex: 3,
			},
		};
	}
}
// 柱状图
class BarChart extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	theme() {
		// let theme = this.theme();
		return {
			area: {
				style: {
					data: {
						fill: '#212121',
					},
				},
			},
			//里面的虚线。
			axis: {
				style: {
					axis: {
						fill: 'transparent',
						stroke: 'transparent',
						strokeWidth: 1,
					},

					grid: {
						fill: 'none',
						stroke: 'transparent',
						strokeDasharray: '6, 10',
						strokeLinecap: 'round',
						strokeLinejoin: 'round',
						pointerEvents: 'painted',
					},
					// "ticks": {
					//   "fill": "transparent",
					//   "size": 5,
					//   "stroke": "#90A4AE",
					//   "strokeWidth": 0,
					//   "strokeLinecap": "round",
					//   "strokeLinejoin": "round"
					// },
					//xy的标题文字
					tickLabels: {
						fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
						fontSize: 12,
						letterSpacing: 'normal',
						padding: 18,
						fill: '#9E9E9E',
						stroke: 'transparent',
						strokeWidth: 1,
					},
				},
			},
			//柱子顶部的字
			bar: {
				style: {
					data: {
						fill: '#455A64',
						padding: 8,
						strokeWidth: 0,
					},
					labels: {
						fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
						fontSize: 12,
						letterSpacing: 'normal',
						padding: 8,
						fill: '#455A64',
						stroke: 'transparent',
						strokeWidth: 0,
					},
				},
				width: 350,
				height: 350,
				padding: 50,
			},
			chart: {
				width: width,
				height: 250,
				padding: 40,
				paddingTop: 0,
			},
		};
	}
	static = {
		data: PropTypes.array,
	};

	static defaultProps = {
		data: [], //[{x:'',y:'',yTopName:''}] yName 是y轴显示的名称。
	};

	render() {
		//console.log('bar chart data ', this.props.data)

		let maxNumber = 0;
		if (this.props.data) {
			this.props.data.forEach((p) => {
				if (p.y > maxNumber) {
					maxNumber = p.y;
				}
			});
		}

		return (
			<View>
				<VictoryChart
					theme={this.theme()}
					domainPadding={{ x: [20, 0], y: [-10, 0] }}
					// maxDomain={{ y: maxNumber + (maxNumber / 5) }}
				>
					<VictoryBar
						alignment='middle'
						data={this.props.data}
						categories={{ x: this.props.data.map((p) => p.x) }}
						style={{
							data: { fill: '#0E95FF' },
							labels: { fill: '#0E95FF', fontSize: 10 },
						}}
						labels={(d) => d._y}
						labelComponent={<VictoryLabel text={(datum) => datum.yTopName} textAnchor={'middle'} />}
					/>
				</VictoryChart>
			</View>
		);
	}
}
export { PieChart, BarChart };
