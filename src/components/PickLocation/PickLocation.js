import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

class PickLocation extends Component {

    componentWillMount() {
        this.reset();
    }

    reset = () => {
        this.setState({
            focusedLocation: {
                latitude: 6.4266435,
                longitude: 3.4822281,
                latitudeDelta: 0.0091,
                longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0091
            },
            locationChosen: false,
            locError: ''
        });
    }

    pickLocationHandler = (event) => {
        const coords = event.nativeEvent.coordinate;

        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });

        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            }
        });

        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        });
    }

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            }

            this.pickLocationHandler(coordsEvent);
        },
            err => {
                console.log(err),
                    alert("Fetching location failed, please pick a location manually!");
                this.setState({ locError: err.Tex });
            }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 3000 });
    }

    render() {

        let marker = null;

        if (this.state.locationChosen) {
            marker = (
                <MapView.Marker coordinate={this.state.focusedLocation} />
            );
        }

        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    region={!this.state.locationChosen ? this.state.focusedLocation : null }
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}
                >
                    {marker}
                </MapView>
                <View style={styles.button}>
                    <Button title="Locate Me" onPress={this.getLocationHandler} />
                    <Text>{this.state.locError}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: 250
    },
    button: {
        margin: 8
    }
});

export default PickLocation;