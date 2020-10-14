import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {LogoLogin} from '../assets/ilustration';
import FormLogin from '../components/form/FormLogin';
import { ScrollView } from 'react-native-gesture-handler';
import {Button, Headline} from 'react-native-paper';

import {withNavigation} from 'react-navigation';

class Login extends Component {
    render() {
      // console.log(this.props, 'home')
        return (
          <ScrollView>
            <View style={style.container}>
              <Headline style={style.text}>Temen Ngobrol</Headline>
              <LogoLogin width={250} height={250} />

              <FormLogin navigation={this.props.navigation} />

              <View style={style.buttons}>
                <Text style={{marginTop: 20}}>
                  Don't have an account?{' '}
                </Text>
                <Text
                  style={{marginTop: 5, textAlign: 'right', width: 180}}
                  onPress={() => this.props.navigation.navigate('Register')}>
                  Register
                </Text>
                {/* <Button
                  route={this.props.route}
                  onPress={() => this.props.navigation.navigate('Home')}>
                  Login
                </Button> */}
              </View>
            </View>
          </ScrollView>
        );
    }
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: '#BB9457',
    fontSize: 30,
    marginTop: 30
  },
});

export default  withNavigation(Login);
