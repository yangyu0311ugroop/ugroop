import { withStyles } from '@material-ui/core/styles';
import { MY, MY_TOURS, ORGANISATION_TOURS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';

import Breadcrumbs from 'containers/Templates/Components/TemplateBreadcrumbs';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { parseQueryParam } from 'utils/helpers/url';
import OrganisationPhoto from 'smartComponents/Organisation/parts/Photo';
import Box from '@material-ui/core/Box';
import { CONFIG } from './config';
import styles from './styles';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from '../../../../../../smartComponents/File/types/Photo/constants';
import { VARIANTS } from '../../../../../../variantsConstants';
import JText from '../../../../../../components/JText';
import PersonPhoto from '../../../../../../smartComponents/Person/parts/Photo';

export function Header(props) {
  // eslint-disable-next-line no-alert

  const {
    isFetchingInitialContent,
    location,
    folderId,
    folderName,
    currentRoute,
    organisationId,
    organisationName,
    showBreadCrumbs,
    userId,
  } = props;

  const orgPhoto = (
    <OrganisationPhoto
      id={Number.parseInt(organisationId, 10)}
      shape={IMAGE_VARIANTS_CONSTANTS.SQUARE}
      variant={VARIANTS.READ_ONLY}
      size={IMAGE_SIZES_CONSTANTS.XS}
      component={GridItem}
    />
  );
  const personPhoto = (
    <PersonPhoto
      id={userId}
      shape={IMAGE_VARIANTS_CONSTANTS.SQUARE}
      variant={VARIANTS.READ_ONLY}
      size={IMAGE_SIZES_CONSTANTS.XS}
    />
  );

  const parsedSearch = parseQueryParam(location.search);
  const rootName = LOGIC_HELPERS.ifElse(
    currentRoute === MY,
    MY_TOURS,
    ORGANISATION_TOURS,
  );
  let hText = parsedSearch.current
    ? NODE_STORE_HELPERS.translateContent(folderName)
    : rootName;

  if (isFetchingInitialContent) {
    hText = 'Loading';
  }

  return (
    <React.Fragment>
      <Box mb={1} mt={1}>
        <GridContainer alignItems="center">
          <GridItem>
            {LOGIC_HELPERS.ifElse(organisationId, orgPhoto, personPhoto)}
          </GridItem>
          <GridItem>
            <JText xl bold>
              {LOGIC_HELPERS.ifElse(organisationId, organisationName, hText)}
            </JText>
          </GridItem>
        </GridContainer>
        {showBreadCrumbs && (
          <GridContainer>
            <GridItem md={9}>
              <Breadcrumbs
                rootName={rootName}
                itemsUrl={`${currentRoute}?current=`}
                rootUrl={`${currentRoute}`}
                folderId={folderId}
              />
            </GridItem>
          </GridContainer>
        )}
      </Box>
    </React.Fragment>
  );
}

Header.propTypes = {
  // hoc props
  // eslint-disable-next-line react/no-unused-prop-types
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

  // parent props
  folderId: PropTypes.number.isRequired,
  currentRoute: PropTypes.string,
  organisationId: PropTypes.number,
  showBreadCrumbs: PropTypes.bool,
  // resaga props
  folderName: PropTypes.string,
  organisationName: PropTypes.string,

  // resaga loading props
  isFetchingInitialContent: PropTypes.bool,
  userId: PropTypes.number,
};

Header.defaultProps = {
  isFetchingInitialContent: false,
  folderName: '',
  showBreadCrumbs: true,
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'Header' }),
  resaga(CONFIG),
)(React.memo(Header));
