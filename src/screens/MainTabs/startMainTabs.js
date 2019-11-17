import { Navigation } from 'react-native-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource("md-map", 30, "red"),
        Icon.getImageSource("ios-share-alt", 30, "green"),
        Icon.getImageSource("ios-menu", 30)
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