import { HIDE_RECENT_ACTIVITY, USER_API } from 'apis/constants';
import { CONTENT, URL_HELPERS } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import Star from 'smartComponents/Node/components/Star';
import OrganisationName from 'smartComponents/Node/parts/OrganisationName';
import Photo from 'smartComponents/Node/parts/Photo';
import Icon from 'ugcomponents/Icon';
import NavLink from 'ugcomponents/NavLink';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';

export class Compressed extends PureComponent {
  componentWillMount = () => {
    const { classes } = this.props;

    this.photoClassNames = {
      containerClassName: classes.templateImageContainer,
    };
    this.photoPlaceholderProps = { showOverlay: false };
  };

  isActive = () => false;

  handleClickTour = e => {
    const { id, onClick, closeMenu } = this.props;

    LOGIC_HELPERS.ifFunction(onClick, [id]);
    LOGIC_HELPERS.ifFunction(closeMenu, [e]);

    // this.props.resaga.setValue({ id });
  };

  removeRecent = event => {
    event.stopPropagation();

    const { id: nodeId } = this.props;

    this.props.resaga.dispatchTo(USER_API, HIDE_RECENT_ACTIVITY, {
      payload: { nodeId },
    });
  };

  renderStarButton = ({ starred, ...props }) => {
    const { classes } = this.props;

    return (
      <Button
        dense
        size="extraSmall"
        className={classnames(
          LOGIC_HELPERS.ifElse(
            starred,
            classes.unstarCompressed,
            classes.starredCompressed,
          ),
        )}
        {...props}
      >
        <Icon size="normal" bold icon="lnr-star" />
      </Button>
    );
  };

  renderContent = ({ starred }) => {
    const { id, classes, showOrganisation } = this.props;

    return (
      <>
        <GridItem>
          <NodeProp
            id={id}
            valueKey={CONTENT}
            editable={false}
            showEmpty
            ellipsis
            className={classes.contentCompressed}
            ellipsisClassName={LOGIC_HELPERS.ifElse(
              starred,
              classes.ellipsisStarredCompressed,
              classes.ellipsisDivCompressed,
            )}
          />
        </GridItem>
        {showOrganisation && (
          <OrganisationName
            id={id}
            component={GridItem}
            className={classes.orgName}
            ellipsisClassName={LOGIC_HELPERS.ifElse(
              starred,
              classes.ellipsisStarredCompressed,
              classes.ellipsisDivCompressed,
            )}
          />
        )}
      </>
    );
  };

  render = () => {
    const { id, recent, classes, showOrganisation } = this.props;

    return (
      <GridItem key={id} className={classes.fullWidth}>
        <div
          className={classnames(
            classes.tourGridCompressed,
            classes.relativeCompressed,
          )}
        >
          <NavLink
            to={URL_HELPERS.tours(id)}
            className={classes.linkCompressed}
            onClick={this.handleClickTour}
            isActive={this.isActive}
          >
            <GridContainer alignItems="center" spacing={0}>
              <GridItem
                className={classnames(
                  classes.grow,
                  classes.tourTitle,
                  LOGIC_HELPERS.ifElse(
                    showOrganisation,
                    classes.padding4,
                    classes.padding8,
                  ),
                )}
              >
                <div className={classes.tourContent}>
                  <GridContainer direction="column" spacing={0}>
                    <GridItem>
                      <Star id={id}>{this.renderContent}</Star>
                    </GridItem>
                  </GridContainer>
                </div>
              </GridItem>

              <div className={classes.tourPhotoCompressed}>
                <Photo
                  resizeSize={256}
                  placeholderProps={this.photoPlaceholderProps}
                  editable={false}
                  id={id}
                  classNames={this.photoClassNames}
                />
              </div>
            </GridContainer>
          </NavLink>

          {recent && (
            <Button
              dense
              size="extraSmall"
              className={classes.removeRecent}
              onClick={this.removeRecent}
              buttonTitle="Click to remove this from your recently viewed list."
            >
              <Icon size="small" bold icon="lnr-cross2" />
            </Button>
          )}
          <Star id={id} stopPropagation>
            {this.renderStarButton}
          </Star>
        </div>
      </GridItem>
    );
  };
}

Compressed.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  recent: PropTypes.bool,
  showOrganisation: PropTypes.bool,
  onClick: PropTypes.func,
  closeMenu: PropTypes.func,

  // resaga props
};

Compressed.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Compressed' }),
  resaga(CONFIG),
)(Compressed);
