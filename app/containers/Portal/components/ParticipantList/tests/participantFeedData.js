export const participantData = {
  participants: {
    edges: [
      {
        cursor:
          'WyJlbWFpbF9hc2NfX2xhc3R1cGRhdGVfZGVzY19fbGFzdG5hbWVfYXNjIixbInl1eTAzMTFAZ21haWwuY29tIiwiMjAyMC0wOC0xOFQwNTozNjozMy44NyswMDowMCIsIll1IiwzODddXQ==',
        node: {
          email: 'yuy0311@gmail.com',
          firstname: 'Yang',
          lastname: 'Yu',
          orgid: 3,
          parentnodeid: 21474,
          id: 387,
          lastupdate: '2020-08-18T05:36:33.87+00:00',
          dob: '1983-03-11T00:00:00+00:00',
          phone: null,
          phoneid: null,
          ugroopnodeByParentnodeid: {
            status: 'confirmed',
            parentnodeid: 13016,
            ugroopnodeByParentnodeid: {
              content: 'Yang Tours',
              type: 'template',
              createdat: '2019-11-27T01:45:35.79+00:00',
              id: 13016,
              templatesByParentnodeid: {
                nodes: [
                  {
                    subtitle: null,
                    startdate: null,
                    shortdescription: null,
                    parentnodeid: 13016,
                    organisationid: 3,
                    duration: 1,
                    displaydate: 'none',
                    description: null,
                    weekday: null,
                  },
                ],
              },
            },
          },
        },
      },
      {
        cursor:
          'WyJlbWFpbF9hc2NfX2xhc3R1cGRhdGVfZGVzY19fbGFzdG5hbWVfYXNjIixbInl1eTAzMTFAZ21haWwuY29tIiwiMjAxOS0xMi0wNVQwMjoxNDowMy45ODkrMDA6MDAiLCJZdSIsMjQyXV0=',
        node: {
          email: 'yuy0311@gmail.com',
          firstname: 'Yang',
          lastname: 'Yu',
          orgid: 3,
          parentnodeid: 13868,
          id: 242,
          lastupdate: '2019-12-05T02:14:03.989+00:00',
          dob: '1983-03-11T00:00:00+00:00',
          phone: '0423699393',
          phoneid: null,
          ugroopnodeByParentnodeid: {
            status: 'confirmed',
            parentnodeid: 5719,
            ugroopnodeByParentnodeid: {
              content: 'Yang Tour and Stephen and Dan',
              type: 'template',
              createdat: '2019-01-15T00:01:01.924+00:00',
              id: 5719,
              templatesByParentnodeid: {
                nodes: [
                  {
                    subtitle: null,
                    startdate: '2019-10-24T00:00:00+00:00',
                    shortdescription: '',
                    parentnodeid: 5719,
                    organisationid: 3,
                    duration: 14,
                    displaydate: 'startDate',
                    description:
                      '<p>This is a test This is a test This is a test This is a testThis is a test This is a test This is a test This is a test This is a test This is a test This is a testThis is a test This is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a test</p>',
                    weekday: null,
                  },
                ],
              },
            },
          },
        },
      },
    ],
    totalCount: 2,
    pageInfo: {
      hasPreviousPage: false,
      startCursor:
        'WyJlbWFpbF9hc2NfX2xhc3R1cGRhdGVfZGVzY19fbGFzdG5hbWVfYXNjIixbInl1eTAzMTFAZ21haWwuY29tIiwiMjAyMC0wOC0xOFQwNTozNjozMy44NyswMDowMCIsIll1IiwzODddXQ==',
      hasNextPage: false,
      endCursor:
        'WyJlbWFpbF9hc2NfX2xhc3R1cGRhdGVfZGVzY19fbGFzdG5hbWVfYXNjIixbInl1eTAzMTFAZ21haWwuY29tIiwiMjAxOS0xMi0wNVQwMjoxNDowMy45ODkrMDA6MDAiLCJZdSIsMjQyXV0=',
    },
  },
};

export const nodeData = {
  ugroopnodes: {
    edges: [
      {
        node: {
          parentnodeid: 5719,
          id: 9502,
          status: 'confirmed',
          type: 'participant',
        },
      },
      {
        node: {
          parentnodeid: 5719,
          id: 9508,
          status: 'confirmed',
          type: 'participant',
        },
      },
      {
        node: {
          parentnodeid: 5719,
          id: 13867,
          status: 'confirmed',
          type: 'participant',
        },
      },
      {
        node: {
          parentnodeid: 5719,
          id: 13868,
          status: 'confirmed',
          type: 'participant',
        },
      },
      {
        node: {
          parentnodeid: 5719,
          id: 13869,
          status: 'confirmed',
          type: 'participant',
        },
      },
      {
        node: {
          parentnodeid: 5719,
          id: 13870,
          status: 'confirmed',
          type: 'participant',
        },
      },
      {
        node: {
          parentnodeid: 13016,
          id: 21474,
          status: 'confirmed',
          type: 'participant',
        },
      },
    ],
  },
};

export const personData = {
  people: {
    edges: [
      {
        node: {
          id: 530,
          email: 'yuy0311@gmail.com',
          firstname: 'Yang',
          gender: null,
          knownas: 'Yang Yu',
          lastname: 'Yu',
          nodeid: 13868,
          birthdate: '1983-03-11T00:00:00+00:00',
          birthplace: null,
          photosByPersonid: { nodes: [] },
        },
      },
      {
        node: {
          id: 682,
          email: 'yuy0311@gmail.com',
          firstname: 'Yang',
          gender: null,
          knownas: 'Yang Yu',
          lastname: 'Yu',
          nodeid: 21474,
          birthdate: '1983-03-11T00:00:00+00:00',
          birthplace: null,
          photosByPersonid: { nodes: [] },
        },
      },
    ],
  },
};

export const errors = [
  {
    message:
      'Cannot query field "nodes" on type "ParticipantsEdge". Did you mean "node"?',
    locations: [
      {
        line: 4,
        column: 7,
      },
    ],
  },
];
