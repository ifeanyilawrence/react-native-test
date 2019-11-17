import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
    constructor(props) {
        super(props);
        this.isSideDrawerVisible = false;
        Navigation.events().registerNavigationButtonPressedListener(this.onNavigatorEvent);
    }

    onNavigatorEvent = (event) => {
        if (event && event.buttonId === "sideDrawerToggle") {
            (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false;
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    left: {
                        visible: this.isSideDrawerVisible,
                    }
                }
            });
        }
    }
    
    itemSelectedHandler = key => {
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });

        Navigation.push(this.props.componentId, {
            component: {
            name: 'rntest.PlaceDetailScreen',
            passProps: {
                selectedPlace: selPlace
            },
            options: {
                topBar: {
                    title: {
                        text: selPlace.name
                    }
                }
            }
            }
        });
    }

    render() {
        return (
            <View>
                <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
            </View>
        );
    }
}

mapStateTopProps = state => {
    return {
        places: state.places.places
    }
}

export default connect(mapStateTopProps)(FindPlaceScreen);