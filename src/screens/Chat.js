import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import MessageBubble from '../components/message/messageBubble';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import io from 'socket.io-client';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {
  get_message_all,
  get_message_personal,
  post_message,
} from '../redux/actions/message';

import API from '../config/API';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import moment from 'moment';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      content: '',
      isLoading: true,
    };
  }

  submitChat() {
     this.socket = io(`${API.serveURL}`);
    //  this.socket.on('message', (msg) => {
    //    this.setState({
    //      messages: [...this.state.messages, msg],
    //    });
    //  });
    console.log(this.props, 'h');
    const data = {
      sender_id: this.props.auth.data.user_id,
      receiver_id: this.props.route.params.receiver_id,
      content: this.state.content,
    };
     AsyncStorage.getItem('token', (error, result) => {
      axios({
        method: 'POST',
        url: `${API.baseURL}/messages`,
        headers: {
          Authorization: result,
        },
      })
        .then(function (response) {
          console.log(response);
          // this.socket.emit('chat-message', {data: 'msgg'});
           this.socket.emit('chat-message', {data: 'hai sinta'});
          //  this.setState(
          //    {
          //      messages: res.value.data.data,
          //    },
          //    () => {
          //      console.log(this.state.messages, 'keyyyyyy');
          //    },
          //  );
        })
        .catch(function (error) {
          console.log(error, 'er');
        });
    });
  }

  // getAllChat = () => {
  //   console.log(this.props.route.params, 'props')
  //   this.socket = io(`${API.serveURL}`);
  //   this.socket.on('message', (msg) => {
  //     this.setState({
  //       messages: [...this.state.messages, msg],
  //     });
  //   });
  //   AsyncStorage.getItem('token', (error, result) => {
  //     const id = this.props.auth.data.user_id;
  //     this.props.get_message_all(id, result)
  //       .then((res) => {
  //         this.setState({
  //           isLoading: false,
  //         });
  //         console.log(res, 'res');
  //         this.socket.emit('chat-message', {data: 'hai sinta'});
  //         this.setState(
  //           {
  //             messages: res.data.data,
  //           },
  //           () => {
  //             console.log(this.state.messages, 'key');
  //           },
  //         );
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  // };

  getPersonalChat = () => {
    this.socket = io(`${API.serveURL}`);
    this.socket.on('message', (msg) => {
      this.setState({
        messages: [...this.state.messages, msg],
      });
    });
    AsyncStorage.getItem('token', (error, result) => {
      // console.log(this.state.messages, 'msg2');
      const sender_id = this.props.route.params.sender_id;
      const receiver_id = this.props.route.params.receiver_id;
      this.props
        .get_message_personal(sender_id, receiver_id, result)
        .then((res) => {
          console.log(res, 'ressss');
          this.setState({
            isLoading: false,
          });
          this.socket.emit('chat-message', {data: 'hai sinta'});
          this.setState(
            {
              messages: res.value.data.data,
            },
            () => {
              console.log(this.state.messages, 'keyyyyyy');
            },
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  componentDidMount() {
    //  this.getAllChat()
    this.getPersonalChat();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <>
          <ActivityIndicator
            animating={true}
            color="white"
            size="large"
            style={{margin: 15}}
          />

          <Text style={{textAlign: 'center'}}>Loading... </Text>
        </>
      );
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require('../assets/image/687243.jpg')}
            style={styles.img}>
            <ScrollView>
              <SafeAreaView>
                <View style={styles.header}>
                  {this.state.messages.map((data) => {
                    const time = moment(
                      data.created_at || moment.now(),
                    ).fromNow();
                    if (data.sender_id == this.props.auth.data.user_id) {
                      return (
                        <View>
                          {/* <Image
                          style={{width: 30, height: 30}}
                          source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                          }}
                        /> */}
                          <MessageBubble
                            key={data.message_id}
                            mine
                            text={data.content}
                            times={time}
                          />
                          {/* <Text>{time}</Text> */}
                        </View>
                      );
                    } else {
                      return (
                        <View>
                          <MessageBubble text={data.content} times={time} />
                        </View>
                      );
                    }
                  })}
                </View>
                <View style={styles.footer}>
                  <TextInput
                    style={styles.textBox}
                    value={this.state.content}
                    onChangeText={(text) => {
                      this.setState({content: text});
                    }}
                  />
                  {/* <TouchableHighlight style={styles.sendButton}> */}
                  <Button
                    onPress={() => this.submitChat()}
                    mode="contained"
                    style={{color: 'white'}}>
                    Send
                  </Button>
                  {/* </TouchableHighlight> */}
                </View>
                <KeyboardSpacer />
              </SafeAreaView>
            </ScrollView>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  img: {
    width: 360,
    height: 640,
  },
  header: {
    flex: 3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 3,
    // position: 'absolute',
    bottom: 0,
    flex: 1,
  },
  textBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    height: 40,
    borderColor: '#dddddd',
    backgroundColor: '#ffffff',
    // fontSize: 16,
    paddingHorizontal: 5,
  },
  sendButton: {
    justifyContent: 'center',
    fontSize: 26,
    // fontWeight: 500,
    alignItems: 'center',
    paddingLeft: 15,
    marginLeft: 5,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: '#66db30',
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  message: state.message,
});

const mapDispatchToProps = {
  get_message_all,
  get_message_personal,
  post_message,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
