import ImageColors from 'react-native-image-colors';

const fallbackColor = 'gray';

export const getColorFromImage = async (image: string): Promise<string> => {
  const colors = await ImageColors.getColors(image, {fallback: fallbackColor});

  switch (colors.platform) {
    case 'android':
      return colors.dominant ?? fallbackColor;

    case 'ios':
      return colors.background ?? fallbackColor;

    default:
      return fallbackColor;
  }
};
