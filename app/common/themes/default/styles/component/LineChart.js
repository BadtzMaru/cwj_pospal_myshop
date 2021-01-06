
import { Dimensions } from 'react-native';
import color from '../../color';
let { width, height } = Dimensions.get('window');

export default {
    primaryColor: color.primary,
    bgLine: color.bgLine,
    xLabelColor: color.placeholderText,
    xLabelActiveColor: color.regularText,
    xLabelHeight: 30,
    paddingX: 15,
    paddingY: 50,
}