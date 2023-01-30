import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG as config } from 'resaga';
import {
  CONFIG,
  UNDER_CONSTRUCTION,
  snackbar,
  GET_BREADCRUMB_TRAIL,
  GET_NEEDED_TRAILS,
  GET_USER_ID,
  GET_USER_ORGS,
  GET_ORG_ID,
} from '../config';

describe('CONFIG of TemplateActionButtons', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('submit', () => {
    it('should call UNDER CONSTRUCTION properly', () => {
      const res = CONFIG[config.SUBMIT][UNDER_CONSTRUCTION]();
      expect(res).toEqual({});
    });
  });
  describe('on success', () => {
    it('on success UNDER CONSTRUCTION - should return snackbar.reveal', () => {
      snackbar.reveal = jest.fn();
      CONFIG[config.ON_SUCCESS][UNDER_CONSTRUCTION][0](1);
      expect(snackbar.reveal).toBeCalled();
    });
  });
  describe('value', () => {
    describe('templateTitle', () => {
      it('should return the content inside the templates object', () => {
        expect(CONFIG.value.templateTitle({ templateId: 1 })).toEqual(
          NODE_STORE_SELECTORS.content({ id: 1 }),
        );
      });
    });
  });
});

describe('GET_BREADCRUMB_TRAIL', () => {
  describe('value', () => {
    it('should have a particular value shape', () => {
      expect(GET_BREADCRUMB_TRAIL.value).toMatchSnapshot();
    });
    it('should have templateParentId', () => {
      expect(
        GET_BREADCRUMB_TRAIL.value.templateParentId({ templateId: 1 }),
      ).toEqual(NODE_STORE_SELECTORS.parentNodeId({ id: 1 }));
    });
  });
});

describe('GET_NEEDED_TRAILS', () => {
  describe('value', () => {
    it('should have a particular value shape', () => {
      expect(
        GET_NEEDED_TRAILS.value.rootNodeName({ trails: [1] }),
      ).toMatchSnapshot();
      expect(GET_NEEDED_TRAILS.value.rootNodeName({})).toMatchSnapshot();
    });
  });
});

describe('GET_USER_ID', () => {
  describe('value', () => {
    it('should have a particular value shape', () => {
      expect(GET_USER_ID.value).toMatchSnapshot();
    });
  });
});

describe('GET_USER_ORGS', () => {
  describe('value', () => {
    it('should have a particular value shape', () => {
      expect(GET_USER_ORGS.value).toMatchSnapshot();
    });
  });
});

describe('GET_ORG_ID', () => {
  describe('value', () => {
    it('should have a particular value shape', () => {
      expect(GET_ORG_ID.value).toMatchSnapshot();
    });

    describe('rootNodeOrgId', () => {
      describe('keyPath', () => {
        it('should return a particular array of key paths', () => {
          expect(
            GET_ORG_ID.value.rootNodeOrgId.keyPath({ userOrgs: [1, 2] }),
          ).toMatchSnapshot();
        });
        it('should not break', () => {
          expect(GET_ORG_ID.value.rootNodeOrgId.keyPath({})).toMatchSnapshot();
        });
      });

      describe('props', () => {
        it('should return only userOrgs and trails', () => {
          const props = {
            userOrgs: [1, 2],
            trails: [1, 2],
            other: [11, 12],
          };

          expect(GET_ORG_ID.value.rootNodeOrgId.props[0](props)).toEqual(
            props.userOrgs,
          );
          expect(GET_ORG_ID.value.rootNodeOrgId.props[1](props)).toEqual(
            props.trails,
          );
        });
      });

      describe('cacheKey', () => {
        it('should return a particular cacheKey if userOrgs and trails have value', () => {
          expect(
            GET_ORG_ID.value.rootNodeOrgId.cacheKey({
              userOrgs: [1, 2],
              trails: [1, 2],
            }),
          ).toEqual('template.breadcrumbs.1,2.1,2.getRootNodeOrg');
        });

        it('should return a particular cacheKey if userOrgs and trails have no value', () => {
          expect(
            GET_ORG_ID.value.rootNodeOrgId.cacheKey({
              userOrgs: null,
              trails: null,
            }),
          ).toEqual('template.breadcrumbs.null.null.getRootNodeOrg');
        });
      });

      describe('getter', () => {
        const userOrgs = [11, 12];

        it('should return orgId if it is in the organisation list of the user', () => {
          const trails = [1, 4, 5];
          const result = GET_ORG_ID.value.rootNodeOrgId.getter(
            1,
            2,
            userOrgs,
            trails,
          );
          expect(result).toBe(11);
        });

        it('should return 0 if org root node is not within the user organisations', () => {
          const trails = [3, 4, 5];
          const result = GET_ORG_ID.value.rootNodeOrgId.getter(
            1,
            2,
            userOrgs,
            trails,
          );
          expect(result).toBe(0);
        });
        it('should return 0 if org root node is not within the user organisations and shall not break', () => {
          const result = GET_ORG_ID.value.rootNodeOrgId.getter(undefined);
          expect(result).toBe(0);
        });
      });
    });
  });
});
