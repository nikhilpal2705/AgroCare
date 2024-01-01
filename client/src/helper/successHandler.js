import { notification } from 'antd';
import * as constant from "./constant";

const successHandler = (response, options = { notifyOnSuccess: false, notifyOnFailed: true }) => {
  if (response.status === constant.HttpStatus.OK) {
    const successText = response.data;

    if (options.notifyOnSuccess) {
      notification.config({
        duration: 2,
        maxCount: 2,
      });
      notification.success({
        message: `Request success`,
        description: successText,
      });
    }
  } else {
    const errorText = response.data
    if (options.notifyOnFailed) {
      notification.config({
        duration: 4,
        maxCount: 2,
      });
      notification.error({
        message: `Request error ${response.status}`,
        description: errorText,
      });
    }
  }
};

export default successHandler;
