import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {List, Avatar, Badge, FAB} from 'react-native-paper';
import Search from '../components/form/Search';
import {ScrollView} from 'react-native-gesture-handler';
import io from 'socket.io-client';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import API from '../config/API';
import moment from 'moment';
// import { logout } from '../../redux/actions/auth';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  submitChat() {
    this.socket.emit('chat-message', {data: 'hai sinta'});
  }

  componentDidMount() {
    // console.log(this.props.auth.data.user_id, 'id');
    this.socket = io(`${API.serveURL}`);
    this.socket.on('message', (msg) => {
      console.log(msg);
      this.setState({
        messages: [...this.state.messages, msg],
      });
    });
    AsyncStorage.getItem('token', (error, result) => {
      const id = this.props.auth.data.user_id;
      axios({
        method: 'GET',
        url: `${API.baseURL}/messages/` + id,
        headers: {
          Authorization: result,
        },
      })
        .then((res) => {
          console.log(this.state.messages, 'res');
          this.socket.emit('chat-message', {data: 'hai sinta'});
          this.setState(
            {
              messages: res.data.data,
            },
            () => {
              console.log(this.state.messages);
            },
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  componentWillUnmount() {
    this.socket.removeAllListeners();
    this.socket.disconnect();
  }

  render() {
    // console.log(this.state.messages, 'msg');
    return (
      <ScrollView>
        <View style={style.container}>
          <View>
            <Search />
            {/* <Button title="Chat" onPress={() => this.submitChat()} /> */}
          </View>

          <View>
            {this.state.messages.map((data) => {
              const time = moment(data.created_at || moment.now()).fromNow();
              return (
                <>
                  {/* <Text>{data.content}</Text> */}
                  <List.Item
                    // messages={this.state.messages}
                    onPress={() =>
                      this.props.navigation.navigate('Chat', {
                        sender_id: data.sender_id,
                        receiver_id: data.receiver_id,
                      })
                    }
                    title={data.sender_name}
                    description={data.content}
                    left={(props) => (
                      <Avatar.Image
                        size={50}
                        source={require('../assets/image/undraw_farm_girl_dnpe.png')}
                      />
                    )}
                    right={(props) => <Text>{time}</Text>}
                  />
                </>
              );
            })}
          </View>

          {/* <List.Item
            title="Bella"
            description="Hello"
            left={(props) => (
              <Avatar.Image
                size={50}
                source={require('../assets/image/undraw_farm_girl_dnpe.png')}
              />
            )}
            right={(props) => (
              <Badge size={30} {...props}>
                1
              </Badge>
            )}
          /> */}
          <View style={style.footer}>
            <FAB
              style={style.fab}
              small
              icon="plus"
              onPress={() => this.props.navigation.navigate('Contact')}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    // backgroundColor: '#BB9457',
    minHeight: 650,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
  },
  buttons: {
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    width: 80,
  },
  footer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
