import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase/init';

export const logButtonClick = (buttonName) => {
    logEvent(analytics, 'button_click', { name: buttonName });
};