import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import { FILE_STORE_RESELECTORS } from 'datastore/fileStore/selectorsViaConnect';
import { NODE_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import File from 'smartComponents/File';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import Name from 'smartComponents/Organisation/parts/Name';
import OrganisationPhoto from 'smartComponents/Organisation/parts/Photo';
import { VARIANTS } from 'variantsConstants';
import Box from '@material-ui/core/Box';
import { LOGIC_HELPERS } from '../../../../utils/helpers/logic';

const useStyles = makeStyles(() => ({
  root: {},
  header: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#595F6F',
  },
  tourBy: {
    color: '#595F6F',
    fontWeight: 400,
    fontSize: 14,
  },
}));

const useTourSpecificBanner = ({ id }) => {
  const photos = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodePhotos(state, id),
  );
  return useSelector(state =>
    FILE_STORE_RESELECTORS.getTourBanner(state, photos),
  );
};

export const TourBannerPhoto = memo(
  ({ id, smDown, renderAssignedOrganiser }) => {
    const classes = useStyles();
    const organisationId = useSelector(state =>
      NODE_STORE_RESELECTORS.getOrganisationId(state, id),
    );

    const tourBannerPhoto = useTourSpecificBanner({ id });
    const isTemplatePhoto = !!tourBannerPhoto;

    let renderTourHeader = (
      <File
        id={tourBannerPhoto}
        size={IMAGE_SIZES_CONSTANTS.LANDSCAPE_SM}
        variant={VARIANTS.READ_ONLY}
        isTemplatePhoto={isTemplatePhoto}
        data-testid="tour-banner-photo"
      />
    );

    if (!isTemplatePhoto && organisationId) {
      renderTourHeader = (
        <GridContainer alignItems="center" wrap="nowrap">
          <OrganisationPhoto
            variant={VARIANTS.READ_ONLY}
            id={organisationId}
            component={GridItem}
            size={LOGIC_HELPERS.ifElse(
              smDown,
              IMAGE_SIZES_CONSTANTS.SMALL,
              IMAGE_SIZES_CONSTANTS.LANDSCAPE_SM,
            )}
          />
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem className={classes.header}>
                <JText md bolder>
                  Travel By
                </JText>
              </GridItem>

              <GridItem>
                <div
                  className={classnames('j-text-ellipsis', classes.tourBy)}
                  data-testid="tour-banner-organisation-name"
                >
                  <Name id={organisationId} variant={VARIANTS.STRING_ONLY} />
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      );
    }

    return (
      <>
        {isTemplatePhoto && (
          <GridItem md={8} sm={6} xs={12}>
            <Box pr={1} pl={1}>
              {renderTourHeader}
            </Box>
          </GridItem>
        )}
        {!isTemplatePhoto && organisationId && (
          <GridItem md={8} sm={6} xs={12}>
            <Box pr={1} pl={1}>
              {renderTourHeader}
            </Box>
          </GridItem>
        )}
        {renderAssignedOrganiser(smDown && isTemplatePhoto)}
      </>
    );
  },
);

TourBannerPhoto.propTypes = {
  id: PropTypes.number,
  smDown: PropTypes.bool,
  renderAssignedOrganiser: PropTypes.func,
};
