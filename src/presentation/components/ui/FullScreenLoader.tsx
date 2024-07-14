import {ActivityIndicator, View} from 'react-native';
import {useTheme} from 'react-native-paper';

export const FullScreenLoader = () => {
  // otra forma de sacar el tema actual
  const {colors} = useTheme();

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <ActivityIndicator size={75} />
    </View>
  );
};
