import React, { PureComponent } from 'react';
import GridContainer from 'components/GridContainer';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage as M } from 'react-intl';
import { Online, Offline } from 'react-detect-offline';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Loading from 'react-loading';
import m from './messages';
import styles from './styles';

export class TemplateShowMore extends PureComponent {
  onEnter = () => {
    this.props.onClick();
  };

  shouldDisplayNone = () => this.props.fetchLength !== this.props.fetchLimit;

  renderNone = () => (
    <GridContainer
      spacing={0}
      className={this.props.classes.root}
      alignItems="center"
      justify="center"
    >
      <div />
    </GridContainer>
  );

  renderLoading = () => (
    <GridContainer
      spacing={0}
      className={this.props.classes.root}
      alignItems="center"
      justify="center"
    >
      <Loading type="spin" width={24} height={24} />
    </GridContainer>
  );

  render = () => {
    const { classes, isFetching } = this.props;

    if (this.shouldDisplayNone()) {
      return this.renderNone();
    }

    if (isFetching) {
      return this.renderLoading();
    }

    return (
      <GridContainer
        spacing={0}
        className={classes.root}
        alignItems="center"
        justify="center"
      >
        <Online>
          <Waypoint onEnter={this.onEnter}>
            <div>
              <M {...m.btnText} />
            </div>
          </Waypoint>
        </Online>
        <Offline>
          <M {...m.offlineText} />
        </Offline>
      </GridContainer>
    );
  };
}

TemplateShowMore.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  fetchLength: PropTypes.number.isRequired,
  fetchLimit: PropTypes.number.isRequired,
  isFetching: PropTypes.bool,
};

TemplateShowMore.defaultProps = {
  isFetching: false,
};

export default withStyles(styles, { name: 'TemplateShowMore' })(
  TemplateShowMore,
);
