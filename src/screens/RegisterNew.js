import React, { Component } from 'react'
import {Text, View, StyleSheet, Image} from 'react-native';
import {Card, Button, TextInput, Headline, Avatar} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import API from '../config/API';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

class RegisterNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      filePath: {}
    };
  }

  chooseFile =() =>{
    const options = {
      title: 'Select Image',
      customButtons: [
        {name: 'choosePhoto', title: 'Choose Photo'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          filePath: source,
        });
      }
    });
  }

  onPressUser = () => {
    const formData = new FormData();
    formData.append('fullname', this.state.fullname);
    formData.append('image', {
      uri: this.state.filePath.uri,
      type: this.state.filePath.type,
      name: this.state.filePath.fileName,
    });
    formData.append('info', this.state.info);
    formData.append('user_id', this.props.auth.data.user_id);
    AsyncStorage.getItem('token', (error, result) => {
      axios({
        method: 'POST',
        url: `${API.baseURL}/users`,
        data: formData,
        headers: {
          Authorization: result,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
      
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };
  render() {
    return (
      <ScrollView>
        <View style={style.container}>
          <View style={style.avatar}>
            {/* <Image
              style={{width: 100, height:100}}
              source={{uri: 'data:image/jpeg;base64,' + this.state.filePath.image}}
            /> */}
            <Image
              source={{uri: this.state.filePath.uri}}
              style={{width: 100, height: 100}}
            />
          </View>
          <Button onPress={this.chooseFile.bind(this)} mode="contained">
            Choose Image
          </Button>
          <View style={style.form}>
            {/* <TextInput style={style.text} label="user_id" />
            <TextInput style={style.text} label="image" /> */}
            <TextInput
              style={style.text}
              label="Fullname"
              value={this.props.fullname}
              onChangeText={(text) => {
                this.setState({fullname: text});
              }}
            />
            <TextInput
              style={style.text}
              label="Info"
              value={this.props.info}
              onChangeText={(text) => {
                this.setState({info: text});
              }}
            />
            {/* <TextInput
              style={style.text}
              label="User ID"
              value={this.props.auth.data.user_id}
              onChangeText={(text) => {
                this.setState({user_id: text});
              }}
              disabled
            /> */}
          </View>
          <View>
            <Button
              style={style.button}
              mode="contained"
              onPress={()=>this.onPressUser()}>
              Register
            </Button>
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
    backgroundColor: '#432818',
  },
  avatar: {
    margin: 20,
  },
  form: {
    flexDirection: 'column',
    backgroundColor: '#BB9457',
    width: 360,
  },
  text: {
    marginRight: 30,
    marginLeft: 30,
    margin: 10
  },
  button: {
    margin: 20,
    backgroundColor: '#BB9457',
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(RegisterNew);
