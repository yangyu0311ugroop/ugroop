import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Name from '../../Organisation/parts/Name';
import { makeSelectPublished } from '../../../containers/MarketPlace/dataStore/selectors';
import Item from '../../Card/components/OrganisationCard/components/Item';
import OrganisationPhoto from '../../Organisation/parts/Photo';
import { VARIANTS } from '../../../variantsConstants';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from '../../File/types/Photo/constants';
import { Span } from '../../../viewComponents/Typography';
import { makeStyles } from '../../../components/material-ui';

const style = ({ colors }) => ({
  publishBy: {
    width: 150,
    color: colors.shuttleGrey,
    fontSize: '14.4px',
  },
});
const useStyles = makeStyles(style);
function PublishedBy(props) {
  const classes = useStyles();
  const { publisher, by, showImage } = props;
  const photoProps = {
    shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
    variant: VARIANTS.READ_ONLY,
    size: IMAGE_SIZES_CONSTANTS.SMALL,
  };
  const photo = () => (
    <OrganisationPhoto id={publisher.orgId} {...photoProps} />
  );

  const heading = () => (
    <Name id={publisher.orgId} variant={VARIANTS.STRING_ONLY} />
  );
  const renderAvatarAndName = () => {
    if (!publisher) {
      return null;
    }
    return (
      <GridContainer alignItems="center" spacing={0}>
        <GridItem>
          <Span color="shuttleGrey">{by}&nbsp;</Span>
        </GridItem>
        <GridItem>
          <Item
            showImage={showImage}
            reserveLeft
            photo={photo()}
            heading={heading()}
            useNaviLink={false}
            ellipsis
            ellipsisClassName={classes.publishBy}
          />
        </GridItem>
      </GridContainer>
    );
  };

  return renderAvatarAndName();
}

PublishedBy.propTypes = {
  // parent props
  id: PropTypes.number, // node id
  publisher: PropTypes.object,
  by: PropTypes.string,
  showImage: PropTypes.bool,
};

PublishedBy.defaultProps = {
  by: 'by',
  showImage: true,
};

const mapStateToProps = createStructuredSelector({
  publisher: makeSelectPublished,
});

export default compose(
  connect(
    mapStateToProps,
    null,
  ),
)(React.memo(PublishedBy));
