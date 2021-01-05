import { Platform, Dimensions } from 'react-native';
import color from '../../color';
const { width, height } = Dimensions.get('window');
export default {
    container: {
        position: 'absolute',
        bottom: Platform.OS === 'android' ? 20 : 0,
        left: 0,
        right: 0,
        backgroundColor: color.background
    },
    date_container: {
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: color.line,
    },
    date_tip_text: {
        fontSize: 12,
        color: color.placeholderText,

    },
    date_text: {
        fontSize: 18,
        color: color.mainText,
        //fontWeight: 'bold',
    },
    item_container: {
        padding: 16,
        paddingBottom: 6,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    datetype_button: {
        margin: 6,
        width: (width - 80) / 4,
        backgroundColor: color.bgLine,
        alignItems: 'center',
        justifyContent: 'center',
        height: 36,
        borderRadius: 3,
    },
    datetype_button_text: {
        fontSize: 14,
        color: color.mainText
    },
    datetype_button_selected: {
        backgroundColor: color.primary
    },
    datetype_button_text_selected: {
        color: '#FFFFFF'
    },
    button_container: {
        flexDirection: 'row',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_v_line: {
        width: 1,
        alignSelf: 'stretch',
        backgroundColor: color.line
    },
    button_cancel_text: {
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: 16,
        color: color.regularText,
    },
    button_ok_text: {
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: 16,
        color: color.primary
    },
    open_container: { 
        display: 'flex', 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 18, 
        paddingVertical: 4 ,
    },
    open_container_title: { 
        color: '#333', 
        fontSize: 14, 
        marginRight: 4 
    },
    open_container_tip: {
        paddingTop: 6,
        paddingHorizontal: 18,
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderBottomColor: color.line,
        fontSize: 12,
    }
}