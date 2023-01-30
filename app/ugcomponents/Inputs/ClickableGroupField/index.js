/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withFormsy } from 'formsy-react';

import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';

const style = {
  unselected: {
    opacity: '0.3',
  },
};

export class ClickableGroupField extends PureComponent {
  handleChildClick = key => () => {
    const { getValue, setValue, onChange } = this.props;
    setValue(key);
    if (onChange && getValue() !== key) onChange(key);
    this.forceUpdate();
  };

  render() {
    const {
      classes,
      children,
      getValue,
      containerProps,
      itemProps,
    } = this.props;
    const renderedChildren = children.map(child => {
      const { key } = child;
      const unselected = getValue() !== key;

      return (
        <GridItem
          key={key}
          {...itemProps}
          className={unselected ? classes.unselected : null}
        >
          {React.cloneElement(child, { onClick: this.handleChildClick(key) })}
        </GridItem>
      );
    });

    return (
      <GridContainer {...containerProps}>{renderedChildren}</GridContainer>
    );
  }
}

ClickableGroupField.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  getValue: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,

  // parent
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  value: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  onChange: PropTypes.func,
  containerProps: PropTypes.object,
  itemProps: PropTypes.object,
};

ClickableGroupField.defaultProps = {
  value: '',
  onChange: null,
  containerProps: { spacing: 24 },
  itemProps: {},
};

export default compose(
  withStyles(style),
  withFormsy,
)(ClickableGroupField);
