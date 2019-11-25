import { SET_PLACES, REMOVE_PLACE, PLACE_ADDED, START_ADD_PLACE } from './actionTypes';
import { uiStartLoading, uiStoptLoading } from './ui';
import { authGetToken } from './auth';

export const startAddPlace = () => {
    return {
        type: START_ADD_PLACE
    }
}

export const addPlace = (placeName, location, image) => {
    return async (dispatch) => {

        dispatch(uiStartLoading());

        const token = await dispatch(authGetToken());

        var file = {
            uri: image.uri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };

        var formBody = new FormData();
        formBody.append('image', file);

        try {
            // let parsedRes = await fetch("http://localhost:3000/places/fileupload", { method: 'POST', body: formBody });
            let parsedRes = await fetch("https://lawrence-task-manager.herokuapp.com/places/fileupload", {
                    method: 'POST', 
                    body: formBody, 
                    headers: {
                        "Authorization": "Bearer " + token
                    } 
                });
            let data = await parsedRes.json();

            const placeData = {
                name: placeName,
                location,
                image: data.url
            };
            placeDataStr = JSON.stringify(placeData);
    
            // let savedPlace = await fetch("http://localhost:3000/places", { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8'}, body: placeDataStr });
            let savedPlace = await fetch("https://lawrence-task-manager.herokuapp.com/places", { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8', "Authorization": "Bearer " + token }, body: placeDataStr });
            let savedData = await savedPlace.json();
            
            dispatch(uiStoptLoading());
            dispatch(placeAdded());
        } catch (error) {
            console.log(error);
            alert("Something went wrong, please try again!");
            dispatch(uiStoptLoading());
        }
    }
}

export const placeAdded = () => {
    return {
        type: PLACE_ADDED
    }
}

export const getPlaces = () => {
    return async (dispatch) => {

        try {
            const token = await dispatch(authGetToken());
            // let parsedRes = await fetch("http://localhost:3000/places");
            const parsedRes = await fetch("https://lawrence-task-manager.herokuapp.com/places", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            
            if(parsedRes.status == 401) {
                alert("Unauthorized to access resource!");
            } else if(parsedRes.status == 200) {
                let data = await parsedRes.json();
                
                let places = [];
                for(let key in data) {
                    places.push({
                        ...data[key],
                        key: data[key]._id,
                        image: {
                            uri: "http://" + data[key].image
                        }
                    })
                }

                dispatch(setPlaces(places));
            }
            else {
                alert("Unabled to get places!");
                console.log(parsedRes);
            }
        } catch (error) {
            alert("Something went wrong!");
            console.log(error);
        }
    }
}

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places
    }
}

export const deletePlace = (key) => {
    return async (dispatch) => {
        dispatch(uiStartLoading());

        const token = await dispatch(authGetToken());

        try {
            dispatch(removePlace(key));
            // let delPlaceRes = await fetch("http://localhost:3000/places/" + key, { method: "DELETE"})
            let delPlaceRes = await fetch("https://lawrence-task-manager.herokuapp.com/places/" + key, { method: "DELETE", headers: {
                "Authorization": "Bearer " + token
            }})
            let deletedPlace = await delPlaceRes.json();
            console.log("Done!", deletedPlace);
            dispatch(uiStoptLoading());
        } catch (error) {
            alert("Something went wrong, sorry :/");
            console.log(error);
            dispatch(uiStoptLoading());
        }
    };
};

export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};
