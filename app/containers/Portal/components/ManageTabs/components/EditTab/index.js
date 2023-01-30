import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import resagaHOC from 'resaga';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Button from 'viewComponents/Button';
import PopoverForm from 'viewComponents/PopoverForm';
import { H6 } from 'viewComponents/Typography';
import FText from 'components/Inputs/TextField/components/FilledInputs/components/FText';
import InlineButton from 'ugcomponents/Buttons/InlineButton';
import { NODE_API, UPDATE_NODE } from 'apis/constants';
import Tooltip, { DEFAULT_ENTER_DELAY } from 'viewComponents/Tooltip';
import Icon from 'ugcomponents/Icon';
import SimpleRTE from 'ugcomponents/Inputs/SimpleRTE';

import isFunction from 'lodash/isFunction';
import { makeStyles } from '@material-ui/core/styles';
import { useImmer } from 'use-immer';
import m from './messages';
import style from './style';
import inputs from './inputs';
import { CONFIG } from './config';

const useStyles = makeStyles(style);
function EditTab(props) {
  /* eslint-disable no-param-reassign */
  const classes = useStyles();
  const {
    content,
    description,
    type,
    id,
    resaga,
    rteComponent: RteComponent,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const [state, setState] = useImmer({
    editing: false,
    loading: false,
  });

  const getPopoverProps = () => ({
    anchorEl,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    PaperProps: {
      classes: { root: classes.paperRoot },
    },
  });

  const handleSubmitAfter = e => {
    if (e && isFunction(e.stopPropagation)) e.stopPropagation();
    setState(draft => {
      draft.editing = false;
      draft.loading = false;
    });
  };

  const onclickSubmit = e => {
    e.stopPropagation();
  };

  const handleValidSubmit = model => {
    const node = {
      ...model,
    };

    setState(draft => {
      draft.loading = true;
    });

    resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: {
        nodeId: id,
        type,
        node,
      },
      onSuccess: handleSubmitAfter,
      onError: handleSubmitAfter,
    });
  };

  const handleEditClick = e => {
    e.stopPropagation();
    setState(draft => {
      draft.editing = true;
    });
  };

  const handleButtonRef = ref => {
    setAnchorEl(ref);
  };

  const renderFormLabel = () => (
    <H6 dense weight="bold">
      <M {...m.formHeading} />
    </H6>
  );

  const renderFormActions = () => (
    <GridContainer wrap="nowrap">
      <GridItem xs />
      <GridItem>
        <Button
          size="small"
          color="black"
          variant="outline"
          dense
          disabled={state.loading}
          onClick={handleSubmitAfter}
          data-testid="cancelEdit-TestId"
        >
          Cancel
        </Button>
      </GridItem>
      <GridItem>
        <Button
          size="small"
          color="primary"
          type="submit"
          dense
          disabled={state.loading}
          onClick={onclickSubmit}
          data-testid="submitEdit-TestId"
        >
          Update
        </Button>
      </GridItem>
    </GridContainer>
  );

  const renderForm = () => (
    <GridContainer direction="column">
      <GridItem>{renderFormLabel()}</GridItem>
      <GridItem>
        <FText {...inputs.NAME} value={content} className={classes.text} />
      </GridItem>
      <GridItem>
        <RteComponent
          name="customData.description"
          placeholder="Add a tab description"
          filled
          value={description}
          label="Description"
        />
      </GridItem>
      <GridItem>{renderFormActions()}</GridItem>
    </GridContainer>
  );
  return (
    <React.Fragment>
      <InlineButton
        onClick={handleEditClick}
        buttonRef={handleButtonRef}
        padding="none"
        color="inherit"
        hover
        data-testid="editTab-TestId"
      >
        <Tooltip
          title="Edit this tab"
          isLight
          enterDelay={DEFAULT_ENTER_DELAY}
          placement="top"
        >
          <GridContainer
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={0}
            wrap="nowrap"
          >
            <GridItem>
              <Icon icon="lnr-pencil" size="xsmall" />
            </GridItem>
          </GridContainer>
        </Tooltip>
      </InlineButton>
      <PopoverForm
        open={state.editing}
        popoverProps={getPopoverProps()}
        onValidSubmit={handleValidSubmit}
        onClose={handleSubmitAfter}
        disabled={state.loading}
      >
        {renderForm()}
      </PopoverForm>
    </React.Fragment>
  );
}

EditTab.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  rteComponent: PropTypes.any,

  // resaga
  content: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
};

EditTab.defaultProps = {
  rteComponent: SimpleRTE,
};

export default compose(resagaHOC(CONFIG))(React.memo(EditTab));
