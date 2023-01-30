import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Dialog from 'components/Dialog';
import DialogContent from 'components/Dialog/UGDialogContent';

import CircularProgress from 'ugcomponents/Progress/CircularProgress';

export const LoadingDialog = ({ children, ...rest }) => (
  <Dialog {...rest}>
    <DialogContent>
      <GridContainer direction="column" alignItems="center">
        {children && <GridItem>{children}</GridItem>}
        <GridItem>
          <CircularProgress size={25} />
        </GridItem>
      </GridContainer>
    </DialogContent>
  </Dialog>
);

LoadingDialog.propTypes = {
  // parent
  children: PropTypes.any,
};

LoadingDialog.defaultProps = {
  children: null,
};

export default LoadingDialog;
