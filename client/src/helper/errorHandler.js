import { notification } from 'antd';

const errorHandler = (error) => {
  const { response } = error;

  // Handle JWT expired case
  // if (response.data && response.data.jwtExpired) {
  //   const result = Cookies.get('jwtToken');
  //   if (result) {
  //     window.location.href = '/logout';
  //   }
  // }

  if (response && response.status) {
    const message = response.data;

    const { status } = response;
    notification.config({
      duration: 4,
      maxCount: 2,
    });
    notification.error({
      message: `Request error ${status}`,
      description: message,
    });
    return response.data;
  } else {
    notification.config({
      duration: 5,
      maxCount: 1,
    });

    if (navigator.onLine) {
      // Code to execute when there is internet connection
      notification.error({
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
      notification.error({
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
