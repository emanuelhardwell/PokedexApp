import {FC, useContext} from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';

interface PokeballBackgroundProps {
  style?: StyleProp<ImageStyle>;
}

export const PokeballBackground: FC<PokeballBackgroundProps> = ({style}) => {
  const {isDark} = useContext(ThemeContext);

  const image = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');

  return (
    <Image
      style={[{width: 300, height: 300, opacity: 0.3}, style]}
      source={image}
    />
  );
};
