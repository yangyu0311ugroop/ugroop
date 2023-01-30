import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { PASSPORT_UTILS } from 'smartComponents/Person/components/Passports/utils';

describe('PERSON_DETAIL_HELPER', () => {
  let props = {
    resaga: {
      dispatchTo: jest.fn(),
    },
  };
  beforeEach(() => {
    props = {
      resaga: {
        dispatchTo: jest.fn(),
      },
      id: 1,
      userId: 1,
    };
    PASSPORT_UTILS.validateData = jest.fn(() => ({}));
  });

  describe('createPerson', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.createPerson(
        {
          data: {},
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('updatePerson', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.updatePerson(
        {
          personId: 1,
          userId: 2,
          nodeId: 3,
          person: {},
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should call dispatchTo of resaga with no ids', () => {
      PERSON_DETAIL_HELPER.updatePerson(
        {
          person: {},
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('removePersonPassport', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.removePersonPassport(
        {
          personId: 1,
          passportId: 2,
          userId: 3,
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('addPersonPassport', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.addPersonPassport(
        {
          personId: 1,
          passport: {},
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('updatePersonPassport', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.updatePersonPassport(
        {
          personId: 1,
          passportId: 2,
          passport: {},
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('updatePersonPassportPhoto', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.updatePersonPassportPhoto(
        {
          personId: 1,
          passportId: 2,
          url: 'url',
          metaInfo: { y: 2 },
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should call dispatchTo of resaga with no url', () => {
      PERSON_DETAIL_HELPER.updatePersonPassportPhoto(
        {
          personId: 1,
          passportId: 2,
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('updatePassport', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.updatePassport(props)({
        model: {},
        onSuccess: jest.fn(),
        onError: jest.fn(),
      });
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('updatePassportPhoto', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.updatePassportPhoto(props)('/image-url', {
        x: 1,
        y: 1,
      });
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should call dispatchTo with particular params if url param is null', () => {
      PERSON_DETAIL_HELPER.updatePassportPhoto(props)(null, { x: 1, y: 1 });
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('addMedical', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.addMedical(
        {
          personId: 1,
          medical: {},
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('patchMedical', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.patchMedical(
        {
          personId: 1,
          medicalId: 2,
          medical: {},
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('removeMedical', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.removeMedical(
        {
          personId: 1,
          medicalId: 2,
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('addDietary', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.addDietary(
        {
          personId: 1,
          dietary: {},
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('patchDietary', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.patchDietary(
        {
          personId: 1,
          dietaryId: 2,
          dietary: {},
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('removeDietary', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.removeDietary(
        {
          personId: 1,
          dietaryId: 2,
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('addStudentDetail', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.addStudentDetail(
        {
          personId: 1,
          studentDetail: {},
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('patchStudentDetail', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.patchStudentDetail(
        {
          personId: 1,
          studentDetailId: 2,
          studentDetail: {},
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('removeStudentDetail', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.removeStudentDetail(
        {
          personId: 1,
          studentDetailId: 2,
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('addInsurancePolicy', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.addInsurancePolicy(
        {
          personId: 1,
          id: 2,
          insurancePolicy: {},
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('patchInsurancePolicy', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.patchInsurancePolicy(
        {
          personId: 1,
          id: 2,
          insurancePolicy: {},
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('removeInsurancePolicy', () => {
    it('should call dispatchTo of resaga with particular params', () => {
      PERSON_DETAIL_HELPER.removeInsurancePolicy(
        {
          personId: 1,
          id: 2,
          x: 1,
        },
        props,
      );
      expect(props.resaga.dispatchTo).toBeCalled();
      expect(props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });
});
