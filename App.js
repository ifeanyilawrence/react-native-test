import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetail from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

import configureStore from './src/store/configureStore';

const store = configureStore();

Navigation.registerComponent(`rntest.AuthScreen`, () => (props) => (
  <Provider store={store}>
    <AuthScreen {...props} />
  </Provider>
), () => AuthScreen);

Navigation.registerComponent(`rntest.FindPlaceScreen`, () => (props) => (
  <Provider store={store}>
    <FindPlaceScreen {...props} />
  </Provider>
), () => FindPlaceScreen);

Navigation.registerComponent(`rntest.SharePlaceScreen`, () => (props) => (
  <Provider store={store}>
    <SharePlaceScreen {...props} />
  </Provider>
), () => SharePlaceScreen);

Navigation.registerComponent(`rntest.PlaceDetailScreen`, () => (props) => (
  <Provider store={store}>
    <PlaceDetail {...props} />
  </Provider>
), () => PlaceDetail);

Navigation.registerComponent(`rntest.SideDrawerScreen`, () => SideDrawer);

Navigation.events().registerAppLaunchedListener(() => {
  // set the root component
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
            component: {
              name: 'rntest.AuthScreen',
              options: {
                topBar: {
                  title: {
                    text: 'Login'
                  }
                }
              }
            }
          }],
      }
    }
  });
});