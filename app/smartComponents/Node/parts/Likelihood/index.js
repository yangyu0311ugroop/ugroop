import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import Popper from 'components/Popper';
import MenuButton from 'components/Popper/components/MenuButton';
import MenuItem from 'components/Popper/components/MenuItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import RatingButton from 'smartComponents/Node/components/Rating/components/RatingButton';
import { LIKELIHOOD_LEVELS } from 'smartComponents/Node/components/Rating/components/RatingForm';
import Headx from 'ugcomponents/Headx';
import Icon from 'ugcomponents/Icon';
import { CONFIG } from './config';
import styles from './styles';

export class Likelihood extends PureComponent {
  value = () => {
    const { classes, value: numb } = this.props;

    const props = LIKELIHOOD_LEVELS[numb];

    return <RatingButton {...props} active className={classes.button} />;
  };

  handleChange = value => () => {
    const { id, type } = this.props;

    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        node: {
          type,
          customData: { likelihood: value },
        },
      },
      this.props,
    );
  };

  renderButton = ({ openMenu }) => {
    const { classes } = this.props;

    return (
      <MenuButton onClick={openMenu} className={classes.button} dense={false}>
        <GridContainer alignItems="center" spacing={0}>
          <GridItem>{this.value()}</GridItem>
          <GridItem>
            <Icon size="xsmall" icon="lnr-chevron-down" paddingLeft />
          </GridItem>
        </GridContainer>
      </MenuButton>
    );
  };

  renderMenu = ({ closeMenu, value }) => (
    <GridContainer direction="column" spacing={0}>
      <GridItem>
        <MenuItem
          selected={value === 0}
          closeMenu={closeMenu}
          onClick={this.handleChange(0)}
        >
          <b>Rare</b>: Potential, exceptional time
        </MenuItem>
      </GridItem>
      <GridItem>
        <MenuItem
          selected={value === 1}
          closeMenu={closeMenu}
          onClick={this.handleChange(1)}
        >
          <b>Unlikely</b>: Potential, some time
        </MenuItem>
      </GridItem>
      <GridItem>
        <MenuItem
          selected={value === 2}
          closeMenu={closeMenu}
          onClick={this.handleChange(2)}
        >
          <b>Possible</b>: occasionally
        </MenuItem>
      </GridItem>
      <GridItem>
        <MenuItem
          selected={value === 3}
          closeMenu={closeMenu}
          onClick={this.handleChange(3)}
        >
          <b>Very Likely</b>: Probable, most circumstances
        </MenuItem>
      </GridItem>
      <GridItem>
        <MenuItem
          selected={value === 4}
          closeMenu={closeMenu}
          onClick={this.handleChange(4)}
        >
          <b>Almost certain</b>: Expected, most circumstances
        </MenuItem>
      </GridItem>
    </GridContainer>
  );

  renderContent = () => {
    const { value, editable } = this.props;

    if (!editable) return this.value();

    return (
      <Popper
        renderButton={this.renderButton}
        value={value}
        stopPropagation
        noPadding
        menuHeader="Likelihood"
      >
        {this.renderMenu}
      </Popper>
    );
  };

  render = () => (
    <GridContainer alignItems="center">
      <GridItem>
        <Headx>Likelihood</Headx>
      </GridItem>
      <GridItem>{this.renderContent()}</GridItem>
    </GridContainer>
  );
}

Likelihood.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  editable: PropTypes.bool,

  // resaga props
  value: PropTypes.number,
  type: PropTypes.string,
};

Likelihood.defaultProps = {
  value: 0,
};

export default compose(
  withStyles(styles, { name: 'Likelihood' }),
  resaga(CONFIG),
)(Likelihood);
