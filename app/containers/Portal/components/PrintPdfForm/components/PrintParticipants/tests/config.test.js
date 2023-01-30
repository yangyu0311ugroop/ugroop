import { CONFIG, CONFIG2, CONFIG3, CONFIG4, CONFIG_PERSON } from '../config';

describe('AddRisk/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });
  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG2).toBe('object');
    });
  });

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG3).toBe('object');
    });
  });

  describe('CONFIG value2', () => {
    describe('value.participantsNode', () => {
      describe('value.participantsNode.keyPath', () => {
        it('value.participantsNode.keyPath with value', () => {
          expect(
            CONFIG2.value.participantsNode.keyPath({
              filteredParticipants: [1],
            }),
          ).toEqual([['nodeStore', 'nodes', 1]]);
        });
        it('value.participantsNode.keyPath is null', () => {
          expect(CONFIG2.value.participantsNode.keyPath({})).toEqual([]);
        });
      });
      describe('value.participantsNode.cacheKey', () => {
        it('value.participantsNode.keyPath with cacheKey', () => {
          expect(
            CONFIG2.value.participantsNode.cacheKey({
              filteredParticipants: [1],
            }),
          ).toEqual('filteredParticipants.printParticipant.1');
        });
        it('value.participantsNode.keyPath with no value cacheKey', () => {
          expect(CONFIG2.value.participantsNode.cacheKey({})).toEqual(
            'filteredParticipants.printParticipant.null',
          );
        });
      });
      // end cachekey
      describe('value.participantsNode.getter', () => {
        it('value.participantsNode.keyPath with cacheKey', () => {
          const args = ['some val', [1]];
          expect(CONFIG2.value.participantsNode.getter(...args)).toEqual({
            groupLinkIds: [undefined],
            participantsContent: ['some val'],
            peopleIds: [undefined],
            phoneIds: [undefined],
            roomIds: [undefined],
          });
        });
      });
      // end getter
    });
    describe('value.userIds', () => {
      describe('value.phoneList.userIds.keyPath', () => {
        it('value.userIds.keyPath with value', () => {
          expect(CONFIG2.value.userIds.keyPath({ userNodeIds: [1] })).toEqual([
            ['invitationStore', 'userNodes', 1],
          ]);
        });
        it('value.userIds.keyPath with value if null', () => {
          expect(CONFIG2.value.userIds.keyPath({})).toEqual([]);
        });
      });
      describe('value.userIds.cacheKey', () => {
        it('value.participantsNode.keyPath with cacheKey', () => {
          expect(
            CONFIG2.value.userIds.cacheKey({
              userNodeIds: [1],
            }),
          ).toEqual(
            'filteredParticipantsUserNodeIds.printParticipantUserNodeIds.1',
          );
        });
        it('value.participantsNode.keyPath with no value cacheKey', () => {
          expect(CONFIG2.value.userIds.cacheKey({})).toEqual(
            'filteredParticipantsUserNodeIds.printParticipantUserNodeIds.null',
          );
        });
      });
      describe('value.userIds.props', () => {
        it('value.participantsNode.props', () => {
          expect(
            CONFIG2.value.userIds.props({
              filteredParticipants: [1],
            }),
          ).toEqual([1]);
        });
      });
      describe('value.userIds.getter', () => {
        it('value.userIds.getterr', () => {
          expect(
            CONFIG2.value.userIds.getter({ nodeId: 1, userId: 1 }, [1]),
          ).toEqual([1]);
        });
        it('value.userIds.getter no value', () => {
          expect(
            CONFIG2.value.userIds.getter({ nodeId: 1, userId: 1 }),
          ).toEqual([]);
        });
      });
    });
    describe('value.participantsNode.orgName', () => {
      it('value.orgName', () => {
        expect(CONFIG2.value.orgName({ orgId: 1 })).toEqual([
          'organisationDataStore',
          'organisations',
          1,
          'name',
        ]);
      });
    });
    describe('value.participantsNode.ownerName', () => {
      it('value.orgName', () => {
        expect(CONFIG2.value.ownerName({ createdBy: 1 })).toEqual([
          'userDataStore',
          'people',
          1,
          'knownAs',
        ]);
      });
    });
    describe('value.participantsNode.orgPhoto', () => {
      it('value.orgName', () => {
        expect(CONFIG2.value.orgPhoto({ orgId: 1 })).toEqual([
          'organisationDataStore',
          'organisations',
          1,
          'photo',
        ]);
      });
    });
  });
  describe('CONFIG3 value3', () => {
    describe('value.personDetails', () => {
      describe('value.personDetails.keyPath', () => {
        it('value.personDetails.keyPath with value', () => {
          expect(
            CONFIG3.value.personValues.keyPath({
              peopleIds: [1],
            }),
          ).toEqual([['personDataStore', 'people', 1]]);
        });
        it('value.participantsNode.keyPath is null', () => {
          expect(CONFIG3.value.personValues.keyPath({})).toEqual([]);
        });
      });
      describe('value.participantsNode.cacheKey', () => {
        it('value.participantsNode.keyPath with cacheKey', () => {
          expect(
            CONFIG3.value.personValues.cacheKey({
              peopleIds: [1],
            }),
          ).toEqual('filteredParticipantsPerson.printParticipantPerson.1');
        });
        it('value.participantsNode.keyPath with no value cacheKey', () => {
          expect(CONFIG3.value.personValues.cacheKey({})).toEqual(
            'filteredParticipantsPerson.printParticipantPerson.null',
          );
        });
      });
      // end cachekey
      describe('value.personValues.getter', () => {
        it('value.personValues.keyPath with cacheKey', () => {
          const args = [{ medicals: [1] }, [1]];
          CONFIG3.value.personValues.getter(...args);
          expect(CONFIG3.value.personValues.getter(...args)).toEqual({
            dietariesIds: [],
            medicalIds: [1],
            personDetails: [{ medicals: [1] }],
          });
        });
      });
      // end getter
    });

    describe('value.phoneList', () => {
      describe('value.phoneList.keyPath', () => {
        it('value.phoneList.keyPath with value', () => {
          expect(
            CONFIG3.value.phoneList.keyPath({
              phoneIds: [1],
            }),
          ).toEqual([['phoneDataStore', 'phones', 1, 'number']]);
        });
        it('value.phoneList.keyPath is null', () => {
          expect(CONFIG3.value.phoneList.keyPath({})).toEqual([]);
        });
      });
      describe('value.phoneList.cacheKey', () => {
        it('value.phoneList.keyPath with cacheKey', () => {
          expect(
            CONFIG3.value.phoneList.cacheKey({
              phoneIds: [1],
            }),
          ).toEqual('filteredParticipantsphoneIds.printParticipantphoneIds.1');
        });
        it('value.phoneList.keyPath with no value cacheKey', () => {
          expect(CONFIG3.value.phoneList.cacheKey({})).toEqual(
            'filteredParticipantsphoneIds.printParticipantphoneIds.null',
          );
        });
      });
      // end cachekey
      describe('value.phoneList.getter', () => {
        it('value.phoneList.keyPath with cacheKey', () => {
          const args = ['some val', [1]];
          expect(CONFIG3.value.phoneList.getter(...args)).toEqual(['some val']);
        });
      });
      // end getter
    });
    describe('value.personIds', () => {
      describe('value.personIds.keyPath', () => {
        it('value.personIds.keyPath with value', () => {
          expect(
            CONFIG3.value.personIds.keyPath({
              userIds: [1],
            }),
          ).toEqual([['userDataStore', 'people', 1, 'personId']]);
        });
        it('value.personIds.keyPath is null', () => {
          expect(CONFIG3.value.personIds.keyPath({})).toEqual([]);
        });
      });
      describe('value.personIds.cacheKey', () => {
        it('value.personIds.keyPath with cacheKey', () => {
          expect(
            CONFIG3.value.personIds.cacheKey({
              userIds: [1],
            }),
          ).toEqual(
            'filteredParticipantsUsersPeople.filteredParticipantsUsersPeople.1',
          );
        });
        it('value.personIds.keyPath with no value cacheKey', () => {
          expect(CONFIG3.value.personIds.cacheKey({})).toEqual(
            'filteredParticipantsUsersPeople.filteredParticipantsUsersPeople.null',
          );
        });
      });
      // end cachekey
      describe('value.personIds.getter', () => {
        it('value.personIds.keyPath with cacheKey', () => {
          const args = ['some val', [1]];
          expect(CONFIG3.value.personIds.getter(...args)).toEqual(['some val']);
        });
      });
      // end getter
    });
    describe('value.userDetails', () => {
      describe('value.userDetails.keyPath', () => {
        it('value.userPeople.keyPath with value', () => {
          expect(
            CONFIG_PERSON.value.userPeople.keyPath({
              personIds: [1],
            }),
          ).toEqual([['personDataStore', 'people', 1]]);
        });
        it('value.userPeople.keyPath is null', () => {
          expect(CONFIG_PERSON.value.userPeople.keyPath({})).toEqual([]);
        });
      });
      describe('value.userPeople.cacheKey', () => {
        it('value.userDetails.keyPath with cacheKey', () => {
          expect(
            CONFIG_PERSON.value.userPeople.cacheKey({
              personIds: [1],
            }),
          ).toEqual(
            'filteredParticipantsPersonPeople.filteredParticipantsPersonPeople.1',
          );
        });
        it('value.userPeople.keyPath with no value cacheKey', () => {
          expect(CONFIG_PERSON.value.userPeople.cacheKey({})).toEqual(
            'filteredParticipantsPersonPeople.filteredParticipantsPersonPeople.null',
          );
        });
      });
      // end cachekey
      describe('value.userPeople.getter', () => {
        it('value.userDetails.keyPath with cacheKey', () => {
          const args = ['some val', [1]];
          expect(CONFIG_PERSON.value.userPeople.getter(...args)).toEqual({
            userDetails: ['some val'],
            userDietariesIds: [],
            userMedicalIds: [],
          });
        });
      });
      // end getter
    });
    // rooms
    describe('value.rooms', () => {
      describe('value.rooms.keyPath', () => {
        it('value.rooms.keyPath with value', () => {
          CONFIG3.value.rooms.keyPath({
            roomIds: [1],
          });
        });
        it('value.rooms.keyPath is null', () => {
          expect(CONFIG3.value.rooms.keyPath({})).toEqual([]);
        });
      });
      describe('value.rooms.cacheKey', () => {
        it('value.rooms.keyPath with cacheKey', () => {
          CONFIG3.value.rooms.cacheKey({
            roomIds: [1],
          });
        });
        it('value.rooms.keyPath with no value cacheKey', () => {
          CONFIG3.value.rooms.cacheKey({});
        });
      });
      // end cachekey
      describe('value.rooms.getter', () => {
        it('value.rooms.keyPath with cacheKey', () => {
          const args = ['some val', [1]];
          expect(CONFIG3.value.rooms.getter(...args)).toEqual(['some val']);
        });
      });
      // end getter
    });
    // groups
    describe('value.groups', () => {
      describe('value.groups.keyPath', () => {
        it('value.groups.keyPath with value', () => {
          CONFIG_PERSON.value.groups.keyPath({
            groupIds: [1],
          });
        });
        it('value.groups.keyPath is null', () => {
          expect(CONFIG_PERSON.value.groups.keyPath({})).toEqual([]);
        });
      });
      describe('value.groups.cacheKey', () => {
        it('value.rooms.keyPath with cacheKey', () => {
          CONFIG_PERSON.value.groups.cacheKey({
            groupIds: [1],
          });
        });
        it('value.groups.keyPath with no value cacheKey', () => {
          CONFIG_PERSON.value.groups.cacheKey({});
        });
      });
      // end cachekey
      describe('value.groups.getter', () => {
        it('value.groups.keyPath with cacheKey', () => {
          const args = ['some val', [1]];
          expect(CONFIG_PERSON.value.groups.getter(...args)).toEqual([
            'some val',
          ]);
        });
      });
      // end getter
    });
    // medicals
    /* describe('value.medicals', () => {
      describe('value.medicals.keyPath', () => {
        it('value.medicals.keyPath with value', () => {
          CONFIG3.value.medicals.keyPath({
            medicalIds: [1],
          });
        });
        it('value.medicals.keyPath is null', () => {
          expect(CONFIG3.value.medicals.keyPath({})).toEqual([]);
        });
      });
      describe('value.medicals.cacheKey', () => {
        it('value.medicals.keyPath with cacheKey', () => {
          CONFIG3.value.medicals.cacheKey({
            medicalIds: [1],
          });
        });
        it('value.medicals.keyPath with no value cacheKey', () => {
          CONFIG3.value.medicals.cacheKey({});
        });
      });
      // end cachekey
      describe('value.medicals.getter', () => {
        it('value.medicals.keyPath with cacheKey', () => {
          const args = ['some val', [1]];
          expect(CONFIG3.value.medicals.getter(...args)).toEqual(['some val']);
        });
      });
      // end getter
    });
    // diet
    describe('value.dietaries', () => {
      describe('value.dietaries.keyPath', () => {
        it('value.medicals.dietaries with value', () => {
          CONFIG3.value.dietaries.keyPath({
            dietariesIds: [1],
          });
        });
        it('value.dietaries.keyPath is null', () => {
          expect(CONFIG3.value.dietaries.keyPath({})).toEqual([]);
        });
      });
      describe('value.dietaries.cacheKey', () => {
        it('value.dietaries.keyPath with cacheKey', () => {
          CONFIG3.value.dietaries.cacheKey({
            dietariesIds: [1],
          });
        });
        it('value.dietaries.keyPath with no value cacheKey', () => {
          CONFIG3.value.dietaries.cacheKey({});
        });
      });
      // end cachekey
      describe('value.dietaries.getter', () => {
        it('value.dietaries.keyPath with cacheKey', () => {
          const args = ['some val', [1]];
          expect(CONFIG3.value.dietaries.getter(...args)).toEqual(['some val']);
        });
      });
      // end getter
    }); */
  });
  describe('config4', () => {
    describe('value.medicals', () => {
      describe('value.medicals.keyPath', () => {
        it('value.medicals.medicals with value', () => {
          CONFIG4.value.medicals.keyPath({
            medicalIds: [1],
          });
        });
        it('value.medicals.keyPath is null', () => {
          expect(CONFIG4.value.medicals.keyPath({})).toEqual([]);
        });
      });
      describe('value.medicals.cacheKey', () => {
        it('value.medicals.keyPath with cacheKey', () => {
          CONFIG4.value.medicals.cacheKey({
            medicalIds: [1],
          });
        });
        it('value.medicals.keyPath with no value cacheKey', () => {
          CONFIG4.value.medicals.cacheKey({});
        });
      });
      // end cachekey
      describe('value.medicals.getter', () => {
        it('value.medicals.keyPath with cacheKey', () => {
          const args = ['some val', [1]];
          expect(CONFIG4.value.medicals.getter(...args)).toEqual(['some val']);
        });
      });
      // end getter
    });
    describe('value.dietaries', () => {
      describe('value.dietaries.keyPath', () => {
        it('value.medicals.dietaries with value', () => {
          CONFIG4.value.dietaries.keyPath({
            dietariesIds: [1],
          });
        });
        it('value.dietaries.keyPath is null', () => {
          expect(CONFIG4.value.dietaries.keyPath({})).toEqual([]);
        });
      });
      describe('value.dietaries.cacheKey', () => {
        it('value.dietaries.keyPath with cacheKey', () => {
          CONFIG4.value.dietaries.cacheKey({
            dietariesIds: [1],
          });
        });
        it('value.dietaries.keyPath with no value cacheKey', () => {
          CONFIG4.value.dietaries.cacheKey({});
        });
      });
      // end cachekey
      describe('value.dietaries.getter', () => {
        it('value.dietaries.keyPath with cacheKey', () => {
          const args = ['some val', [1]];
          expect(CONFIG4.value.dietaries.getter(...args)).toEqual(['some val']);
        });
      });
      // end getter
    });
  });
  describe('value.photoMetaInfo', () => {
    it('value.photoMetaInfo', () => {
      expect(CONFIG3.value.photoMetaInfo({ orgPhoto: 1 })).toEqual([
        'fileDataStore',
        'files',
        1,
        'metaInfo',
      ]);
    });
  });
});
