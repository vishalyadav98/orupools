// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  shareLink: "http://localhost:4200/",
  shareWebLink: "https://orupool-b8240.web.app/",
  firebaseConfig: {
    email: "admin@gmail.com",
    password: "12345678",
    adminUid: '12345',
    apiKey: "AIzaSyAxCpq_WljQ8QMiGo1FdEsDLDBa1lXO64Q",
    authDomain: "orupool-b8240.firebaseapp.com",
    projectId: "orupool-b8240",
    storageBucket: "orupool-b8240.appspot.com",
    messagingSenderId: "852050777526",
    appId: "1:852050777526:web:2eece24f62df02e42c5d17",
    measurementId: "G-K798QFHSGL"
  },
  property:
  [{
    propertyId: 0,
    propertyTitle: "BRvilla"
  },
  {
    propertyId: 1,
    propertyTitle: "adharshvilla"
  },
  {
    propertyId: 2,
    propertyTitle: "villa3"
  }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
