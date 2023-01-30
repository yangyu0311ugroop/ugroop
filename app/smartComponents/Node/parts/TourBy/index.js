import { AVATAR_AND_NAME_TEXT, TEXT } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import CreatedBy from 'smartComponents/Node/parts/CreatedBy';
import OrganisationName from 'smartComponents/Organisation/parts/Name';
import OrganisationPhoto from 'smartComponents/Organisation/parts/Photo';
import { VARIANTS } from 'variantsConstants';
import classnames from 'classnames';
import { CONFIG } from './config';
import styles from './styles';

export class TourBy extends PureComponent {
  componentWillMount = () => {
    this.photoProps = {
      shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.XXXS,
    };
  };

  render = () => {
    const { component: Component, classes, organisationId, id } = this.props;

    if (organisationId) {
      return (
        <Component>
          <GridContainer
            alignItems="center"
            wrap="nowrap"
            className={classes.branding}
          >
            <OrganisationPhoto
              id={organisationId}
              {...this.photoProps}
              component={GridItem}
            />
            <GridItem>
              <OrganisationName
                id={organisationId}
                variant={TEXT}
                className="j-text-ellipsis"
              />
            </GridItem>
          </GridContainer>
        </Component>
      );
    }

    return (
      <Component>
        <CreatedBy
          id={id}
          variant={AVATAR_AND_NAME_TEXT}
          bold={false}
          className={classes.branding}
          textClassName={classnames(classes.createdBy, 'j-text-ellipsis')}
        >
          <GridItem>(Personal)</GridItem>
        </CreatedBy>
      </Component>
    );
  };
}

TourBy.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  component: PropTypes.any,
  id: PropTypes.number,

  // resaga props
  organisationId: PropTypes.number,
};

TourBy.defaultProps = {
  component: 'span',
};

export default compose(
  withStyles(styles, { name: 'TourBy' }),
  resaga(CONFIG),
)(TourBy);
