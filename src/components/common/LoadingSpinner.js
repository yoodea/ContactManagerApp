import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {GlobalStyles, Colors} from '../../styles/globalStyles';
export default () => (
  <View style={[GlobalStyles.container, GlobalStyles.centered]}>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
);