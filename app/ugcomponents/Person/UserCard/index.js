import { Hidden } from '@material-ui/core';
import { VIEW_MODE_COPY } from 'appConstants';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import { CloseButton } from 'ugcomponents/DialogForm/Complex';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import { Photo } from 'smartComponents/File/types';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Email from 'smartComponents/Person/parts/Email';
import classnames from 'classnames';
import { VARIANTS } from 'variantsConstants';
import Tooltip from '@material-ui/core/Tooltip';
import { CONFIG } from './config';
import styles from './styles';

// TODO: temporary style
export class UserCard extends PureComponent {
  renderPhoto = () => {
    const { classes, photo } = this.props;
    if (!photo) {
      return <div className={classes.photoPlaceHolder} />;
    }

    return (
      <GridItem className={classes.photoContainer}>
        <Photo
          id={photo}
          editable={false}
          size={IMAGE_SIZES_CONSTANTS.XL}
          shape={IMAGE_VARIANTS_CONSTANTS.SQUARE}
          variant={VARIANTS.READ_ONLY}
        />
      </GridItem>
    );
  };

  renderName = () => {
    const { classes, knownAs } = this.props;
    if (!knownAs) {
      return null;
    }

    const charCountEllip = knownAs.length;
    return charCountEllip >= 38 ? (
      <Tooltip placement="top" title={knownAs}>
        <div className={classnames('j-text-ellipsis', classes.name)}>
          {knownAs}
        </div>
      </Tooltip>
    ) : (
      <div className={classnames('j-text-ellipsis', classes.name)}>
        {knownAs}
      </div>
    );
  };

  renderEmail = () => {
    const {
      classes,
      id,
      updatedEmail,
      emailSubjectLink,
      emailBodyLink,
      dataStore,
    } = this.props;
    return (
      <div>
        <Email
          id={id}
          variant={VIEW_MODE_COPY}
          updatedEmail={updatedEmail}
          link
          dark
          className={classes.anchor}
          emailSubjectLink={emailSubjectLink}
          emailBodyLink={emailBodyLink}
          dataStore={dataStore}
        />
      </div>
    );
  };

  render = () => {
    const { classes, close } = this.props;

    /*  if (!id) {
      return null;
    } */

    return (
      <GridContainer
        className={classes.container}
        direction="column"
        spacing={0}
      >
        <Hidden smDown>
          <div className={classnames(classes.photoHeader)} />
        </Hidden>
        <Hidden mdUp>
          <div className={classnames(classes.photoHeaderUp)} />
        </Hidden>
        {this.renderPhoto()}
        <Hidden smDown>
          <div className={classes.iconContainer}>
            <CloseButton
              onClick={close}
              className={classes.closeBtn}
              hoverGrayMode
            />
          </div>
        </Hidden>
        <Hidden smUp>
          <div className={classes.iconContainerUp}>
            <CloseButton
              onClick={close}
              className={classes.closeBtn}
              hoverGrayMode
            />
          </div>
        </Hidden>
        <GridItem>
          <GridContainer direction="column" className={classes.root}>
            <div className={classes.nameContainer}>
              <div className={classes.nameContent}>
                {this.renderName()}
                {this.renderEmail()}
              </div>
            </div>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

UserCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  knownAs: PropTypes.node,
  close: PropTypes.func,
  updatedEmail: PropTypes.string,
  emailSubjectLink: PropTypes.string,
  emailBodyLink: PropTypes.string,
  dataStore: PropTypes.string,

  // resaga props
  photo: PropTypes.string,
};

UserCard.defaultProps = {
  id: 0,
  knownAs: '',
  photo: '',
  updatedEmail: '',
};

export default compose(
  withStyles(styles, { name: 'UserCard' }),
  resaga(CONFIG),
)(UserCard);
