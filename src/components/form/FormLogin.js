import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Card,
  TextInput,
  Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {login} from '../../redux/actions/auth';

class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onPressLogin = () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(data).then((response) => {
      // console.log(this.props, 'login');
      console.log(response)
        this.props.navigation.navigate('Home');
        AsyncStorage.setItem('token', this.props.auth.data.token);
        AsyncStorage.setItem(
          'refreshToken',
          this.props.auth.data.refreshTokenNew
        );
      })
      .catch(function (error) {
        Alert.alert(
          'Login Failed',
          'Please enter username and password',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
        console.log(error);
        // console.log(error.response);
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
                this.setState({username: text});
              }}
            />
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry={true}
              value={this.props.password}
              onChangeText={(text) => {
                this.setState({password: text});
              }}
            />
          </Card.Content>
          <Card.Actions>
            <Button
              onPress={this.onPressLogin}
              // onPress={() => console.log('Pressed')}
              style={style.button}
              mode="contained"
              icon="login">
              Login
            </Button>
            {/* <Button
                  mode="contained"
                  style={{backgroundColor: '#BB9457'}}
                  onPress={() => this.props.navigation.navigate('Register')}>
                  Register
                </Button> */}
          </Card.Actions>
        </Card>
      </View>
    );
  }
}


const style = StyleSheet.create({
  container: {
    backgroundColor: '#BB9457',
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
    width: 350,
  },
  content: {
    margin: 10,
  },
  button: {
    margin: 20,
    flex: 1,
    borderRadius: 10,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {login};

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
