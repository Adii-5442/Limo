import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Wave } from 'react-native-animated-spinkit';



const GEMINI_API_KEY = 'AIzaSyBTYU40ZurVNGA_c1wN8gQywiy3lFCVByE';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

const dummy = [
  {
    id: '1',
    user: 'model',
    messsage: 'Hey Welcome!',
    time: new Date(),
  },
  {
    id: '2',
    user: 'user',
    messsage: 'Hey Thnaks! can u answer few questions on mine',
    time: new Date(),
  },
  {
    id: '3',
    user: 'model',
    messsage: 'Y sure!, go on',
    time: new Date(),
  },
];


const Home = () => {
  const [inputText, setInputText] = useState<string>('');
  const [micActive, setmicActive] = useState<true | false>(false);
  const [showMic, setshowMic] = useState<true | false>(true);
  const [AILoader, setAILoader] = useState<boolean>(false)

  const [isListening, setisListening] = useState(false);
  const [RecognizedSpeech, setRecognizedSpeech] = useState('');

  const [messages, setMessages] = useState(dummy)

  const sendMessage = async (inputText: string) => {

    setInputText('');



    setMessages(prevMessage => [
      ...prevMessage,
      {
        id: (prevMessage.length + 1).toString(),
        user: 'user',
        messsage: inputText,
        time: new Date(),
      },
    ]);
    await getResponse(inputText).then(() => {
      setAILoader(false)
    })



  };
  const getResponse = async (inputText: string) => {
    try {
      setAILoader(true);
      const model = genAI.getGenerativeModel({model: 'gemini-pro'});
      const result = await model.generateContent(inputText);
      const response = await result.response;
      const text = response.text();
      setMessages(prevMessage => [
        ...prevMessage,
        {
          id: (prevMessage.length + 1).toString(),
          user: 'model',
          messsage: text,
          time: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setAILoader(false);
    }

  }






  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = stopListening;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = error => {
      console.log('onSpeechError', error);
      setisListening(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      setisListening(false);
    };
  }, []);

  const onSpeechStart = (event: any) => {
    console.log('Recording Started ...', event);
  };

  const onSpeechResults = (event: any) => {
    const text = event.value[0];
    console.log('Results', text);

    setRecognizedSpeech(text);
    setInputText(text);
    if (text.length > 0) {
      setshowMic(false);
    }
  };

  const startListening = async () => {
    setisListening(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log('Yo');
    }
  };

  const stopListening = async () => {
    setisListening(false);
    try {
      Voice.removeAllListeners();
      await Voice.stop();
    } catch (error) {
      console.log('Got errors in StopListening', error);
    }
  };

  const handleTextChange = (text: string) => {
    if (text.length === 0) {
      setshowMic(true);
    } else {
      setshowMic(false);
    }
    setInputText(text);
  };

  const handleMicPress = () => {
    setmicActive(!micActive);
  };
  const renderMessageItem = ({ item, index }) => {


    if (item.user === 'user') {
      return (
        <View
          style={{
            // backgroundColor: '#0078fe',
            borderWidth: 1.5,
            borderColor: '#797d7a',
            padding: 10,
            marginLeft: '45%',
            borderRadius: 15,
            marginTop: '5%',
            marginRight: '5%',
            maxWidth: '80%',
            alignSelf: 'flex-end',
          }}
          key={index}>
          <Text selectable={true} style={{fontSize: 16, color: '#fff'}} key={index}>
            {' '}
            {item.messsage}
          </Text>
        </View>
      );
    }else if (item.user === 'user' && index === messages.length - 1 && AILoader) {
      return (
        <View style={{marginLeft: '5%'}}>
          <Wave size={50} color="#018280" />
        </View>
      );
    } else {
      return (
        <View
          style={{
            //backgroundColor: '#dedede',
            borderWidth: 1.5,
            borderColor: '#018280',
            padding: 10,
            marginTop: '5%',
            marginLeft: '5%',
            maxWidth: '80%',
            alignSelf: 'flex-start',
            borderRadius: 15,
          }}
          key={index}>
          <Text
            selectable={true}
            style={{fontSize: 16, color: '#fff', justifyContent: 'center'}}
            key={index}>
            {' '}
            {item.messsage}
          </Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.menuButton}>
          <Image
            style={styles.menuIcon}
            source={require('../assets/menu1.png')}
          />
        </TouchableOpacity>
        <Text style={styles.logoText}>L I M O</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Image
            style={styles.menuIcon}
            source={require('../assets/threeDotMenu.png')}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        style={{marginTop:'5%'}}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
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
            multiline={true}
            underlineColorAndroid={'transparent'}
            onChangeText={text => handleTextChange(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                showMic?
                  isListening ? stopListening() : startListening()
                  :
                  sendMessage(inputText)
              }}
              style={styles.micButton}>
              <Image
                style={styles.micIcon}
                source={
                  showMic
                    ? isListening
                      ? require('../assets/micActive.png')
                      : require('../assets/micInactive.png')
                    : require('../assets/send.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.galleryButton}>
              <Image
                style={styles.galleryIcon}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Center vertically
    marginTop: '5%',
  },
  menuButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  menuIcon: {
    height: 35,
    width: 35,
  },
  logoText: {
    fontSize: 25,
    fontWeight: '700',
    color: 'white',
  },
  rightArrow: {
  position: "absolute",
  backgroundColor: "#0078fe",
  //backgroundColor:"red",
  width: 20,
  height: 25,
  bottom: 0,
  borderBottomLeftRadius: 25,
  right: -10
},

rightArrowOverlap: {
  position: "absolute",
  backgroundColor: "#eeeeee",
  //backgroundColor:"green",
  width: 20,
  height: 35,
  bottom: -6,
  borderBottomLeftRadius: 18,
  right: -20

},

/*Arrow head for recevied messages*/
leftArrow: {
    position: "absolute",
    backgroundColor: "#dedede",
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10
},

leftArrowOverlap: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20

},
  buttonContainer: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  micButton: {
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },
  micIcon: {
    height: 35,
    width: 35,
  },
  galleryButton: {
    borderRadius: 20,
    marginBottom: 10,
    marginLeft: '3%',
    alignSelf: 'center',
  },
  galleryIcon: {
    height: 35,
    width: 35,
  },
  inputContainer: {
    justifyContent: 'flex-end',
  },
  inputRow: {
    flexDirection: 'row',
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
