import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

const Home = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>Your Limo at Service</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          label="Type Here"
          style={styles.textInput}
          value={text}
          onChangeText={text => setText(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24242e',
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    justifyContent: 'flex-start',
  },
  inputContainer: {
    justifyContent: 'flex-end',
  },
  textInput: {
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    margin: 5,
    width: '80%',
    marginBottom: 10,
  },
});

export default Home;
