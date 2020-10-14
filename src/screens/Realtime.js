import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';

class Realtime extends Component {
  constructor(props){
    super(props)
    this.state= {
      products: []
    }
  }

  submitChat(){
    this.socket.emit('chat-message', {data: 'hai sinta'});
  }

  componentDidMount(){
    this.socket = io('http://192.168.43.55:3000');
    this.socket.on('product', msg => {
      console.log(msg)
      this.setState({
        products: [...this.state.products, msg],
      })
    })
    axios({
      method: 'GET', 
      url: 'http://192.168.43.55:3000/products'
    })
    .then(res =>{
      this.setState({
        products:res.data.data
      }, () =>{
        console.log(this.state.products)
      }
    )})
    .catch((err)=>{
      console.log(err)
    })
  }

  componentWillUnmount(){
    this.socket.removeAllListeners();
    this.socket.disconnect();
  }

  render() {
    return (
      <View>
        <Text> Realtime </Text>
        <Button title='Chat' onPress={() => this.submitChat()}/>
        {this.state.products.map((data)=>{
          return(
             <View key={data.id}>
    <Text>{data.name}</Text>
        </View>
          )
         
        })}
        </View>
    );
  }
}

export default Realtime;
