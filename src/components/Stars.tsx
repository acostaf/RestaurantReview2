import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';

export const Stars = ({ rating }: { rating: number }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(Math.ceil(rating))].map((_, i) => (
        <Icon key={i} name={Math.floor(rating) > i ? 'star' : 'star-half'} color="#FFD64C" />
      ))}
    </View>
  );
};
