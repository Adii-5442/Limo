import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const Home = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'column', flex: 0.09}}>
        <View style={styles.headerContainer}>
          <Image
            style={{height: 35, width: 35, margin: 10}}
            source={require('../assets/menu.png')}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: 'white',
              marginTop: 15,
            }}>
            Limooo
          </Text>
          <Image
            style={{height: 35, width: 35, margin: 10}}
            source={require('../assets/threeDot.png')}
          />
        </View>
        <View style={styles.line} />
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
  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',

    alignItems: 'center', // Center vertically
  },
  line: {
    backgroundColor: 'grey',
    height: 2,
    alignSelf: 'stretch', // Take full width
      marginHorizontal: 10, // Adjust the margin as needed
      marginVertical: 10,
    borderRadius:50,
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
