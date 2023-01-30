import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from 'ugcomponents/Icon';
import { Hidden } from 'components/material-ui';
import { withStyles } from '@material-ui/core/styles';
import { VARIANTS } from 'variantsConstants';

import Button from 'viewComponents/Button';
import styles from './styles';

export function GroupButton(props) {
  const {
    initSelected,
    classes,
    btnItems,
    iconProps,
    containerClassname,
    buttonClassname,
    activeClassname,
    noMargin,
  } = props;
  const [selectedVal, setSelectedVal] = useState(initSelected);

  useEffect(() => {
    setSelectedVal(props.initSelected);
  }, [props.initSelected]);

  const onClick = value => () => {
    setSelectedVal(value);
    props.onClick(value);
  };

  const renderDefault = () => {
    const btnList = btnItems.map(btn => {
      const IconComponent = btn.icon ? (
        <Icon icon={btn.icon} {...iconProps} />
      ) : (
        ''
      );
      return (
        <Button
          onClick={onClick(btn.value)}
          key={`${btn.value}`}
          dense
          variant={VARIANTS.BORDERLESS}
          size="extraSmall"
          color="white"
          className={classNames(
            classes.btn,
            { [classes.active]: btn.value === selectedVal },
            buttonClassname,
          )}
        >
          {IconComponent}
          <Hidden smDown>{btn.label}</Hidden>
        </Button>
      );
    });
    return (
      <div className={classNames(classes.container, containerClassname)}>
        {btnList}
      </div>
    );
  };

  const renderMiddleBorderOnly = () => {
    const btnList = btnItems.map(btn => {
      const IconComponent = btn.icon ? <Icon icon={btn.icon} /> : '';
      return (
        <Button
          onClick={onClick(btn.value)}
          key={`${btn.value}`}
          dense
          variant={VARIANTS.BORDERLESS}
          size="extraSmall"
          color="white"
          className={classNames(
            classes.btnMiddleBorderOnly,
            {
              [classes.noMargin]: noMargin,
              [classNames(classes.activeNoBorder, activeClassname)]:
                btn.value === selectedVal,
            },
            buttonClassname,
          )}
          data-testid="test-GroupButton"
        >
          {IconComponent}
          {btn.label}
        </Button>
      );
    });
    return (
      <div className={classNames(classes.container, containerClassname)}>
        {btnList}
      </div>
    );
  };

  if (props.middleBorderOnly) {
    return renderMiddleBorderOnly();
  }

  return renderDefault();
}

GroupButton.propTypes = {
  classes: PropTypes.object.isRequired,
  initSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  btnItems: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  containerClassname: PropTypes.string,
  buttonClassname: PropTypes.string,
  middleBorderOnly: PropTypes.bool,
  noMargin: PropTypes.bool,
  activeClassname: PropTypes.string,
  iconProps: PropTypes.object,
};

GroupButton.defaultProps = {
  initSelected: '',
  onClick: () => {},
  middleBorderOnly: false,
  noMargin: false,
  iconProps: {},
};

export default withStyles(styles, { name: 'GroupButton' })(GroupButton);
