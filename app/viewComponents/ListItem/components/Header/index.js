import JText from 'components/JText';
import React, { PureComponent } from 'react';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Icon from 'viewComponents/Icon';
import { SIZE_CONSTANTS } from 'sizeConstants';

import styles from './styles';

export class Header extends PureComponent {
  renderIcon = () => {
    const { icon } = this.props;

    const renderedIcon = icon ? (
      <GridItem>
        <Icon size={SIZE_CONSTANTS.XXS} color="dark" icon={icon} />
      </GridItem>
    ) : null;

    return renderedIcon;
  };

  render = () => {
    const { title } = this.props;
    return (
      <GridItem>
        <GridContainer alignItems="center" wrap="nowrap">
          {this.renderIcon()}
          <GridItem>
            <JText bold md ellipsis>
              {title}
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };
}

Header.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.node,
};

Header.defaultProps = {};

export default withStyles(styles, { name: 'ListItemHeader' })(Header);
