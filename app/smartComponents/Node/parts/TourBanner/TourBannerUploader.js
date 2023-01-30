import { CREATE_PHOTO, NODE_API, REMOVE_PHOTO } from 'apis/constants';
import { PERSON_CONTAINER } from 'appConstants';
import { FILE_STORE_RESELECTORS } from 'datastore/fileStore/selectorsViaConnect';
import { NODE_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import File from 'smartComponents/File';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import withResaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import Button from 'viewComponents/Button';
import {
  CANVAS_SIZE_CONSTANTS,
  IMAGE_SIZES_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import { trimContainerScheme } from 'utils/helpers/request';

const useStyles = makeStyles(() => ({
  root: {},
  deleteBtn: {
    padding: '0px 8px 0px 0px',
    background: 'unset',
    boxShadow: 'unset',
    color: 'gray',
    borderRadius: '50%',

    '&:hover': {
      backgroundColor: '#fafbfc',
    },
  },
}));

export const useNodeTourBannerGetter = ({ id }) => {
  const photos = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodePhotos(state, id),
  );
  return useSelector(state =>
    FILE_STORE_RESELECTORS.getTourBanner(state, photos),
  );
};

const placeholderProps = {
  showMoveIcon: false,
  showUploadIcon: false,
  deleteIcon: false,
  smallIcons: true,
  centerIcons: true,
};

export const TourBannerUploader = memo(
  withResaga()(({ id, resaga }) => {
    // eslint-disable-next-line no-unused-vars
    const classes = useStyles();
    const photo = useNodeTourBannerGetter({ id });
    const photoId = useSelector(state =>
      FILE_STORE_RESELECTORS.getPhotoId(state, photo),
    );

    const handleDelete = onSuccess => () => {
      resaga.dispatchTo(NODE_API, REMOVE_PHOTO, {
        payload: {
          id,
          fk: photoId,
          removeNodePhoto: true,
          photoId: photo,
        },
        onSuccess,
      });
    };

    const handleUpload = (url, metaInfo) => {
      const fileName = trimContainerScheme(url, PERSON_CONTAINER);
      if (photoId) {
        return handleDelete(() => {
          resaga.dispatchTo(NODE_API, CREATE_PHOTO, {
            payload: {
              id,
              content: url,
              metaInfo,
              fileName,
              type: 'tour_banner',
            },
          });
        })();
      }

      return resaga.dispatchTo(NODE_API, CREATE_PHOTO, {
        payload: {
          id,
          content: url,
          metaInfo,
          fileName,
          type: 'tour_banner',
        },
      });
    };
    return (
      <GridContainer spacing={0} wrap="nowrap">
        {!!photo && (
          <GridItem>
            <Button
              size="xs"
              color="white"
              buttonTitle="Delete Image"
              onClick={handleDelete()}
              className={classes.deleteBtn}
              noPadding
            >
              <Icon icon="lnr-trash2" size="small" color="dark" />
            </Button>
          </GridItem>
        )}
        <GridItem xs>
          <File
            id={photo}
            isTemplatePhoto
            skipDialog
            placeholderProps={placeholderProps}
            size={IMAGE_SIZES_CONSTANTS.LANDSCAPE_SM}
            canvasSize={CANVAS_SIZE_CONSTANTS.LANDSCAPE_SM}
            onUpload={handleUpload}
            onDelete={handleDelete()}
          />
        </GridItem>
      </GridContainer>
    );
  }),
);

TourBannerUploader.propTypes = {
  id: PropTypes.number,
  resaga: PropTypes.object.isRequired,
};
