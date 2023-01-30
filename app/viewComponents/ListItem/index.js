import React from 'react';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from 'ugcomponents/Card';
import PropTypes from 'prop-types';
import { H6 } from 'viewComponents/Typography';
import Checkbox from 'components/Inputs/Checkbox';
import { isEmptyString } from 'utils/stringAdditions';
import Hidden from '@material-ui/core/Hidden';

import Header from './components/Header';
import styles from './styles';

export const determineFirstSectionSize = icon => {
  if (icon) {
    return 11;
  }

  return 12;
};

export const HIDE_SM_DOWN = {
  smDown: true,
};

export const HIDE_MD_UP = {
  mdUp: true,
};

export function ListItem(props) {
  const {
    hasCheckbox,
    checkboxProps,
    title,
    icon,
    subtitle,
    secondColumn,
    description,
    action,
    classes,
    className,
  } = props;

  const renderListCheckbox = hiddenProps => {
    if (!hasCheckbox) {
      return null;
    }

    return (
      <Hidden {...hiddenProps}>
        <GridItem>
          <Checkbox {...checkboxProps} />
        </GridItem>
      </Hidden>
    );
  };

  const renderFirstRow = () => (
    <GridContainer alignItems="center" wrap="nowrap">
      {renderListCheckbox(HIDE_MD_UP)}
      <Header icon={icon} title={title} />
    </GridContainer>
  );

  const renderSecondRow = () => {
    const sub = isEmptyString(subtitle) ? (
      ''
    ) : (
      <GridItem md={10}>
        <H6 dense subtitle>
          {subtitle}
        </H6>
      </GridItem>
    );
    const secondCol = isEmptyString(secondColumn) ? (
      ''
    ) : (
      <Hidden smDown>
        <GridItem md={2}>{secondColumn}</GridItem>
      </Hidden>
    );

    if (isEmptyString(subtitle) && isEmptyString(secondColumn)) {
      return null;
    }

    return (
      <GridItem xs={12}>
        <GridContainer>
          {sub}
          {secondCol}
        </GridContainer>
      </GridItem>
    );
  };

  const renderThirdRow = () => {
    if (isEmptyString(description)) return null;

    return (
      <GridItem xs={12}>
        <H6 dense>{description}</H6>
      </GridItem>
    );
  };

  const renderAction = () => {
    if (!action) return null;

    return (
      <GridItem xs={2} sm={2} md={1}>
        <GridContainer justify="flex-end">{action}</GridContainer>
      </GridItem>
    );
  };
  return (
    <Card className={classnames(classes.root, className)}>
      <GridContainer alignItems="center" className={classes.container}>
        <GridItem xs={10} sm={10} md={action ? 11 : 12}>
          <GridContainer alignItems="center" spacing={2}>
            {/* {this.renderListCheckbox(HIDE_SM_DOWN)} */}
            <GridItem xs={11}>
              <GridContainer spacing={0}>
                <GridItem xs={12} md={determineFirstSectionSize(icon, action)}>
                  {renderFirstRow()}
                </GridItem>
                {renderSecondRow()}
                {renderThirdRow()}
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
        {renderAction()}
      </GridContainer>
    </Card>
  );
}

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,

  title: PropTypes.node,
  subtitle: PropTypes.node,
  description: PropTypes.node,
  icon: PropTypes.string,
  action: PropTypes.node,
  secondColumn: PropTypes.node,
  checkboxProps: PropTypes.object,
  hasCheckbox: PropTypes.bool,
};

ListItem.defaultProps = {
  className: '',
  action: '',
  checkboxProps: {},
  hasCheckbox: false,
};

export default withStyles(styles, { name: 'ListItem' })(React.memo(ListItem));
