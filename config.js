import { Platform } from 'react-native';

const backendUrl = Platform.OS === 'android'
  ? (__DEV__ ? 'http://192.168.1.70:3000' : 'http://10.0.2.2:3000')
  : 'http://localhost:3000'; // URL para iOS ou outros casos

export default {
  backendUrl,
};
