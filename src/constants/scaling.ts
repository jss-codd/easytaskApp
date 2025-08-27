import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
 
// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
 
// Define scale functions with type annotations
const scale = (size: number): number => {
    return (width / guidelineBaseWidth) * size;
};
 
const verticalScale = (size: number): number => {
    return (height / guidelineBaseHeight) * size;
};
 
const moderateScale = (size: number, factor: number = 0.5): number => {
    return size + (scale(size) - size) * factor;
};
 
export {scale, verticalScale, moderateScale};