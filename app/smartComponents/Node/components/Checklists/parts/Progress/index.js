import {
  COMPLETED_MESSAGE,
  DEFAULT,
  PROGRESS_BAR,
  SUMMARY,
  TOTAL,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { BadgeProgress } from 'smartComponents/Node/parts/index';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { InlineButton } from 'ugcomponents/Buttons';
import styles from './styles';

export class Progress extends PureComponent {
  showCompletedLabel = () => {
    const { selected, showCompleted } = this.props;

    const item = LOGIC_HELPERS.ifElse(selected > 1, 'items', 'item');
    return LOGIC_HELPERS.ifElse(
      showCompleted,
      `Hide completed ${item}`,
      `Show completed ${item}`,
    );
  };

  toggleShowCompleted = event => {
    const { toggleShowCompleted } = this.props;

    LOGIC_HELPERS.ifFunction(toggleShowCompleted, [event]);
  };

  renderToggleShowCompleted = () => {
    const { selected } = this.props;

    if (!selected) {
      return null;
    }

    return (
      <Hidden smDown>
        <GridItem>
          <InlineButton onClick={this.toggleShowCompleted}>
            {this.showCompletedLabel()}
          </InlineButton>
        </GridItem>
      </Hidden>
    );
  };

  renderCompletedMessage = () => {
    const { id, showCompleted, completedMessageClassName } = this.props;

    if (showCompleted) {
      return null;
    }

    return (
      <GridItem>
        <BadgeProgress
          id={id}
          variant={COMPLETED_MESSAGE}
          className={classnames(completedMessageClassName)}
        />
      </GridItem>
    );
  };

  renderProgress = () => {
    const {
      classes,
      id,
      showCompleted,
      showOutstanding,
      toggleShowCompleted,
      toggleShowOutstanding,
    } = this.props;

    return (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <div className={classes.subHeader}>
              <BadgeProgress
                id={id}
                variant={SUMMARY}
                showCompleted={showCompleted}
                showOutstanding={showOutstanding}
                toggleShowCompleted={toggleShowCompleted}
                toggleShowOutstanding={toggleShowOutstanding}
              />
            </div>
          </GridItem>
          <GridItem>
            <BadgeProgress
              id={id}
              variant={PROGRESS_BAR}
              className={classes.progress}
              size="xs"
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderTotal = () => {
    const {
      classes,
      id,
      showCompleted,
      showOutstanding,
      toggleShowCompleted,
      toggleShowOutstanding,
    } = this.props;

    return (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <GridItem className={classes.totalGrid}>
            <div className={classes.subHeaderTotal}>
              <BadgeProgress
                id={id}
                variant={TOTAL}
                showCompleted={showCompleted}
                showOutstanding={showOutstanding}
                toggleShowCompleted={toggleShowCompleted}
                toggleShowOutstanding={toggleShowOutstanding}
              />
            </div>
          </GridItem>
          <GridItem>
            <BadgeProgress
              id={id}
              variant={PROGRESS_BAR}
              className={classes.progress}
              size="xs"
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderDefault = () => (
    <GridContainer direction="column" spacing={0}>
      {this.renderProgress()}
      {this.renderCompletedMessage()}
    </GridContainer>
  );

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [TOTAL]: this.renderTotal,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Progress.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  selected: PropTypes.number,
  showCompleted: PropTypes.bool,
  showOutstanding: PropTypes.bool,
  toggleShowCompleted: PropTypes.func,
  toggleShowOutstanding: PropTypes.func,
  completedMessageClassName: PropTypes.string,
  variant: PropTypes.string,

  // resaga props
};

Progress.defaultProps = {
  id: 0,
  selected: 0,
  showCompleted: false,
  showOutstanding: true,
  completedMessageClassName: '',
};

export default compose(withStyles(styles, { name: 'Progress' }))(Progress);
