import React, {useState} from 'react';
import {View,TextInput, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Home = () => {
  const [inputText, setInputText] = useState<string>('');
  const [micActive, setmicActive] = useState<true | false>(false)
  const [showMic, setshowMic] = useState<true|false>(true)

  const handleTextChange = (text:string) => {
    if (text.length == 0) {

      setshowMic(true)
    } else {
      setshowMic(false)
    }
    setInputText(text);

  }


  const handleMicPress = () => {
    setmicActive(!micActive)
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'column', flex: 0.09}}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 5,
              marginTop: '5%',
            }}>
            <Image
              style={{
                height: 35,
                width: 35,
              }}
              source={require('../assets/menu1.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: 'white',
              marginTop: '5%',
            }}>
            L I M O
          </Text>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 5,
              marginTop: '5%',
            }}>
            <Image
              style={{height: 35, width: 35}}
              source={require('../assets/threeDotMenu.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            placeholder='Type Here'
            textBreakStrategy='balanced'
            placeholderTextColor={'grey'}
            style={styles.textInput}
            value={inputText}
            textAlignVertical="top"
            autoFocus={true}
            // numberOfLines={4}
            multiline={true}
            underlineColorAndroid={'transparent'}
            onChangeText={(text)=>handleTextChange(text)}/>
          <TouchableOpacity
            onPress={handleMicPress}
            style={{
              borderRadius: 20,
              marginBottom: 10,
              alignSelf: 'center',
            }}>
            <Image
              style={{height: 35, width: 35}}
              source={
                showMic?
                  micActive
                  ? require('../assets/micActive2.png')
                    : require('../assets/micInactive.png') :
                  require('../assets/send.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 20,
              marginBottom: 10,
              marginLeft: 5,
              alignSelf: 'center',
            }}>
            <Image
              style={{height: 35, width: 35}}
              source={require('../assets/gallery.png')}
            />
          </TouchableOpacity>
        </View>
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
      marginHorizontal: 10, // Adjuset the margin as needed
      marginVertical: 10,
    borderRadius:50,
  },
  inputContainer: {
    justifyContent: 'flex-end',
  },
  textInput: {
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    color: 'black',
    borderWidth: 1.5,
    borderColor:'cyan',
    paddingHorizontal: 10,
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontWeight: '500',
    fontSize:15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    margin: 5,
    width: '75%',
    marginBottom: 10,
  },
});

export default Home;
