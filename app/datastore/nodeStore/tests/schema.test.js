import { NODE_NORMALISERS, NODE_SCHEMA } from '../schema';

describe('NODE_NORMALISERS', () => {
  describe('normalise', () => {
    it('should return node and result', () => {
      const data = {
        id: 1,
        content: 'check1',
        nextNodes: [
          {
            id: 2,
            content: 'check2',
            nextNodes: [{ id: 21, content: 'check21' }],
          },
        ],
        checklists: [
          {
            id: 3,
            content: 'check3',
            checklists: [{ id: 31, content: 'check31' }],
          },
        ],
      };

      expect(NODE_NORMALISERS.normalise(data)).toMatchSnapshot();
    });
  });

  describe('folderNormalise', () => {
    it('should return nodes, people, folder and id', () => {
      const data = {
        id: 1,
        children: [
          { id: 2, people: [{ userId: 4 }] },
          { id: 3, people: [{ userId: 4 }] },
        ],
      };

      expect(NODE_NORMALISERS.folderNormalise(data)).toMatchSnapshot();
    });

    it('should return nodes, people, folder, id and nodeUsers if createdBy and/or lastModifiedBy is present', () => {
      const data = {
        id: 1,
        children: [
          {
            id: 2,
            people: [{ userId: 4 }],
            createdBy: {
              id: 7,
              knownAs: 'Person One',
              fullName: 'Person One Jones',
            },
          },
          {
            id: 3,
            people: [{ userId: 4 }],
            createdBy: {
              id: 7,
              knownAs: 'Person One',
              fullName: 'Person One Jones',
            },
            lastModifiedBy: {
              id: 8,
              knownAs: 'Person Two',
              fullName: 'Person Two Jones',
            },
          },
        ],
      };

      expect(NODE_NORMALISERS.folderNormalise(data)).toMatchSnapshot();
    });
  });

  describe('NODE_SCHEMA.normalisedDay', () => {
    it('should return normalised days', () => {
      const data = {
        id: 1,
        children: [{ id: 2 }, { id: 3 }],
      };

      expect(NODE_SCHEMA.normalisedDay(data)).toMatchSnapshot();
    });
  });
});
