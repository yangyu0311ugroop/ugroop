/**
 * Created by Yang on 14/2/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';

export const stylesheet = {
  root: {
    padding: 0,
    minHeight: 'calc(100vh - 88px)',
  },
  item: {
    padding: 0,
  },
  pageContent: {
    marginTop: 0,
    padding: 0,
  },
};

export function AdminContent({ children, classes }) {
  return (
    <GridContainer
      spacing={0}
      className={classNames(classes.root, classes.pageContent)}
    >
      <GridItem className={classes.item} xs={12} md={12}>
        {children}
      </GridItem>
    </GridContainer>
  );
}

AdminContent.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
};

export default withStyles(stylesheet, { name: 'AdminContent' })(AdminContent);
