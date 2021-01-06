import React, { Component } from 'react';
import { ScrollView, PanResponder, Dimensions } from 'react-native';
import Svg, { Path, Text, Circle, Line, Rect } from 'react-native-svg';
import commonUtil from '../common/commonUtil';
var d3 = require('d3');

export default class LineChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: this.props.data && this.props.data.length > 0 ? this.props.data.length - 1 : null,
			chartWidth: this.props.data.length > 7 ? this.props.width + (this.props.data.length - 7) * 50 : this.props.width || 300,
		};
	}

	static defaultProps = {
		data: [],
		width: Dimensions.get('window').width,
		height: 200,
		top: 0,
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.data != this.props.data) {
			this.setState({ chartWidth: nextProps.data.length > 7 ? this.props.width + (nextProps.data.length - 7) * 50 : this.props.width });
		}
	}

	bgline(data, styles) {
		let lines = [];
		let dY = (this.props.height - styles.xLabelHeight) / 4;
		for (let i = 0; i < 5; i++) {
			lines.push(<Line key={`L_${i}`} x1={0} y1={i * dY} x2={this.state.chartWidth} y2={i * dY} stroke={styles.bgLine} strokeWidth={1} />);
		}
		return lines;
	}

	areas(data, styles) {
		var returnValue = (d) => d.value;
		var x = d3
			.scaleLinear()
			.domain([0, data.length - 1])
			.range([styles.paddingX, this.state.chartWidth - styles.paddingX]);
		let maxY = d3.max(data, returnValue);
		maxY = maxY || 1;
		var y = d3
			.scaleLinear()
			.domain([maxY, d3.min(data, returnValue)])
			.range([styles.paddingY - 15, this.props.height - styles.paddingY]);
		let y1 = this.props.height - styles.xLabelHeight;
		var area = d3
			.area()
			.x(function (d, i) {
				return x(i);
			})
			.y(function (d) {
				return y(d.value);
			})
			.y1(function (d) {
				return y1;
			});

		return <Path fill={styles.primaryColor} fillOpacity={0.1} d={area(data)} />;
	}

	paths(data, styles) {
		var returnValue = (d) => d.value;
		var x = d3
			.scaleLinear()
			.domain([0, data.length - 1])
			.range([styles.paddingX, this.state.chartWidth - styles.paddingX]);
		let maxY = d3.max(data, returnValue);
		maxY = maxY || 1;
		var y = d3
			.scaleLinear()
			.domain([maxY, d3.min(data, returnValue)])
			.range([styles.paddingY - 15, this.props.height - styles.paddingY]);
		var line = d3
			.line()
			.x(function (d, i) {
				return x(i);
			})
			.y(function (d) {
				return y(d.value);
			});
		return <Path fill='none' stroke={styles.primaryColor} strokeWidth={2} strokeMiterlimit={10} d={line(data)} />;
	}

	points(data, styles) {
		var returnValue = (d) => d.value;
		var x = d3
			.scaleLinear()
			.domain([0, this.props.data.length - 1])
			.range([styles.paddingX, this.state.chartWidth - styles.paddingX]);
		var y = d3
			.scaleLinear()
			.domain([d3.max(data, returnValue), d3.min(data, returnValue)])
			.range([styles.paddingY - 15, this.props.height - styles.paddingY]);
		var paths = [];
		data.map((point, _index) => {
			var cx = x(_index) + '';
			var cy = y(point.value) + '';

			if (this.state.selectedIndex == _index) {
				paths.push(
					<Line key={-1} x1={cx} y1={0} x2={cx} y2={this.props.height - styles.xLabelHeight} stroke={styles.primaryColor} strokeOpacity={'0.2'} strokeWidth={1} />
				);

				paths.push(<Circle key={_index} cx={cx} cy={cy} r={4} fill={'#FFF'} strokeWidth={2} stroke={styles.primaryColor} />);

				paths.push(<Rect key={-4} x={cx - 30} y={cy - 33} rx={11} ry={11} width={65} height={22} fill={styles.primaryColor} />);

				paths.push(
					<Text key={-3} fill={'#FFF'} strokeWidth={0} fontSize={11} fontWeight={'normal'} x={cx} y={cy - 18} textAnchor={'middle'}>
						{point.displayValue}
					</Text>
				);
			} else {
				paths.push(
					<Circle
						key={_index + 'T'}
						cx={cx}
						cy={cy}
						r={21}
						fill={'#ffffff01'}
						onPress={() => {
							this.setState({ selectedIndex: _index });
							if (this.props.onSelectIndexChange) {
								this.props.onSelectIndexChange(_index);
							}
						}}
					/>
				);
			}
		});

		return paths;
	}

	labels(data, styles) {
		try {
			var x = d3
				.scaleLinear()
				.domain([0, this.props.data.length - 1])
				.range([styles.paddingX, this.state.chartWidth - styles.paddingX]);
			var paths = [];
			data.map((point, _index) => {
				var cx = x(_index);
				paths.push(
					<Text
						key={'LT' + _index} // 上下两个_index相同 会报wranning
						fill={this.state.selectedIndex == _index ? styles.xLabelActiveColor : styles.xLabelColor}
						strokeWidth={0}
						fontSize='12'
						fontWeight={this.state.selectedIndex == _index ? 'bold' : 'normal'}
						x={cx}
						y={this.props.height - 15}
						textAnchor='middle'
						onPress={() => {
							this.setState({ selectedIndex: _index });
							if (this.props.onSelectIndexChange) {
								this.props.onSelectIndexChange(_index);
							}
						}}>
						{point.xLabel}
					</Text>
				);
				paths.push(
					<Text
						key={'lt' + _index}
						fill={this.state.selectedIndex == _index ? styles.xLabelActiveColor : styles.xLabelColor}
						strokeWidth={0}
						fontSize='8'
						fontWeight={this.state.selectedIndex == _index ? 'bold' : 'normal'}
						x={cx}
						y={this.props.height - 3}
						textAnchor='middle'
						onPress={() => {
							this.setState({ selectedIndex: _index });
							if (this.props.onSelectIndexChange) {
								this.props.onSelectIndexChange(_index);
							}
						}}>
						{point.xLabel2}
					</Text>
				);
			});

			return paths;
		} catch (error) {}
	}

	render() {
		let theme = commonUtil.getTheme();
		let styles = theme.style.component.LineChart;
		let { chartWidth, selectedIndex } = this.state;
		let { data, width } = this.props;
		let scorllX = 0;
		if (data.length > 7) {
			if (selectedIndex) {
				scorllX = (selectedIndex + 1 - 7) * 50;
			} else {
				scorllX = chartWidth - width - 15;
			}
		}
		return (
			<ScrollView
				style={[this.props.style, { width: this.props.width }]}
				ref='chartView'
				automaticallyAdjustContentInsets={false}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				onContentSizeChange={(e) => {
					this.refs.chartView.scrollTo({ animated: false, x: scorllX, y: 0 });
				}}>
				{data != null && data.length > 0 ? (
					<Svg
						width={chartWidth}
						height={this.props.height}
						forceUpdate='0'
						style={{
							width: chartWidth,
							height: this.props.height,
						}}>
						{this.bgline(data, styles)}
						{this.areas(data, styles)}
						{this.paths(data, styles)}
						{this.points(data, styles)}
						{this.labels(data, styles)}
					</Svg>
				) : null}
			</ScrollView>
		);
	}
}
