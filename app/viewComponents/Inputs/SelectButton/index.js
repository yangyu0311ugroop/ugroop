import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { VARIANTS } from 'variantsConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from 'components/material-ui';
import Icon from 'viewComponents/Icon';
import Button from 'viewComponents/Button';
import Select from 'viewComponents/Inputs/Select';
import style from './style';

export class SelectButton extends React.PureComponent {
  getSelectClasses = () => {
    if (!this.SelectClasses) {
      const { classes } = this.props;
      this.SelectClasses = {
        select: classes.select,
        icon: classes.selectIcon,
      };
    }
    return this.SelectClasses;
  };

  getSelectMenuProps = () => {
    if (!this.SelectMenuProps) {
      this.SelectMenuProps = {};
    }
    return this.SelectMenuProps;
  };

  getSelectValueContainerClasses = () => {
    if (!this.SelectValueContainer) {
      const { classes } = this.props;
      this.SelectValueContainer = {
        root: classes.selectValueRoot,
      };
    }
    return this.SelectValueContainer;
  };

  getRestProps = () =>
    _.omit(this.props, [
      'classes',
      'value',
      'renderValue',
      'size',
      'ButtonProps',
    ]);

  renderValue = value => {
    const { renderValue, size, ButtonProps } = this.props;
    return (
      <Button variant={VARIANTS.OUTLINE} size={size} dense {...ButtonProps}>
        <GridContainer
          classes={this.getSelectValueContainerClasses()}
          alignItems="baseline"
          wrap="nowrap"
        >
          <GridItem>{renderValue(value)}</GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size={SIZE_CONSTANTS.XXS} />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  render = () => {
    const { value, native } = this.props;
    return (
      <Select
        classes={this.getSelectClasses()}
        value={value}
        native={native}
        renderValue={this.renderValue}
        MenuProps={this.getSelectMenuProps()}
        {...this.getRestProps()}
      />
    );
  };
}

SelectButton.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  value: PropTypes.any,
  renderValue: PropTypes.func,
  size: PropTypes.string,
  ButtonProps: PropTypes.object,
  native: PropTypes.bool,
};

SelectButton.defaultProps = {
  value: null,
  renderValue: value => value,
  size: 'extraSmall',
  ButtonProps: {},
  native: false,
};

export default withStyles(style, {
  name: 'viewComponents/Inputs/SelectButton',
})(SelectButton);
