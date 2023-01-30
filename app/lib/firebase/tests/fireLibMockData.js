const fn1 = () => 'abcd';
const fn2 = () => 'avcd';
const fn3 = () => 'efg';
const messaging = function() {
  fn1();
  fn2();
  fn3();
  return {
    requestPermission: jest.fn().mockReturnValue(
      Promise.resolve({
        json: fn1,
      }),
    ),
    getToken: jest.fn().mockReturnValue(Promise.resolve('abcd')),
    onMessage: jest.fn(),
  };
};
messaging.isSupported = jest.fn().mockReturnValue(true);

const getMock = id =>
  jest.fn().mockReturnValue(
    Promise.resolve({
      empty: id !== 1,
      docs: [
        {
          ref: {
            collection: userCollection.collection,
          },
          data: fn1,
        },
      ],
    }),
  );

const where = (field, operator, id) => ({
  get: getMock(id),
  limit: () => ({
    get: getMock(id),
  }),
});

const userCollection = {
  collection: () => ({
    where: () => ({
      orderBy: () => ({
        onSnapshot: () => fn2,
      }),
    }),
    add: fn3,
  }),
};

const firestore = function() {
  return {
    settings: jest.fn(),
    collection: () => ({
      where: (field, operator, id) => ({
        get: jest.fn().mockReturnValue(
          Promise.resolve({
            empty: id !== 1,
            docs: [
              {
                ref: {
                  collection: userCollection.collection,
                },
                data: fn2,
              },
            ],
          }),
        ),
        where,
      }),
      add: fn3,
    }),
  };
};

const msg = {
  messaging,
};
export const firebaseMockData = {
  initializeApp: jest.fn(),
  firestore,
  messaging: msg.messaging,
  apps: [{ messaging: msg.messaging, firestore }],
};
