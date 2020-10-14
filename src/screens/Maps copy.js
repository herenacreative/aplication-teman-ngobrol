import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

class Maps extends Component {
  render() {
    return (
      <View style={style.view}>
        <MapView
          style={style.maps}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />

        <Marker
          coordinate={{latitude: -6.1753871, longitude: 106.8249641}}
          title="Monument Nasional"
          description="DKI Jakarta"
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  maps: {
    height: 400,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  view: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default Maps;
