import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { VARIANTS } from 'variantsConstants';
import PropTypes from 'prop-types';
import CheckGroups from 'smartComponents/Node/components/Checkgroups';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import Icon from 'ugcomponents/Icon';
import Button from 'viewComponents/Button';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';

export class Overview extends PureComponent {
  state = {
    showAsContent: false,
  };

  renderHeader = () => {
    const { classes, renderHeader } = this.props;
    if (!renderHeader) return null;
    return (
      <GridItem className={classes.header}>
        <GridContainer>
          <GridItem className={classes.headerGrid}>{renderHeader()}</GridItem>
          <GridItem className={classes.popperGrid}>
            {this.renderSelect()}
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  onSelectItem = data => () => this.setState({ showAsContent: data });

  renderButton = ({ openMenu }) => {
    const { classes } = this.props;
    return (
      <Button
        dense
        color="primary"
        size="xs"
        onClick={openMenu}
        buttonTitle="Overview Options"
        variant={VARIANTS.OUTLINE}
        className={classes.simpleButton}
      >
        <Icon
          icon={LOGIC_HELPERS.ifElse(
            this.state.showAsContent,
            'lnr-list2',
            'lnr-icons',
          )}
        />
      </Button>
    );
  };

  renderMenuItems = ({ closeMenu }) => {
    const { classes } = this.props;
    const { showAsContent } = this.state;
    return (
      <React.Fragment>
        <MenuItem
          onClick={this.onSelectItem(false)}
          closeMenu={closeMenu}
          selected={!showAsContent}
        >
          <Icon icon="lnr-list2" className={classes.icon} size="xs" />
          Show as Icon
        </MenuItem>
        <MenuItem
          onClick={this.onSelectItem(true)}
          closeMenu={closeMenu}
          selected={showAsContent}
        >
          <Icon icon="lnr-icons" className={classes.icon} size="xs" />
          Show as Label
        </MenuItem>
      </React.Fragment>
    );
  };

  renderSelect = () => {
    const { classes } = this.props;
    return (
      <GridItem>
        <Popper
          className={classes.popperRoot}
          renderButton={this.renderButton}
          placement="bottom-end"
          halfPadding
          showAsContent={this.state.showAsContent}
          menuHeader="Overview Options"
        >
          {this.renderMenuItems}
        </Popper>
      </GridItem>
    );
  };

  render = () => {
    const { classes, parentNodeId } = this.props;
    const { showAsContent } = this.state;
    return (
      <GridContainer
        card
        dense
        direction="column"
        className={classes.root}
        wrap="nowrap"
        spacing={0}
      >
        {this.renderHeader()}
        <GridItem className={classes.checklistGrid}>
          <CheckGroups
            parentNodeId={parentNodeId}
            variant={VARIANTS.LIST_ONLY}
            showIconAsContent={showAsContent}
          />
        </GridItem>
      </GridContainer>
    );
  };
}

Overview.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  renderHeader: PropTypes.func,

  // Parent
  parentNodeId: PropTypes.number,
};

Overview.defaultProps = {};
export default compose(
  withRouter,
  withStyles(styles, { name: 'Overview' }),
)(Overview);
