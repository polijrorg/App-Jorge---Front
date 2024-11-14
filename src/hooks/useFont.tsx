import * as Font from 'expo-font';

const useFonts = async () =>
  await Font.loadAsync({
    limelight: require('@assets/fonts/Poppins-Regular.ttf'),
    indie: require('@assets/fonts/Poppins-BoldItalic.ttf'),
  });

export default useFonts;