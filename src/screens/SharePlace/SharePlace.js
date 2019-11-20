import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { addPlace } from '../../store/actions/index';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/Text/MainText';
import HeadingText from '../../components/UI/Text/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from "../../utility/validation";


class SharePlaceScreen extends Component {

    state = {
        controls: {
            placeName: {
                value: "",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            location: {
                value: null,
                valid: false
            },
            image: {
                value: null,
                valid: false
            }
        }
    }

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

    placeChangeHandler = (val) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            };
        });
    }

    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            };
        });
    };

    imagePickedHandler = (image) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        });
    }

    placeAddedHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeName.value,
            this.state.controls.location.value,
            this.state.controls.image.value
        );
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a Place with us!</HeadingText>
                    </MainText>
                    <PickImage onImagePicked={this.imagePickedHandler} />
                    <PickLocation onLocationPick={this.locationPickedHandler} />
                    <View style={{ width: '80%', alignItems: 'center' }}>
                        <PlaceInput placeName={this.state.placeName} onChangeText={this.placeChangeHandler} />
                    </View>
                    <View style={styles.button}>
                        <Button 
                            title="Share the Place!" 
                            onPress={this.placeAddedHandler}
                            disabled={
                                !this.state.controls.placeName.valid ||
                                !this.state.controls.location.valid ||
                                !this.state.controls.image.valid
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        margin: 8
    }
});

mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
    }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);