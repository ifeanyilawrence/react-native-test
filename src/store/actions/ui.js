import { UI_START_LOADING, UI_STOP_LOADING} from './actionTypes';


export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    }
}

export const uiStoptLoading = () => {
    return {
        type: UI_STOP_LOADING
    }
}