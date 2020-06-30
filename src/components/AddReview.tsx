import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AddReview = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const close = () => {
    navigation.goBack();
  };

  const submitReview = () => {
    setSubmitting(true);

    if (name) AsyncStorage.setItem('reviewer_name', name);

    fetch('http://192.168.0.63:3000/review', {
      method: 'POST',
      body: JSON.stringify({ name, rating, review }),
    })
      .then((response) => response.json())
      .then(() => {
        setSubmitting(true);
        navigation.goBack();
      })
      .catch(() => setSubmitting(true));
  };

  useEffect(() => {
    AsyncStorage.getItem('reviewer_name').then((nameFromStorage) => {
      if (nameFromStorage) setName(nameFromStorage);
    });
  }, []);

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#FFF', paddingTop: insets.top }}>
      <View style={styles.root}>
        <TouchableOpacity style={styles.button} onPress={close}>
          <Icon name="close" size={30} color="#0066CC" />
        </TouchableOpacity>

        <Text style={styles.addReview}>Add Review</Text>

        <TextInput
          style={styles.input}
          placeholder="Name (optional)"
          value={name}
          onChangeText={(name) => setName(name)}
        />

        <Text style={styles.rating}>Your Rating:</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((i) => {
            return (
              <TouchableOpacity onPress={() => setRating(i)} style={styles.starButton} key={i}>
                <Icon name={'star'} color={rating >= i ? '#FFD64C' : '#CCCCCC'} size={40} />
              </TouchableOpacity>
            );
          })}
        </View>

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Review"
          value={review}
          onChangeText={(review) => setReview(review)}
          multiline={true}
          numberOfLines={5}
        />

        {submitting && <ActivityIndicator size="large" color="#0066CC" style={{ padding: 10 }} />}

        <TouchableOpacity style={styles.submitButton} onPress={submitReview} disabled={submitting}>
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  button: {
    paddingHorizontal: 10,
  },
  addReview: {
    fontSize: 25,
    color: '#444',
    textAlign: 'center',
    margin: 20,
  },
  input: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
    textAlignVertical: 'top',
  },
  rating: {
    fontSize: 20,
    color: 'grey',
    textAlign: 'center',
    marginVertical: 40,
  },
  stars: {
    marginBottom: 80,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starButton: {
    padding: 5,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0066cc',
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
});
