import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {GlobalStyles} from '../../styles/globalStyles';

export default function CustomButton({title, onPress, loading, disabled}) {
  return (
    <TouchableOpacity
      style={GlobalStyles.button}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? <ActivityIndicator color="white" /> : <Text style={GlobalStyles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
}