import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === "android" ? "md-map" : "ios-map", 30, "red"),
        Icon.getImageSource(Platform.OS === "android" ? "md-share-alt" : "ios-share", 30, "green"),
        Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu", 30)
    ]).then(sources => {
        Navigation.setRoot({
            root: {
                sideMenu: {
                    id: "sideMenu",
                    left: {
                      component: {
                        id: "Drawer",
                        name: "rntest.SideDrawerScreen"
                      }
                    },
                    center: {
                        bottomTabs: {
                            children: [{
                                stack: {
                                    children: [{
                                        component: {
                                            name: 'rntest.FindPlaceScreen',
                                            options: {
                                                bottomTab: {
                                                    text: 'Tab 1',
                                                    icon: sources[0],
                                                    testID: 'FIRST_TAB_BAR_BUTTON',
                                                },
                                                topBar: {
                                                    title: {
                                                        text: 'Find Screen'
                                                    },
                                                    leftButtons: [
                                                        {
                                                            id: 'sideDrawerToggle',
                                                            icon: sources[2],
                                                            title: "Menu"
                                                        }
                                                    ],
                                                },
                                            }
                                        }
                                    }],
                                }
                            },
                            {
                                stack: {
                                    children: [
                                        {
                                            component: {
                                                name: 'rntest.SharePlaceScreen',
                                                options: {
                                                    bottomTab: {
                                                        text: 'Tab 2',
                                                        icon: sources[1],
                                                        testID: 'FIRST_TAB_BAR_BUTTON'
                                                    },
                                                    topBar: {
                                                        title: {
                                                            text: 'Share Screen'
                                                        },
                                                        leftButtons: [
                                                            {
                                                                id: 'sideDrawerToggle',
                                                                icon: sources[2],
                                                                title: "Menu"
                                                            }
                                                        ],
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            }]
                        }
                    }
                  },
                
            }
        });
    });
};


export default startTabs;