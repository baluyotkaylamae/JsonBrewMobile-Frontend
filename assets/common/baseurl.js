// import { Platform } from 'react-native'
// let baseURL = 'https://3cbc-2405-8d40-404e-3484-4049-f11f-fe45-6bff.ngrok-free.app'
// {Platform.OS == 'android'
// ? baseURL = 'http://192.168.43.45:8081/api/v1/'
// : baseURL = 'http://192.168.43.45:8081/api/v1/'
// }
// export default baseURL;

import { Platform } from 'react-native';

let baseURL = '';

if (Platform.OS === 'android') {
    baseURL = 'http://192.168.1.11:4000/api/v1/';
} else {
    baseURL = 'http://192.168.1.11:4000/api/v1/';
}

export default baseURL;
