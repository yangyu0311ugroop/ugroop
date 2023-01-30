import { Hidden } from '@material-ui/core';
import { CONTENT, URL_HELPERS } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import get from 'lodash/get';
import resaga from 'resaga';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import Star from 'smartComponents/Node/components/Star';
import Photo from 'smartComponents/Node/parts/Photo';
import StartDate from 'smartComponents/Node/parts/StartDate';
import LastUpdateAt from 'smartComponents/RecentActivity/parts/LastUpdateAt';
import Icon from 'ugcomponents/Icon';
import NavLink from 'ugcomponents/NavLink';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';

export class Card extends PureComponent {
  renderTitle = () => {
    const { classes, id } = this.props;

    return (
      <GridItem className={classnames(classes.ellipsisDiv, classes.relative1)}>
        <NodeProp
          id={id}
          valueKey={CONTENT}
          editable={false}
          showEmpty
          ellipsis
          className={classes.content}
          ellipsisClassName={classes.ellipsisDiv}
        />
      </GridItem>
    );
  };

  renderLastViewed = ({ timeSince, time }) => {
    const { classes } = this.props;

    return (
      <GridItem>
        <div className={classes.subTitle} title={`Last viewed by you: ${time}`}>
          <GridContainer alignItems="center" spacing={0}>
            <GridItem>
              <Icon bold icon="lnr-eye" size="xsmall" paddingRight />
            </GridItem>
            <GridItem>{timeSince}</GridItem>
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  renderStartDate = ({ content }) => {
    const { classes } = this.props;

    return (
      <GridItem>
        <div className={classes.subTitle} title={`Starts ${content}`}>
          <GridContainer alignItems="center" spacing={0}>
            <GridItem>
              <Icon bold icon="lnr-calendar-full" size="xsmall" paddingRight />
            </GridItem>
            <GridItem>{content}</GridItem>
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  renderShared = () => {
    const { classes, personal, featuredTour, me, createdBy } = this.props;

    // do not render if this is organisation tour, or user is the owner
    if (!personal) return null;

    if (featuredTour) {
      return (
        <GridItem title="Featured">
          <div className={classes.subTitle}>
            <Icon bold color="gray" size="xsmall" icon="lnr-earth" />
          </div>
        </GridItem>
      );
    }

    const ownerId = get(createdBy, 'id', createdBy);

    if (me === ownerId) return null;

    return (
      <GridItem title="Shared">
        <div className={classes.subTitle}>
          <Icon bold color="gray" size="xsmall" icon="lnr-users" />
        </div>
      </GridItem>
    );
  };

  renderSubtitle = () => {
    const { classes, id } = this.props;

    return (
      <GridItem className={classes.relative1}>
        <GridContainer alignItems="center">
          <Hidden smDown>
            <LastUpdateAt id={id}>{this.renderLastViewed}</LastUpdateAt>
          </Hidden>
          <StartDate id={id} shorten>
            {this.renderStartDate}
          </StartDate>
          {this.renderShared()}
        </GridContainer>
      </GridItem>
    );
  };

  renderPhoto = () => {
    const { classes, id } = this.props;

    return (
      <div className={classnames(classes.tourPhoto, classes.absolute)}>
        <Photo
          resizeSize={500}
          editable={false}
          showPreview={false}
          id={id}
          classNames={{
            imageClassName: classes.minHeightUnset,
            containerClassName: classes.minHeightUnset,
          }}
          overlayClassName={classes.overlay}
        />
      </div>
    );
  };

  renderStarButton = ({ starred, ...props }) => {
    const { classes } = this.props;

    return (
      <Button
        dense
        size="extraSmall"
        className={classnames(
          LOGIC_HELPERS.ifElse(starred, classes.unstar, classes.starred),
        )}
        {...props}
      >
        <Icon size="normal" bold icon="lnr-star" />
      </Button>
    );
  };

  render = () => {
    const { classes, id } = this.props;

    return (
      <div className={classes.relative}>
        <NavLink to={URL_HELPERS.tours(id)}>
          <div className={classnames(classes.grid, classes.tourGrid)}>
            <GridContainer direction="column" spacing={0}>
              {this.renderTitle()}
              {this.renderSubtitle()}
              {this.renderPhoto()}
            </GridContainer>
          </div>
        </NavLink>

        <Star id={id}>{this.renderStarButton}</Star>
      </div>
    );
  };
}

Card.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  personal: PropTypes.bool,
  minimise: PropTypes.bool,
  featuredTour: PropTypes.bool,

  // resaga props
  me: PropTypes.number,
  createdBy: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

Card.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Card' }),
  resaga(CONFIG),
)(Card);
