import { AsyncStorage } from 'react-native';

import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { uiStartLoading, uiStoptLoading } from './ui';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import { setRoot } from '../../../App';

export const tryAuth = (authData, authMode) => {
    return async dispatch => {
        dispatch(uiStartLoading());

        let url = "https://lawrence-task-manager.herokuapp.com/users/login";

        if (authMode === "signup") {
            url = "https://lawrence-task-manager.herokuapp.com/users";
        }
        console.log(JSON.stringify({
            email: authData.email,
            password: authData.password,
            name: authData.name
        }));
        try {
            let parsedRes = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    email: authData.email,
                    password: authData.password,
                    name: authData.name
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (parsedRes.status == 400) {
                alert("Authentication Failed!");
            }
            else if (parsedRes.status == authMode === "login" ? 200 : 201) {
                let resData = await parsedRes.json();
                console.log(resData);
                dispatch(authStoreToken(resData.token));
                startMainTabs();
            }
            else {
                alert("Something went wrong, try again!");
            }
            dispatch(uiStoptLoading());
        } catch (error) {
            dispatch(uiStoptLoading());
            alert("Something went wrong, try again!");
            console.log(error.status);
        }
    }
}

export const authStoreToken = token => {
    return async dispatch => {
        dispatch(authSetToken(token));
        await AsyncStorage.setItem("auth_token", token);
    }
}

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
}

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                try {
                    AsyncStorage.getItem("auth_token")
                    .catch(err => {
                        console.log(err);
                        reject();
                    })
                    .then(resToken => {
                        if (resToken) {
                            dispatch(authSetToken(resToken));
                            resolve(resToken);
                        } else {
                            reject();
                            return;
                        }
                    })
                } catch (error) {
                    reject();
                }
            } else {
                resolve(token);
            }
        });

        return promise;
    }
}

export const authClearStorage = () => {
    return async dispatch => {
        try {
            return await AsyncStorage.removeItem("auth_token");
        } catch (error) {
            console.log(error);
        }
    }
}

export const authAutoSignIn = () => {
    return async dispatch => {
        try {
            await dispatch(authGetToken());
            startMainTabs();
        } catch (error) {
            console.log("Failed to fetch token!");
        }
    }
}

export const authLogout = () => {
    return async dispatch => {
        try {
            await dispatch(authClearStorage());
            dispatch(authRemoveToken());
            setRoot();
        } catch (error) {
            console.log(error);
        }
    };
}

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    }
}