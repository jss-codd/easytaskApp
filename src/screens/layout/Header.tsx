import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../Icons/BackIcon';
import metrics from '../../constants/metrics';
import Colors from '../../constants/color';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getProfile } from '../../store/slices/authSlice';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  title: string;
  showBack?: boolean;
  profileImage?: boolean;
  onRightPress?: () => void;
};
const Header: React.FC<Props> = ({
  title,
  showBack = false,
  onRightPress,
  profileImage = true,
}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state: any) => state.authReducer);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity
          style={styles.left}
          onPress={() => navigation.goBack()}
        >
          <BackIcon size={25} color={'#fff'} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
    // <LinearGradient
    //   colors={[Colors.MAIN_COLOR, '#5B7BFF', '#7A9AFF']}
    //   start={{ x: 0, y: 0 }}
    //   end={{ x: 1, y: 1 }}
    //   style={styles.container}
    // >
    // {showBack && (
    //   <TouchableOpacity
    //     style={styles.left}
    //     onPress={() => navigation.goBack()}
    //   >
    //     <BackIcon size={25} color={'#fff'} />
    //   </TouchableOpacity>
    // )} 


    // <Text style={styles.title}>{title}</Text>
    // </LinearGradient>



  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    height: metrics.height(55),
    backgroundColor: Colors.MAIN_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_BACKGROUND,
    justifyContent: 'center',
  },
  left: {
    position: 'absolute',
    left: metrics.paddingHorizontal(16),
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  right: {
    position: 'absolute',
    right: metrics.paddingHorizontal(16),
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: metrics.fontSize(18),
    fontWeight: '600',
    color: Colors.WHITE,
    textAlign: 'center',
  },
  profileImage: {
    width: metrics.width(35),
    height: metrics.width(35),
    borderRadius: metrics.width(18),
    borderWidth: 1,
    borderColor: '#fff',
  },
});

// import React, { useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import BackIcon from '../../Icons/BackIcon';
// import metrics from '../../constants/metrics';
// import Colors from '../../constants/color';
// import { useAppDispatch, useAppSelector } from '../../store/store';
// import { getProfile } from '../../store/slices/authSlice';

// type Props = {
//   title: string;
//   showBack?: boolean;
//   profileImage?: boolean;
//   onRightPress?: () => void;
// };

// const Header: React.FC<Props> = ({ title, showBack = false, onRightPress,profileImage=false }) => {
//   const navigation = useNavigation();
//   const dispatch = useAppDispatch();
//   const { profile } = useAppSelector((state: any) => state.authReducer);

//   useEffect(() => {
//     dispatch(getProfile());
//   }, [dispatch]);

//   return (
//     <View style={styles.container}>
//       {/* Left Section */}
//       <View style={styles.left}>
//         {showBack && (
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <BackIcon size={25} color={'#fff'} />
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Title */}
//       <Text style={styles.title}>{title}</Text>

//       {/* Right Section - Profile Photo */}
//       {profileImage && (
//       <View style={styles.right}>
//         {profile?.photo ? (
//           <TouchableOpacity onPress={onRightPress}>
//             <Image
//               source={{ uri: profile.photo }} // Make sure `profile.photo` contains full URL
//               style={styles.profileImage}
//             />
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity onPress={onRightPress}>
//             <Image
//              source={{
//               uri: `https://ui-avatars.com/api/?name=${
//                 profile.name
//               }&background=random`,
//             }}
//               style={styles.profileImage}
//             />
//           </TouchableOpacity>
//         )}
//         <Text style={styles.role}>{profile?.role}</Text>
//       </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: metrics.height(55),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: Colors.MAIN_COLOR,
//     paddingHorizontal: metrics.paddingHorizontal(16),
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.LIGHT_BACKGROUND,
//   },
//   left: {
//     width: metrics.width(40),
//     alignItems: 'flex-start',
//   },
//   right: {
//     width: metrics.width(45),
//     alignItems: 'flex-end',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: metrics.fontSize(18),
//     fontWeight: '600',
//     color: Colors.WHITE,
//   },
//   profileImage: {
//     marginTop: metrics.height(5),
//     width: metrics.width(35),
//     height: metrics.width(35),
//     borderRadius: metrics.width(18),
//     borderWidth: 1,
//     borderColor: '#fff',
//   },
//   role: {
//     fontSize: metrics.fontSize(10),
//     color: Colors.WHITE,
//     fontWeight: 'bold',
//     flex:1,
//     // marginTop: metrics.height(10),
//     textAlign: 'center',
//   },
// });

// export default Header;
