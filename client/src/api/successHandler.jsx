import { showError, showSuccess, showWarning } from './notificationBridge';

const successHandler = (response, options = { notifyOnSuccess: false, notifyOnFailed: true }) => {
  const { data } = response;
  if (data && data.success === true) {
    const message = response.data && data.message;
    const successText = message

    if (data.result === false) {
      showWarning({
        message: `Request failed`,
        description: successText,
      });
    } else if (options.notifyOnSuccess) {
      showSuccess({
        message: `Request success`,
        description: successText,
      });
    }
  } else {
    const message = response.data && data.message;
    const errorText = message
    const { status } = response;
    if (options.notifyOnFailed) {
      showError({
        message: `Request error ${status}`,
        description: errorText,
      });
    }
  }
};

export default successHandler;
