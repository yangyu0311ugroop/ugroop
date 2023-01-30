import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import PersonPhoto from 'smartComponents/Person/parts/Photo';
import { VARIANTS } from 'variantsConstants';
import { CONFIG } from './config';
import styles from './styles';

export class InvitationTooltip extends PureComponent {
  componentWillMount = () => {
    this.personPhotoProps = {
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.XS,
    };
  };

  render = () => {
    const { shareFrom } = this.props;

    return (
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem>
          <PersonPhoto id={shareFrom} {...this.personPhotoProps} />
        </GridItem>
        <GridItem>
          New tour invitation from{' '}
          <b>
            <KnownAs id={shareFrom} variant={VARIANTS.STRING_ONLY} />
          </b>
        </GridItem>
      </GridContainer>
    );
  };
}

InvitationTooltip.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
  shareFrom: PropTypes.number,
};

InvitationTooltip.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'InvitationTooltip' }),
  resaga(CONFIG),
)(InvitationTooltip);
