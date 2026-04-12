let notificationApi = null;

export const setNotificationApi = (api) => {
  notificationApi = api;
};

const withFallback = (method, payload) => {
  if (notificationApi && typeof notificationApi[method] === 'function') {
    notificationApi[method](payload);
    return;
  }

  return null;
};

export const showSuccess = (payload) => withFallback('success', payload);
export const showWarning = (payload) => withFallback('warning', payload);
export const showError = (payload) => withFallback('error', payload);
