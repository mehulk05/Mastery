// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  secretkey:'seretkey',
  firebase: {
    projectId: 'matery-5d74a',
    appId: '1:550238335312:web:2eabcd1bd5346db3173c55',
    storageBucket: 'matery-5d74a.appspot.com',
    apiKey: 'AIzaSyD30Lua_SDRwbIYd4rETmuY_NfV3AquU2Q',
    authDomain: 'matery-5d74a.firebaseapp.com',
    messagingSenderId: '550238335312',
  },
  production: false,
  apiUrl: 'https://matery-5d74a-default-rtdb.firebaseio.com/',
  firebaseConfig : {
    apiKey: "AIzaSyD30Lua_SDRwbIYd4rETmuY_NfV3AquU2Q",
    authDomain: "matery-5d74a.firebaseapp.com",
    projectId: "matery-5d74a",
    storageBucket: "matery-5d74a.appspot.com",
    messagingSenderId: "550238335312",
    appId: "1:550238335312:web:2eabcd1bd5346db3173c55"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
