import dropRight from 'lodash/dropRight';
import takeRight from 'lodash/takeRight';
import { FOLDER, TEMPLATE } from 'utils/modelConstants';
import {
  ABILITY_DATA_STORE,
  APP_DATA_CACHE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';

export const getFirstItem = arr => arr[0];

export const USER_ID_CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTOR.userId.value,
    content: NODE_STORE_SELECTORS.content,
    ids: NODE_STORE_SELECTORS.children,
    isEditable: NODE_STORE_SELECTORS.isEditable,

    cardImageUrl: ({ id }) => [APP_DATA_CACHE, 'cardImageList', id],
    parentNodeId: NODE_STORE_SELECTORS.parentNodeId,
    searchTemplateView: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'search'],
  },
};

export const CONFIG = {
  value: {
    tourOwnerAbilities: [
      ABILITY_DATA_STORE,
      'definitions',
      'tour',
      'tour_owner',
    ],
    relatedIds: {
      keyPath: ({ ids = [] }) =>
        ids.map(id => NODE_STORE_SELECTORS.type({ id })),
      cacheKey: ({ ids, cacheKey, id }) =>
        `folderIdTypeRelation.${id}.${cacheKey}.${ids ? ids.toString() : null}`,
      props: ({ ids }) => ids,
      getter: (...args) => {
        const relatedIds = dropRight(args, 1);
        const [ids] = takeRight(args, 1);
        const withRelatedIds = ids
          ? ids.map((id, index) =>
              id instanceof Array
                ? [...id, relatedIds[index]]
                : [id, relatedIds[index]],
            )
          : [];

        return withRelatedIds;
      },
    },
    childrenContent: {
      keyPath: ({ ids = [] }) =>
        ids.map(id => NODE_STORE_SELECTORS.content({ id })),
      cacheKey: ({ ids = [] }) =>
        `smartComponents.Node.types.Folder.childrenContent.${
          ids.length ? ids.toString() : null
        }`,
      props: ({ ids }) => ids,
      getter: (...args) => {
        const content = dropRight(args, 1);
        if (content.length === 1) {
          if (!content[0]) return null;
        }
        return content;
      },
    },
    parentParentNodeId: NODE_STORE_SELECTORS.parentParentNodeId,
  },
};

export const PHOTO_METAINFO_CONFIG = {
  value: {
    userMetaInfo: {
      keyPath: ({ userProfilePhotoUrl }) =>
        FILE_STORE_SELECTORS.noSpreadMetaInfo({ id: userProfilePhotoUrl }),
      spreadObject: true,
    },
    templateIds: {
      getter: ({ relatedIds = [] }) =>
        relatedIds.filter(pair => pair[1] === TEMPLATE).map(getFirstItem),
    },
    folderIds: {
      getter: ({ relatedIds = [] }) =>
        relatedIds.filter(pair => pair[1] === FOLDER).map(getFirstItem),
    },
  },
};

export const ITEMS_CONTENT_CONFIG = {
  value: {
    templateContent: {
      keyPath: ({ templateIds }) =>
        templateIds.map(template =>
          NODE_STORE_SELECTORS.content({ id: template }),
        ),
      cacheKey: ({ templateIds }) =>
        `templateView.content.${
          templateIds ? templateIds.toString() : null
        }.templateContents`,
      props: null,
      getter: (...args) => args,
    },
    folderContent: {
      keyPath: ({ folderIds }) =>
        folderIds.map(folder => NODE_STORE_SELECTORS.content({ id: folder })),
      cacheKey: ({ folderIds }) =>
        `templateView.content.${
          folderIds ? folderIds.toString() : null
        }.folderContents`,
      props: null,
      getter: (...args) => args,
    },
  },
};
