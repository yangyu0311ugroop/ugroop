import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';

import { Hidden, makeStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import JText from 'components/JText';
import { H3 } from 'viewComponents/Typography';
import JDialog from 'ugcomponents/JDialog';
import Table, { TableBody, TableCell, TableRow } from 'viewComponents/Table';
import moment from 'moment';
import { useGlobalContext } from 'containers/App/globalStateContext';
import { CONFIG } from './config';

const styles = {
  root: {},
  title: {
    paddingBottom: 0,
  },
  fullWidth: {
    width: '100%',
  },
  badge: {
    position: 'relative',
    left: 2,
    backgroundColor: 'transparent',
    borderRadius: 2,
    fontSize: 10,
    padding: '1px 3px',
    lineHeight: 1.1,
    '-webkit-font-smoothing': 'subpixel-antialiased',
    pointerEvents: 'none',
    color: 'red',
    whiteSpace: 'nowrap',
  },
};

const useStyles = makeStyles(styles);

function ShowSystemUpdate(props) {
  const [state] = useGlobalContext();
  const whatsNew = state.WhatsNewContext.ugroopUpdates;
  const { readUpdates } = props;
  const classes = useStyles();
  const handleClose = () => {
    PORTAL_HELPERS.close(props);
  };

  const onClick = id => () => {
    props.resaga.setValue({
      readUpdates: [...readUpdates, id],
    });
  };

  const renderItemCell = data => {
    const isNew = !readUpdates.includes(data.id);
    const date = moment(data.updateDate);
    return (
      <TableRow>
        <Hidden smDown>
          <TableCell padding="halfLeftRight">
            <JText>{date.format('D MMM YYYY')}</JText>
          </TableCell>
        </Hidden>
        <TableCell padding="halfLeftRight">
          <GridContainer spacing={0} noWrap>
            <GridItem>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <JText
                    noUnderlined
                    component="a"
                    href={data.link}
                    target="_blank"
                    title={data.title}
                    onClick={onClick(data.id)}
                    bolder={isNew}
                    nowrap={false}
                    data-testid="onClickButtonLinkSu"
                  >
                    {data.title}
                  </JText>
                </GridItem>
                <Hidden mdUp>
                  <GridItem>
                    <JText xs darkGray>
                      {`Date: ${date.format('D MMM YYYY')}`}
                    </JText>
                  </GridItem>
                </Hidden>
              </GridContainer>
            </GridItem>
            {!!isNew && (
              <GridItem>
                <div className={classes.badge}>New</div>
              </GridItem>
            )}
          </GridContainer>
        </TableCell>
        <TableCell padding="halfLeftRight">
          <JText title={data.title}>{data.version}</JText>
        </TableCell>
      </TableRow>
    );
  };

  const renderContent = () => {
    const arrVal = [...whatsNew];
    return arrVal.reverse().map(renderItemCell);
  };

  const renderFields = () => (
    <TableRow>
      <Hidden smDown>
        <TableCell padding="halfLeftRight">
          <JText bold blue>
            Update Date
          </JText>
        </TableCell>
      </Hidden>
      <TableCell padding="halfLeftRight">
        <JText bold blue>
          Name and Information link
        </JText>
      </TableCell>
      <TableCell padding="halfLeftRight">
        <JText bold blue>
          Version
        </JText>
      </TableCell>
    </TableRow>
  );

  return (
    <JDialog
      denseTitle
      headerNoWrap
      open
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      submitButton={
        <JText className={classes.fullWidth} onClick={handleClose}>
          Close
        </JText>
      }
      titleClassName={classes.title}
      header={
        <H3 dense weight="bold">
          {"What's new on uGroop"}
        </H3>
      }
    >
      <GridContainer direction="column" spacing={2}>
        <GridItem>
          <JText black bolder nowrap={false}>
            Find out what has changed and what is new in uGroop by clicking the
            information link
          </JText>
        </GridItem>
        <GridItem>
          <Table>
            <TableBody>
              {renderFields()}
              {renderContent()}
            </TableBody>
          </Table>
        </GridItem>
      </GridContainer>
    </JDialog>
  );
}

ShowSystemUpdate.propTypes = {
  // hoc props
  readUpdates: PropTypes.array,
  resaga: PropTypes.object.isRequired,
};

ShowSystemUpdate.defaultProps = {
  readUpdates: [],
};

export default compose(resaga(CONFIG))(React.memo(ShowSystemUpdate));
