import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import UGLink from 'components/Link';
import { compose } from 'redux';
import Li from 'components/Li';
import Icon from 'ugcomponents/Icon';
import classNames from 'classnames';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import styles from './styles';

export class BreadcrumbItem extends PureComponent {
  render = () => {
    const {
      classes,
      isLast,
      showAllActive,
      showLastItem,
      onlyItem,
      url,
      name,
      darkMode,
    } = this.props;
    const linkText = name;

    const linkContainer = (
      <UGLink
        to={url}
        className={classNames(classes.linkText, {
          [classes.homeActive]: isLast || showAllActive,
          [classes.darkMode]: darkMode,
        })}
      >
        {linkText}
      </UGLink>
    );

    const chevron =
      isLast || (showLastItem && onlyItem) ? (
        ''
      ) : (
        <Icon
          className={classNames(
            classes.chev,
            LOGIC_HELPERS.ifElse(darkMode, classes.darkMode),
          )}
          icon="chevron-right"
        />
      );

    return (
      <Li className={classNames(classes.listItem)} key={`${url}`}>
        {linkContainer}
        {chevron}
      </Li>
    );
  };
}

BreadcrumbItem.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  // eslint-disable-next-line react/no-unused-prop-types
  id: PropTypes.number,
  url: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  isFirst: PropTypes.bool,
  showAllActive: PropTypes.bool,
  onlyItem: PropTypes.bool,
  showLastItem: PropTypes.bool,
  darkMode: PropTypes.bool,
  name: PropTypes.node,
};

BreadcrumbItem.defaultProps = {
  id: 0,
  name: '',
  isLast: false,
  isFirst: false,
  showAllActive: false,
  onlyItem: false,
  showLastItem: false,
};

export default compose(withStyles(styles, { name: 'BreadcrumbItem' }))(
  BreadcrumbItem,
);
