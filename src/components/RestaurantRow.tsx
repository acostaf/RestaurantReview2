import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Stars } from './Stars';

export const RestaurantRow = ({ place, index }: { place: any; index: number }) => {
    const navigation = useNavigation();

  const infoPressed = () => {
        navigation.navigate('Info', { place });
  };

  return (
    <View key={place.name} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' }}>
      <View style={[styles.row]}>
        <View style={styles.starts}>
          <Stars rating={place.rating} />
        </View>

        <View style={styles.nameAddress}>
          <Text>{place.name}</Text>
          <Text style={styles.addressText}>{place.address}</Text>
        </View>

        <View style={styles.edges}>
          <TouchableHighlight style={styles.button} underlayColor="#5398DC" onPress={infoPressed}>
            <Text style={styles.buttonText}>Info</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  edges: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    minWidth: 50,
  },
  nameAddress: {
    flexDirection: 'column',
    flex: 8,
  },
  addressText: {
    color: 'grey',
  },
  button: {
    borderWidth: 1,
    borderColor: '#0066CC',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#0066CC',
    fontSize: 12,
  },
  starts: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    minWidth: 50,
  },
});
