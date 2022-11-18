import { alertConstants } from '../constants';
import { toast } from 'react-toastify';

function success(message) {
  return { type: alertConstants.SUCCESS, message };
}

function error(message) {
  toast(message);
  return { type: alertConstants.ERROR, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}
export const alertActions = {
  success,
  error,
  clear,
};
