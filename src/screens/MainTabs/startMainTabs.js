import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Navigation.setDefaultOptions({
        bottomTabs: {
            visible: true,
            animate: false,
            drawBehind: false,
            backgroundColor: 'white',
            tabColor: "grey"
        }
    });
    Promise.all([
        Icon.getImageSource(Platform.OS === "android" ? "md-map" : "ios-map", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-share-alt" : "ios-share", 30),
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
                                                    text: 'Find Place',
                                                    icon: sources[0],
                                                    testID: 'FIRST_TAB_BAR_BUTTON',
                                                    selectedIconColor: 'orange',
                                                    selectedTextColor: 'orange'
                                                },
                                                topBar: {
                                                    title: {
                                                        text: 'Find Place'
                                                    },
                                                    leftButtons: [
                                                        {
                                                            id: 'sideDrawerToggle',
                                                            icon: sources[2],
                                                            title: "Menu",
                                                            color: "orange"
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
                                                        text: 'Share Place',
                                                        icon: sources[1],
                                                        testID: 'FIRST_TAB_BAR_BUTTON',
                                                        selectedIconColor: 'orange',
                                                        selectedTextColor: 'orange'
                                                    },
                                                    topBar: {
                                                        title: {
                                                            text: 'Share Place'
                                                        },
                                                        leftButtons: [
                                                            {
                                                                id: 'sideDrawerToggle',
                                                                icon: sources[2],
                                                                title: "Menu",
                                                                color: "orange"
                                                            }
                                                        ],
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            }],
                            options: {
                                bottomTabs: {
                                    tabColor: 'black',
                                    selectedTabColor: 'green',
                                    backgroundColor: 'white',
                                    fontSize: 12,
                                    testID: 'BOTTOM_TABS_ELEMENT'
                                }
                            }
                        }
                    }
                },

            }
        });
    });
};


export default startTabs;