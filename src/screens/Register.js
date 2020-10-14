import React, { Component } from 'react'
import {View, StyleSheet, Text} from 'react-native';
import { LogoRegister } from '../assets/ilustration';
import FormRegister from '../components/form/FormRegister';
import {Headline} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

class Register extends Component {
    render() {
        return (
          <ScrollView>
            <View style={style.container}>
              <LogoRegister width={250} height={250} />
              <Headline style={style.text}>
                Register in Temen Ngobrol !
              </Headline>
              <FormRegister />
            <View style={style.buttons}>
                <Text style={{marginTop: 20}}>
                  Do you have an account?{' '}
                </Text>
                <Text
                  style={{marginTop: 5, textAlign: 'right', width: 180}}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  Login
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
    // backgroundColor: '#BB9457',
  },
  text: {
    marginBottom: 30,
  }
});

export default Register;
