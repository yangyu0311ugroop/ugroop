export const getMarketMockedValue = () => {
  const defaultData = {
    publishedBy: {
      6310: {
        orgId: 817,
        date: '2020-09-09',
      },
      6485: {
        orgId: 817,
        date: '2020-09-09',
      },
      6024: {
        orgId: 817,
        date: '2020-09-09',
      },
      6009: {
        orgId: 817,
        date: '2020-09-09',
      },
    },
    Checklist: {
      productsList: [6310, 6485],
    },
    'Featured Tours': {
      productsList: [6024, 6009],
    },
  };

  const latestData = {
    publishedBy: {
      16761: {
        orgId: 298,
        date: '2020-09-09',
      },
      16770: {
        orgId: 298,
        date: '2020-09-09',
      },
      16873: {
        orgId: 298,
        date: '2020-09-09',
      },
      3840: {
        orgId: 121,
        date: '2020-09-09',
      },
      4187: {
        orgId: 121,
        date: '2020-09-09',
      },
      12517: {
        orgId: 298,
        date: '2020-09-09',
      },
      12666: {
        orgId: 298,
        date: '2020-09-09',
      },
    },
    Checklist: {
      productsList: [16761, 16770, 16873],
    },
    'Featured Tours': {
      productsList: [3840, 4187, 12517, 12666],
    },
  };

  const productData = {
    publishedBy: {
      29583: {
        orgId: 19,
        date: '2020-09-09',
      },
      29593: {
        orgId: 19,
        date: '2020-09-09',
      },
      29630: {
        orgId: 19,
        date: '2020-09-09',
      },
      29645: {
        orgId: 19,
        date: '2020-09-09',
      },
      29679: {
        orgId: 19,
        date: '2020-09-09',
      },
      29693: {
        orgId: 19,
        date: '2020-09-09',
      },
      29712: {
        orgId: 19,
        date: '2020-09-09',
      },
      29720: {
        orgId: 19,
        date: '2020-09-09',
      },
      29729: {
        orgId: 19,
        date: '2020-09-09',
      },
      29748: {
        orgId: 19,
        date: '2020-09-09',
      },
      29757: {
        orgId: 19,
        date: '2020-09-09',
      },
      29764: {
        orgId: 19,
        date: '2020-09-09',
      },
      12556: {
        orgId: 19,
        date: '2020-09-09',
      },
      465: {
        orgId: 19,
        date: '2020-09-09',
      },
    },
    Checklist: {
      productsList: [
        29583,
        29593,
        29630,
        29645,
        29679,
        29693,
        29712,
        29720,
        29729,
        29748,
        29757,
        29764,
      ],
    },
    'Featured Tours': {
      productsList: [12556, 465],
    },
  };

  const env = process.env.ENV;
  if (env === 'development') {
    return defaultData;
  }
  if (env === 'latest') {
    return latestData;
  }
  if (env === 'live' || env === 'production') {
    // should be production, but we cannot use production due to the webpack build issue.\
    return productData;
  }
  return defaultData;
};
