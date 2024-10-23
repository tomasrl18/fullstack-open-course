/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.payload;
        case "CLEAR_NOTIFICATION":
            return "";
        default:
            return state;
    }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, "");

    return (
        <NotificationContext.Provider value={[notification, dispatch]}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const setNotification = (dispatch, message, seconds) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: message });
    
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, seconds * 1000);
};

export default NotificationContext