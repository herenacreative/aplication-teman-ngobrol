import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {List, Avatar, Badge, FAB, Button} from 'react-native-paper';
import Search from '../components/form/Search';
import { ScrollView } from 'react-native-gesture-handler';

class Contact extends Component {
  render() {
    return (
      <ScrollView>
        <View style={style.container}>
          <View>
            <Search />
          </View>
          <List.Section>
            <List.Subheader>
              <Button
                icon="account-plus"
                onPress={() => this.props.navigation.navigate('RegisterNew')}>
                Create New Contact
              </Button>
            </List.Subheader>
            <List.Subheader>A</List.Subheader>
            <List.Item
              onPress={() => this.props.navigation.navigate('Detail')}
              title="AAA"
              left={(props) => (
                <Avatar.Image
                  size={50}
                  source={require('../assets/image/undraw_farm_girl_dnpe.png')}
                />
              )}
            />
            <List.Subheader>B</List.Subheader>
            <List.Item
              title="BBBB"
              left={(props) => (
                <Avatar.Image
                  size={50}
                  source={require('../assets/image/undraw_farm_girl_dnpe.png')}
                />
              )}
            />
          </List.Section>

          {/* <View style={style.buttons}>
          <Button
            style={style.button}
            title="Maps"
            onPress={() => this.props.navigation.navigate('Maps')}></Button>
          <Button
            style={style.button}
            title="Realtime"
            onPress={() => this.props.navigation.navigate('Realtime')}></Button>
        </View> */}
          {/* <View style={style.footer}>
            <FAB
              style={style.fab}
              small
              icon="plus"
              onPress={() => console.log('Pressed')}
            />
          </View> */}
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#BB9457',
    minHeight: 600,
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

export default Contact;
