import { Dimensions } from 'react-native';
import color from '../../color';
let { width, height } = Dimensions.get('window');

export default {
    container: {
        marginTop: 0
    },
    tabBarUnderline: {
        backgroundColor: color.primary,
        height: 2,      
    },
    tabBarText: {
        fontSize: 14,
        fontFamily: 'PingFangSC-Regular',
        paddingBottom: 0
    },
    scrollableTabBar: {
        backgroundColor: color.background,
        paddingTop: 0,
        width: width,
        borderBottomColor: color.bgLine,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarUnderlineWidth: 32,
    tabBarActiveTextColor: color.mainText,
    tabBarInactiveTextColor: color.secondaryText,
}

export let tpml1 = {
    container: {
        marginTop: 0,
        width:200,
    },
    tabBarUnderline: {
        backgroundColor: color.primary,
        height: 2,  
        width:32,   
        alignItems: 'center', 
        justifyContent: 'center',
    },
    tabBarText: {
        fontSize: 14,
        fontFamily: 'PingFangSC-Regular',
        paddingBottom: 0
    },
    scrollableTabBar: {
        // backgroundColor: '#9E9E9E',
        paddingTop: 0,
        borderBottomWidth: 0,
        width:250,
        alignItems: 'center',
        // justifyContent: 'flex-start',
    },
    tabBarUnderlineStyle:{
        width:32,
    },
    tabBarUnderlineWidth: 32,
    tabBarActiveTextColor: color.mainText,
    tabBarInactiveTextColor: color.secondaryText,
}