// CustomText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ children, style, weight, ...props }) => {
  let fontFamily;

  switch (weight) {
    case 'bold':
      fontFamily = 'YourCustomFont-Bold';
      break;
    case 'light':
      fontFamily = 'YourCustomFont-Light';
      break;
    default:
      fontFamily = 'YourCustomFont-Regular';
  }

  return (
    <Text {...props} style={[{ fontFamily }, style]}>
      {children}
    </Text>
  );
};

export default CustomText;
