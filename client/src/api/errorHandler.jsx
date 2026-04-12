import * as constant from "helper/constant";
import { showError } from './notificationBridge';

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const message = response.data && response.data.message;
    const errorText = message
    const { status } = response;
    showError({
      message: `Request error ${status}`,
      description: errorText,
    });

    if (status === constant.HttpStatus.UNAUTHORIZED) {
      // window.location.href = '/logout';
    }
    return response.data;
  } else {
    if (navigator.onLine) {
      // Code to execute when there is internet connection
      showError({
        message: 'Problem connecting to server',
        description: 'Cannot connect to the server, Try again later',
      });
      return {
        success: false,
        result: null,
        message: 'Cannot connect to the server, Check your internet network',
      };
    } else {
      // Code to execute when there is no internet connection
      showError({
        message: 'No internet connection',
        description: 'Cannot connect to the Internet, Check your internet network',
      });
      return {
        success: false,
        result: null,
        message: 'Cannot connect to the server, Check your internet network',
      };
    }
  }
};

export default errorHandler;
