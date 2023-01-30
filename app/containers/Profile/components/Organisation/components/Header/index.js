import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Container from 'components/Container';
import EditHeaderForm from 'smartComponents/Organisation/components/EditHeaderForm';
import ProfilePhoto from 'smartComponents/Organisation/parts/Photo';
import { IMAGE_VARIANTS_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import { ORGANISATION_SETTING } from 'utils/modelConstants';
import { ability } from 'apis/components/Ability/ability';
import { CONFIG } from './config';
import styles from './styles';

export class Header extends PureComponent {
  hasOrgSettingAccess = () => ability.can('execute', ORGANISATION_SETTING);

  render = () => {
    const { classes, orgId } = this.props;
    const hasAccess = this.hasOrgSettingAccess();
    const placeholderProps = {
      showIconOnHover: true,
      deleteIcon: true,
    };
    return (
      <Container>
        <GridContainer spacing={0} className={classes.root}>
          <GridItem sm={10} md={10}>
            <EditHeaderForm id={orgId} readOnly={!hasAccess} />
          </GridItem>
          <GridItem sm={2} md={2} className={classes.photoContainer}>
            <ProfilePhoto
              id={orgId}
              variant={IMAGE_VARIANTS_CONSTANTS.SQUARE}
              editable={hasAccess}
              placeholderProps={placeholderProps}
            />
          </GridItem>
        </GridContainer>
      </Container>
    );
  };
}

Header.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  orgId: PropTypes.number.isRequired,

  // resaga props
};

Header.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Header' }),
  resaga(CONFIG),
)(Header);
