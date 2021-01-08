import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ImageBackground, InteractionManager, ScrollView, Dimensions, Platform } from 'react-native';
import Component from '../component/baseComponent';
import LoadingView from '../component/LoadingView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Toast from '../component/Toast';
import httpUtil from './httpUtil';
import config from './config';
import storageUtil from './storageUtil';
import AnalyticsUtil from '../component/umeng/AnalyticsUtil';
import commonUtil from './commonUtil';
import Container from '../component/Container';
import PullRefreshScrollView from '../component/PullRefreshScrollView';
import ScrollableTabView from '../component/CustomScrollableTabView';
import LineChart from '../component/LineChart';
import ToggleSwitch from './../component/ToggleSwitch';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

export {
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
	AnalyticsUtil,
	commonUtil,
	Alert,
	Container,
	PullRefreshScrollView,
	ImageBackground,
	InteractionManager,
	ScrollableTabView,
	LineChart,
	ScrollView,
	Dimensions,
	Platform,
	ToggleSwitch,
	RCTDeviceEventEmitter,
};
