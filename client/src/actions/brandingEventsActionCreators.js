import BRANDING_EVENTS_ACTION_TYPE from './brandingEventsActionTypes';

export const addNotifications = values => ({
  type: BRANDING_EVENTS_ACTION_TYPE.ADD_NOTIFICATION,
  payload: {
    values,
  },
});

export const removeNotification = values => ({
  type: BRANDING_EVENTS_ACTION_TYPE.REMOVE_NOTIFICATION,
  payload: {
    values,
  },
});