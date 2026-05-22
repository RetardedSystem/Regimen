import React, { ReactNode } from 'react';
import {
    ImageBackground,
    ImageSourcePropType,
    StyleSheet,
    View,
} from 'react-native';

type Props = {
  image: ImageSourcePropType;
  children: ReactNode;
};

const ScreenBackground = ({
  image,
  children,
}: Props) => {
  return (
    <ImageBackground
      source={image}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {children}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    flex: 1,
  },
});

export default ScreenBackground;