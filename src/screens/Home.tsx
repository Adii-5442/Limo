import React, {useEffect, useState} from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Voice from '@react-native-voice/voice'

const Home = () => {
  const [inputText, setInputText] = useState<string>('');
  const [micActive, setmicActive] = useState<true | false>(false)
  const [showMic, setshowMic] = useState<true | false>(true)

  const [isListening, setisListening] = useState(false)
  const [messages, setmessages] = useState([])
  const [RecognizedSpeech, setRecognizedSpeech] = useState('')

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = stopListening;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = error => {
      console.log('onSpeechError', error);
      setisListening(false)

    }


    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
      setisListening(false)
    }
  }, [])
  const onSpeechStart = (event:any) => {
    console.log("Recording Started ...",event)

  }
  const onSpeechResults = (event: any) => {
    const text = event.value[0];
    console.log("Results", text)

    setRecognizedSpeech(text)
    setInputText(text)
    if (text.length > 0) {
      setshowMic(false)
    }


  }

  const startListening = async() => {
    setisListening(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log("Yo")
    }
  }

  const stopListening = async () => {
    setisListening(false);
    try {
      Voice.removeAllListeners();
      await Voice.stop()

    } catch (error) {
      console.log("Got errors in StopListening", error)


    }

  }

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
              fontSize: 25,
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
            placeholder={
              isListening ? 'Listening .......' : 'Start Typing Here'
            }
            textBreakStrategy="balanced"
            placeholderTextColor={isListening ? '#018280' : 'grey'}
            style={styles.textInput}
            value={inputText}
            textAlignVertical="top"
            autoFocus={true}
            // numberOfLines={4}
            multiline={true}
            underlineColorAndroid={'transparent'}
            onChangeText={text => handleTextChange(text)}
          />
          <View style={{flexDirection:'row',alignContent:'space-between',justifyContent:'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                isListening ? stopListening() : startListening();
              }}
              style={{
                borderRadius: 20,
                marginBottom: 10,
                alignSelf: 'center',
              }}>
              <Image
                style={{height: 35, width: 35}}
                source={
                  showMic
                    ? isListening
                      ? require('../assets/micActive.png')
                      : require('../assets/micInactive.png')
                    : require('../assets/send.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                marginBottom: 10,
                marginLeft: '3%',
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
    borderRadius: 50,
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
    borderColor: '#018280',
    paddingHorizontal: 10,
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontWeight: '500',
    fontSize: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    margin: 5,
    width: '75%',
    marginBottom: 10,
  },
});

export default Home;
