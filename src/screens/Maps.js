import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

 class Maps extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      where: {lat: null, lng: null},
      error: null,
    };
  }
  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 999999999,
      maximumAge: 99999,
      // timeOut: 10000000,
      // maximumAge: 60 * 60 * 24,
      // maximumAge: 10000
    };
    this.setState({ready: false, error: null});
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions,
    );
  }
  geoSuccess = (position) => {
    console.log(position.coords.latitude);

    this.setState({
      ready: true,
      where: {lat: position.coords.latitude, lng: position.coords.longitude},
    });
  };
  geoFailure = (err) => {
    this.setState({error: err.message});
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.ready && (
          <>
            <MapView
              style={styles.maps}
              initialRegion={{
                latitude: this.state.where.lat,
                longitude: this.state.where.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
            <Marker
              coordinate={{
                latitude: this.state.where.lat,
                longitude: this.state.where.lng,
              }}
              description={'MyLocation'}>
              <Image
                source={require('../assets/image/log.png')}
                style={{height: 35, width: 35}}
                // onDragEnd={(e) => this.setState({x: e.nativeEvent.coordinate})}
              />
            </Marker>
          </>
        )}
        {/* {!this.state.ready && (
          <Text style={styles.big}>Using Geolocation in React Native.</Text>
        )}
        {this.state.error && <Text style={styles.big}>{this.state.error}</Text>}
        {this.state.ready && (
          <Text style={styles.big}>{`Latitude: ${this.state.where.lat}
                    Longitude: ${this.state.where.lng}`}</Text>
        )} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  big: {
    fontSize: 18,
  },
  maps: {
    width: 350,
    height: 500,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default Maps;