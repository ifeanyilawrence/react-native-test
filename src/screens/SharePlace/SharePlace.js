import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { addPlace } from '../../store/actions/index';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/Text/MainText';
import HeadingText from '../../components/UI/Text/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from "../../utility/validation";
import { startAddPlace } from '../../store/actions/index';


class SharePlaceScreen extends Component {


    constructor(props) {
        super(props);
        this.isSideDrawerVisible = false;
        Navigation.events().registerNavigationButtonPressedListener(this.onNavigatorEvent);
        Navigation.events().registerBottomTabSelectedListener(this.onBottomTabNavigation);
    }

    componentWillMount () {
        this.reset();
    }

    componentDidUpdate() {
        if (this.props.placeAdded) {
            Navigation.mergeOptions(this.props.componentId, {
                bottomTabs: {
                    currentTabIndex: 0
                }
            });
        }
    }

    reset = () => {

        this.setState({
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
        });
    }
    onBottomTabNavigation = (event) => {
        if (event.selectedTabIndex === 1) {
            this.props.onStartAddPlace();
        }
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

        this.reset();
        this.imagePicker.reset();
        this.locationPicker.reset();
    }

    render() {

        let submitButton = (
            <Button
                title="Share the Place!"
                onPress={this.placeAddedHandler}
                disabled={
                    !this.state.controls.placeName.valid ||
                    !this.state.controls.location.valid ||
                    !this.state.controls.image.valid
                }
            />
        )

        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a Place with us!</HeadingText>
                    </MainText>
                    <PickImage onImagePicked={this.imagePickedHandler} ref={ref => this.imagePicker = ref} />
                    <PickLocation 
                        onLocationPick={this.locationPickedHandler} 
                        ref={ref => this.locationPicker = ref}
                    />
                    <View style={{ width: '80%', alignItems: 'center' }}>
                        <PlaceInput placeName={this.state.placeName} onChangeText={this.placeChangeHandler} />
                    </View>
                    <View style={styles.button}>
                        {submitButton}
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

mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        placeAdded: state.places.placeAdded
    }
}

mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
        onStartAddPlace: () => dispatch(startAddPlace())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);