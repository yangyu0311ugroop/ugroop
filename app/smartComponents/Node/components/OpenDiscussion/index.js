import { withStyles } from '@material-ui/core/styles';
import { BADGE, DEFAULT, DO_NOTHING, READ_ONLY } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DAY } from 'utils/modelConstants';
import { STRING_ADDITIONS } from 'utils/stringAdditions';
import Button from 'viewComponents/Button';
import { InlineButton } from 'ugcomponents/Buttons';
import { makeSelectTourChatsCount } from 'datastore/streamChat/selectors';
import { createStructuredSelector } from 'reselect';
import styles from './styles';
import { VARIANTS } from '../../../../variantsConstants';

export class OpenDiscussion extends PureComponent {
  className = () => {
    const { classes, className } = this.props;

    return classnames(classes.actionButton, className);
  };

  handleClick = () => {
    const { type, onClick } = this.props;

    if (typeof onClick === 'function') {
      return onClick();
    }

    if (type === DAY) {
      return this.openDayComment();
    }

    return DO_NOTHING;
  };

  renderBadge = () => {
    const { classes, count } = this.props;

    if (!count) return null;

    return (
      <GridItem>
        <div className={classes.discussionBadge}>
          <span className={classes.unresolvedBadge}>{count}</span>
        </div>
      </GridItem>
    );
  };

  renderReadOnly = () => {
    const { size, label } = this.props;

    return (
      <GridContainer alignItems="center" spacing={0} wrap="nowrap">
        {!!label && <GridItem>{label}</GridItem>}
        <GridItem>
          <Icon icon="bubbles" size={size} paddingLeft={!!label} />
        </GridItem>
        {this.renderBadge()}
      </GridContainer>
    );
  };

  renderUnresolvedTopics = () => {
    const count = this.props.count;

    if (!count) {
      return 'Discussion Groups & Chat';
    }

    return `${count} unread ${STRING_ADDITIONS.pluralizeText(
      'message',
      count,
    )}`;
  };

  renderBadgeButton = () => {
    const { className } = this.props;

    return (
      <InlineButton
        offsetLeft
        offsetRight
        onClick={this.handleClick}
        className={classnames(className)}
        title={this.renderUnresolvedTopics()}
      >
        {this.renderReadOnly()}
      </InlineButton>
    );
  };

  renderButton = () => {
    const { classes, className, tooltipProps, buttonProps } = this.props;

    return (
      <Button
        dense
        noPadding
        size="extraSmall"
        color="black"
        onClick={this.handleClick}
        className={classnames(classes.actionButton, className)}
        title={this.renderUnresolvedTopics()}
        tooltipProps={tooltipProps}
        {...buttonProps}
      >
        {this.renderReadOnly()}
      </Button>
    );
  };

  renderInline = () => (
    <Button
      dense
      size="xs"
      color="black"
      onClick={this.handleClick}
      variant="outline"
    >
      {this.renderReadOnly()}
    </Button>
  );

  render = () => {
    const { variant, showEmpty } = this.props;
    if (!this.props.count && !showEmpty) {
      return null;
    }

    const content = LOGIC_HELPERS.switchCase(variant, {
      [READ_ONLY]: this.renderReadOnly,
      [BADGE]: this.renderBadgeButton,
      [VARIANTS.INLINE]: this.renderInline,
      [DEFAULT]: this.renderButton,
    });

    return content;
  };
}
OpenDiscussion.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  showEmpty: PropTypes.bool,
  tooltipProps: PropTypes.object,
  count: PropTypes.number,
  buttonProps: PropTypes.object,
  children: PropTypes.any,
  label: PropTypes.any,
};

OpenDiscussion.defaultProps = {
  size: 'small',
  showEmpty: true,
  tooltipProps: {
    placement: 'bottom',
  },
  buttonProps: {},
};

const mapStateToProps = createStructuredSelector({
  count: makeSelectTourChatsCount,
});

export default compose(
  connect(
    mapStateToProps,
    null,
  ),
  withStyles(styles, { name: 'OpenDiscussion' }),
)(OpenDiscussion);
