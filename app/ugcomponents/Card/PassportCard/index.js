import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from 'ugcomponents/Card';
import { H3 } from 'viewComponents/Typography';
import Badge from 'viewComponents/Badge';
import Padding from 'viewComponents/Padding';

import styles from './styles';

export const PassportCard = ({
  classes,
  primaryCheckbox,
  content,
  actions,
  photo,
  country,
  isDefault,
}) => (
  <Fragment>
    <Card className={classes.root}>
      <Padding top="md" bottom="md" left="xl" right="xl">
        <GridContainer alignItems="center" justify="space-between">
          <GridItem>
            <GridContainer alignItems="center">
              <GridItem>{primaryCheckbox}</GridItem>
              <GridItem>
                <H3 dense weight="bold">
                  <GridContainer alignItems="center" spacing={3}>
                    {isDefault ? (
                      <GridItem>
                        <GridContainer alignItems="center">
                          <Badge>Primary</Badge>
                        </GridContainer>
                      </GridItem>
                    ) : (
                      ''
                    )}
                    <GridItem>{country}</GridItem>
                  </GridContainer>
                </H3>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>{actions}</GridItem>
        </GridContainer>
      </Padding>
      <div className={classes.cardContainer}>
        <GridContainer className={classes.fullHeight} spacing={3}>
          <GridItem xs={12} md={6}>
            <GridContainer className={classes.fullHeight} justify="flex-end">
              <GridItem xs={12}>{photo}</GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} md={6}>
            {content}
          </GridItem>
        </GridContainer>
      </div>
    </Card>
  </Fragment>
);

PassportCard.propTypes = {
  classes: PropTypes.object.isRequired,
  primaryCheckbox: PropTypes.node,
  content: PropTypes.node,
  actions: PropTypes.node,
  photo: PropTypes.node,
  country: PropTypes.node,
  isDefault: PropTypes.bool,
};

PassportCard.defaultProps = {
  primaryCheckbox: '',
  content: '',
  actions: '',
  photo: '',
  country: '',
  isDefault: false,
};

export default withStyles(styles, { name: 'PassportCard' })(PassportCard);
