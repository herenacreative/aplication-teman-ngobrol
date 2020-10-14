import React, { Component } from 'react';
import {Text, View, ImageBackground, StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Avatar, Headline, FAB, Divider, Subheader, Subheading} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';


class Detail extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  console.log(this.props.auth.data, 'hi');
  }
  
  render() {
    return (
      <ScrollView>
        <View style={style.container}>
          <Card style={style.header}>
            <View>
              <ImageBackground
                style={style.img}
                source={{uri: 'https://picsum.photos/700'}}>
                <View style={style.avatar}>
                  <Avatar.Image
                    size={150}
                    source={require('../assets/image/undraw_farm_girl_dnpe.png')}
                  />
                </View>
              </ImageBackground>
            </View>
            <View style={style.content}>
              <Card.Content>
                <Headline>{this.props.auth.data.username}</Headline>
                <Divider />
                <Card>
                  <Card.Content>
                    <Subheading>Mobile Phone</Subheading>
                    <Paragraph>{this.props.auth.data.mobile_phone}</Paragraph>
                  </Card.Content>
                </Card>
                <Subheading>Username</Subheading>
                <Card>
                  <Paragraph>{this.props.auth.data.username}</Paragraph>
                </Card>
                <Subheading>Email</Subheading>
                <Paragraph>{this.props.auth.data.email}</Paragraph>
              </Card.Content>
            </View>
          </Card>
          <FAB style={style.fab} small icon="pencil" />
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // flexWrap: 'wrap-reverse',
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    // backgroundColor: '#432818',
    // borderBottomLeftRadius: 50,
    // borderTopRightRadius: 50,
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  avatar: {
    // margin: 10,
    // justifyContent:'center',
    marginTop: 30,
    alignContent: 'center',
    alignItems: 'center',
  },
  img: {flex: 1, height: 300, resizeMode: 'cover'},
  content: {
    // position: 'absolute',
    bottom: 0,
    // justifyContent: 'center',
    // flex: 1,
    // backgroundColor: '#BB9457',
    height: 290,
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

export default connect(mapStateToProps)(Detail);
