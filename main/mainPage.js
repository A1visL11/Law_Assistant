import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import InputBox from '../Components/InputBox';
import CustomButton from '../Components/Button';
import { fetchChatbaseResponse, titleGenerator } from '../chatbase/api_fetch';
import { colorList } from '../Components/colorList';
import * as Haptics from 'expo-haptics';
import Markdown from 'react-native-markdown-display';
import { useHeaderHeight } from '@react-navigation/elements';
import { debounce } from 'lodash';
import { createChatRoom, getRoomTitle, createMessage, fetchChatLog } from '../chatbase/chatFirebase';
import useAuth from '../hooks/useAuth';
import { TypingAnimation } from 'react-native-typing-animation';

const screen = Dimensions.get('window');

const ChatbaseComponent = ({ rooms, setRooms, setTitle, isNew, name, ...props }) => {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [ani,setAni] = useState(false);
  const scrollViewRef = useRef(null); 
  const inputRef = useRef(null);
  const KEYBOARD_VERTICAL_OFFSET = useHeaderHeight();
  const roomLen=Number(rooms[0].roomName)+1
  const handlePress = () => {
    if (msg.trim()) {
      const userMessage = { content: msg, userId:user , role: 'user' };
      setChatLog((prevChatLog) => [...prevChatLog, userMessage]);
      createMessage(name,user, userMessage);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setMsg('');
      if (inputRef.current) {
        inputRef.current.clear();
      }
      setAni(true);
      fetchChatbaseResponse((response) => {
        const botResponse = { content: response,userId:user, role: 'assistant' };
        setChatLog((prevChatLog) => [...prevChatLog, botResponse]);
        setAni(false);
        createMessage(name,user, botResponse);
      }, setError, chatLog.concat(userMessage));

    }
  };

  const generateTitle = async (msg) => {
    if (msg.trim()) {
      const title = (await titleGenerator(msg)).trim();
      const test = title.split('');
      console.log("Title of this page:", title);
      await Promise.all(test.map((content, index) => 
        new Promise(resolve => 
          setTimeout(() => {
            setTitle(index === 0 ? content : prev => prev + content);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
            resolve();
          }, index * 120)
        )
      ));
      
      createChatRoom(String(roomLen - 1), title, user);
      
      setRooms(prev => 
        prev.map((set, index) => index === 0
          ? { roomName: String(roomLen - 1),userId:user, roomTitle: title }
          : set
        )
      );
      setRooms(prev => [{ roomName: String(roomLen),userId:user, roomTitle: 'New' }, ...prev]);
      setTitle('New');
    }
  };

  useEffect(() => {
    const fetchChatLogData = async () => {
      if (name) {
        try {
          const chatlog = await fetchChatLog(name,user);
          console.log('inMAIN:', chatlog);
          setChatLog(chatlog);
        } catch (error) {
          console.error("Failed to fetch chat log:", error);
        }
      }
    };
    fetchChatLogData();
  }, [name]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chatLog]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollViewContent}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          >
            {chatLog.map((message, index) => (
              <View
                key={index}
                style={[
                  styles.messageContainer,
                  message.role === 'user'
                    ? styles.userMessageContainer
                    : styles.botMessageContainer,
                ]}
              >
                {message.role === 'user' ? (
                  <Text style={[styles.message, styles.userMessage]}>
                    {message.content}
                  </Text>
                ) : (
                  <Markdown style={markdownStyles}>
                    {message.content}
                  </Markdown>
                )}
              </View>
            ))}
            {ani&&
              <View
                style={[styles.animationContainer,styles.botMessageContainer]}
              >
                <TypingAnimation/>
              </View>
            }
            {error && <Text style={styles.error}>Error: {error}</Text>}
          </ScrollView>
          <View style={styles.boxandbutton}>
            <View style={styles.input}>
              <InputBox
                ref={inputRef}
                onChangeText={(text) => {
                  setMsg(text);
                }}
                value={msg}
              />
            </View>
            <CustomButton
              style={styles.sendButton}
              titleSize={35}
              titleColor={colorList.black}
              pack="Ionicon"
              icon={'send'}
              onPress={() => {
                handlePress();
                if (isNew) generateTitle(msg);
                // console.log(roomLen, currentName);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatbaseComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  messageContainer: {
    marginBottom: 10,
    maxWidth: '80%',
    // paddingTop: 5,
    paddingHorizontal: 10,
    // paddingBottom: 10,
    borderRadius: 10,
  },
  animationContainer:{
    paddingBottom: 30,
    paddingRight:15,
    paddingLeft:15,
    paddingTop:10,
    width: 60,
    borderRadius: 10,
  },
  userMessageContainer: {
    paddingVertical:10,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
  },
  botMessageContainer: {
    paddingVertical:0,
    alignSelf: 'flex-start',
    backgroundColor: 'white',
  },
  message: {
    fontSize: 16,
  },
  userMessage: {
    textAlign: 'left',
  },
  botMessage: {
    textAlign: 'left',
  },
  error: {
    fontSize: 16,
    color: '#ff0000',
  },
  sendButton: {
    justifyContent: 'center',
    marginRight: 10,
  },
  boxandbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#F5FCFF',
  },
  input: {
    flex: 1,
  },
});
const markdownStyles = {
  // heading1: {
  //   fontSize: 30,
  //   color: 'black',
  // },
  // heading2: {
  //   fontSize: 25,
  //   color: 'black',
  // },
  // heading3: {
  //   fontSize: 20,
  //   color: 'black',
  // },
  text: {
    fontSize: 16,
    color: 'black',
  },
  // strong: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // },
  // em: {
  //   fontSize: 16,
  //   fontStyle: 'italic',
  // },
};