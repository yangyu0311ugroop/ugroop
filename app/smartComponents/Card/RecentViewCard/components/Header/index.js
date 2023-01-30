import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Icon from 'ugcomponents/Icon';
import { withStyles } from '@material-ui/core/styles';
import Button from 'viewComponents/Button';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import stylesheet from './styles';

export const Header = ({
  classes,
  onClickToggle,
  expanded,
  isLoading,
  ids,
}) => (
  <GridItem className={classes.header}>
    <div className={classes.padding}>
      <GridContainer direction="row" alignItems="center">
        <GridItem className={classes.iconGrid}>
          <Icon color="success" icon="lnr-earth" />
        </GridItem>
        <GridItem className={classnames(classes.title, classes.grow)}>
          Recently Viewed
        </GridItem>
        {!expanded && (
          <GridItem className={classnames(classes.count)}>
            {`${ids.length} Items`}
          </GridItem>
        )}
        <GridItem>
          <Button
            onClick={onClickToggle}
            color="gray"
            size="small"
            icon={LOGIC_HELPERS.ifElse(
              expanded,
              'lnr-chevron-up',
              'lnr-chevron-down',
            )}
            iconButton
            variant={VARIANTS.BORDERLESS}
            tabIndex={-1}
            noMargin
            noPadding
            disabled={isLoading}
          />
        </GridItem>
      </GridContainer>
    </div>
  </GridItem>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  onClickToggle: PropTypes.func,
  isLoading: PropTypes.bool,
  ids: PropTypes.array,
};
Header.defaultProps = {
  isLoading: false,
  ids: [],
};

export default withStyles(stylesheet, { name: 'Header' })(Header);
