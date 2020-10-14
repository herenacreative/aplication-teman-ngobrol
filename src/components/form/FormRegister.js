import React, { Component } from 'react'
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Card, Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/auth';

class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onPressRegister = () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props
      .register(data).then((response) => {
        console.log(response)
        Alert.alert(
          'Success',
          'Register Success',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      })
      .catch(function (error) {
        Alert.alert(
          'Register Failed',
          'Please input username and password',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
        console.log(error);
        console.log(error.response);
      });
  };

  render() {
    return (
      <View>
        <Card style={style.container}>
          <Card.Content style={style.content}>
            <TextInput
              label="Username"
              mode="outlined"
              value={this.props.username}
              onChangeText={(text) => {
                this.setState({ username: text });
              }}
            />
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry={true}
              value={this.props.password}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />
          </Card.Content>
          <Card.Actions>
            <Button style={style.button} onPress={this.onPressRegister} mode="contained">
              Register
            </Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}


const style = StyleSheet.create({
  container: {
    backgroundColor: '#432818',
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
    width: 350,
  },
  content: {
    margin: 10
  },
  button: {
      margin: 20,
      backgroundColor: '#BB9457',
      flex: 1,
      borderRadius: 10,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(FormRegister);
