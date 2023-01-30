import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Card from 'ugcomponents/Card';
import Padding from 'viewComponents/Padding';

import styles from './styles';

export const PhoneCard = ({ type, number, actions, isForm, form, classes }) => {
  const content = isForm ? (
    <GridItem className={classes.grow}>{form}</GridItem>
  ) : (
    <GridItem xs>
      <GridContainer wrap="nowrap" spacing={2} alignItems="center">
        <GridItem>{type}</GridItem>
        <GridItem>{number}</GridItem>
      </GridContainer>
    </GridItem>
  );

  const action = isForm ? null : <GridItem>{actions}</GridItem>;

  return (
    <Card>
      <Padding top="md" left="md" bottom="md" right="md">
        <GridContainer spacing={1} alignItems="center">
          {content}
          {action}
        </GridContainer>
      </Padding>
    </Card>
  );
};

PhoneCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  type: PropTypes.node,
  number: PropTypes.node,
  actions: PropTypes.node,
  form: PropTypes.node,
  isForm: PropTypes.bool,
};

PhoneCard.defaultProps = {
  type: '',
  number: '',
  actions: '',
  form: '',
  isForm: false,
};

export default withStyles(styles, { name: 'PhoneCard' })(PhoneCard);
