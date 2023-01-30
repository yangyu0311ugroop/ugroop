import '@firebase/messaging';
import '@firebase/firestore';
import moment from 'moment';
import _ from 'lodash';
import firebaseLib from './firebaseLibWrapper';
import { getFireBaseConifg } from './firebaseConfigration';
class Firebase {
  constructor() {
    try {
      if (!firebaseLib.firebase.apps.length) {
        const config = getFireBaseConifg();
        this.app = firebaseLib.firebase.initializeApp(config);
        if (firebaseLib.firebase.messaging.isSupported()) {
          this.messaging = firebaseLib.firebase.messaging();
        }
        this.db = firebaseLib.firebase.firestore();
        const settings = { timestampsInSnapshots: true };
        firebaseLib.firebase.firestore().settings(settings);
      } else {
        this.app = firebaseLib.firebase.apps[0];
        if (firebaseLib.firebase.messaging.isSupported()) {
          this.messaging = this.app.messaging();
        }
        this.db = this.app.firestore();
      }
      this.unsubscribeTour = {};
    } catch (e) {
      console.error(e);
    }
  }

  requestFCMPermission = registerDeviceFn => {
    try {
      if (this.messaging) {
        this.messaging
          .requestPermission()
          .then(() => this.messaging.getToken())
          .then(token => registerDeviceFn(token))
          .catch(error => {
            if (error.code === 'messaging/permission-blocked') {
              console.log('Please Unblock Notification Request Manually');
            } else {
              console.log('Error Occurred', error);
            }
            throw error;
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  foregroundMessage = cb => {
    if (this.messaging) {
      this.unsubscribeOnMessage = this.messaging.onMessage(payload => {
        // console.log('foregroundMessage', payload);
        cb(payload);
      });
    }
  };

  listenNotificationChange = handleLiveUpdateDbCB => doc => {
    doc.docChanges().forEach(change => {
      if (change.type === 'added') {
        // console.log('New notification: ', change.doc.data());
        handleLiveUpdateDbCB(change.doc.data());
      }
    });
  };

  listenChatChange = handleLiveUpdateDbCB => doc => {
    doc.docChanges().forEach(change => {
      if (change.type === 'added') {
        console.log('New listenChatChange: ', change.doc.data());
        handleLiveUpdateDbCB(change.doc.data());
      }
    });
  };

  subscribeNotificationChanges = (userId, handleLiveUpdateDbCB) => {
    if (userId && this.db) {
      // console.log('subscribeNotificationChanges', userId);
      const timestamp = moment
        .utc()
        .add(-1, 'm')
        .valueOf();
      this.db
        .collection('users')
        .where('userId', '==', userId)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            const userdoc = querySnapshot.docs[0];
            const query = userdoc.ref
              .collection('notifications')
              .where('timestamp', '>', timestamp)
              .orderBy('timestamp', 'desc');
            this.unsubscribeNotification = query.onSnapshot(
              this.listenNotificationChange(handleLiveUpdateDbCB),
            );
          }
          return null;
        });
    }
  };

  subscribeChatChanges = (userId, handleLiveUpdateDbCB) => {
    if (userId && this.db) {
      // console.log('subscribeNotificationChanges', userId);
      const timestamp = moment
        .utc()
        .add(-10, 's')
        .valueOf();
      this.db
        .collection('users')
        .where('userId', '==', userId)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            const userdoc = querySnapshot.docs[0];
            const query = userdoc.ref
              .collection('chats')
              .where('timestamp', '>', timestamp)
              .orderBy('timestamp', 'desc');
            this.unsubscribeChat = query.onSnapshot(
              this.listenChatChange(handleLiveUpdateDbCB),
            );
          }
          return null;
        });
    }
  };

  listenTourChange = handleLiveUpdateDbCB => doc => {
    doc.docChanges().forEach(change => {
      if (change.type === 'added') {
        // console.log('Add Live Update: ', change.doc.data());
        handleLiveUpdateDbCB(change.doc.data());
      }
    });
  };

  subscribeTourLiveUpdate = (userId, tourId, handleLiveUpdateDbCB) => {
    if (userId && tourId && this.db) {
      const timestamp = moment.utc().valueOf();
      this.db
        .collection('users')
        .where('userId', '==', userId)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            const userdoc = querySnapshot.docs[0];
            const query = userdoc.ref
              .collection(`tourId_${tourId}`)
              .where('timestamp', '>', timestamp)
              .orderBy('timestamp', 'desc');
            const unsubscribe = query.onSnapshot(
              this.listenTourChange(handleLiveUpdateDbCB),
            );
            this.unsubscribeTour[tourId] = unsubscribe;
          }
          return null;
        });
    }
  };

  queryAirports = keyword => {
    const endCode = this.endCode(keyword);
    const cityPromise = this.db
      .collection('airports')
      .where('city', '>=', _.startCase(_.toLower(keyword)))
      .where('city', '<', _.startCase(_.toLower(endCode)))
      .limit(10)
      .get();
    const namePromise = this.db
      .collection('airports')
      .where('name', '>=', _.startCase(_.toLower(keyword)))
      .where('name', '<', _.startCase(_.toLower(endCode)))
      .limit(10)
      .get();
    const iataPromise = this.db
      .collection('airports')
      .where('iata', '>=', _.toUpper(keyword))
      .where('iata', '<', _.toUpper(endCode))
      .limit(10)
      .get();
    return Promise.all([cityPromise, namePromise, iataPromise]).then(
      querySnapshots =>
        querySnapshots.map(querySnapshot =>
          querySnapshot.docs.map(d => d.data()),
        ),
    );
  };

  endCode = keyword => {
    const strSearch = keyword;
    const strlength = strSearch.length;
    const strFrontCode = strSearch.slice(0, strlength - 1);
    const strEndCode = strSearch.slice(strlength - 1, strSearch.length);

    return strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
  };

  unsubscribeTourLiveUpdate(id) {
    if (id && this.unsubscribeTour[id]) {
      this.unsubscribeTour[id]();
      delete this.unsubscribeTour[id];
    }
  }

  unsubscribeNotificationLiveUpdate() {
    if (this.unsubscribeNotification) {
      this.unsubscribeNotification();
    }
  }

  callUnsubscribeOnMessage() {
    if (this.unsubscribeOnMessage) {
      this.unsubscribeOnMessage();
    }
  }

  unsubscribeChatLiveUpdate() {
    if (this.unsubscribeChat) {
      this.unsubscribeChat();
    }
  }
}

export default Firebase;
