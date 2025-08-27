import { moderateScale, scale, verticalScale } from './scaling';

const metrics = {
  // Font size
  fontSize: (size: number) => moderateScale(size),
  gap: (size: number) => moderateScale(size),

  // Margin
  margin: (size: number) => moderateScale(size),
  marginTop: (size: number) => scale(size),
  marginBottom: (size: number) => scale(size),
  marginLeft: (size: number) => scale(size),
  marginRight: (size: number) => scale(size),
  marginVertical: (size: number) => verticalScale(size),
  marginHorizontal: (size: number) => scale(size),

  // Padding
  padding: (size: number) => scale(size),
  paddingTop: (size: number) => scale(size),
  paddingBottom: (size: number) => scale(size),
  paddingLeft: (size: number) => scale(size),
  paddingRight: (size: number) => scale(size),
  paddingVertical: (size: number) => verticalScale(size),
  paddingHorizontal: (size: number) => scale(size),

  // Positioning
  bottom: (size: number) => verticalScale(size),
  left: (size: number) => scale(size),
  top: (size: number) => verticalScale(size),
  right: (size: number) => scale(size),

  // Border Radius
  borderRadius: (size: number) => moderateScale(size),
  borderWidth: (size: number) => moderateScale(size),

  // Height and Width
  height: (size: number) => verticalScale(size),
  width: (size: number) => moderateScale(size),
};

export default metrics;
