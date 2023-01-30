import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import CreateButton from 'viewComponents/CreateButton';
import Button from 'viewComponents/Button';
import PopoverForm from 'viewComponents/PopoverForm';
import { H6 } from 'viewComponents/Typography';
import Dietary from 'smartComponents/Person/components/Dietary';
import m from './messages';
import style from './style';

export class DietaryCreate extends React.PureComponent {
  state = {
    editing: false,
    loading: false,
    anchorEl: null,
  };

  getPopoverProps = () => {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return {
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
    };
  };

  handleSubmitSuccess = () => {
    this.setState({ editing: false, loading: false });
  };

  handleSubmitError = () => {
    this.setState({ loading: false });
  };

  handleValidSubmit = model => {
    const { id } = this.props;
    this.setState({ loading: true });
    PERSON_DETAIL_HELPER.addDietary(
      {
        personId: id,
        ...model,
        onSuccess: this.handleSubmitSuccess,
        onError: this.handleSubmitError,
      },
      this.props,
    );
  };

  handlePopoverClose = () => {
    this.setState({ editing: false });
  };

  handleCreateClick = () => {
    this.setState({ editing: true });
  };

  handleCreateButtonRef = ref => {
    this.setState({ anchorEl: ref });
  };

  renderPart = (Component, variant) => <Component variant={variant} />;

  renderFormLabel = () => (
    <H6 dense weight="bold">
      <M {...m.formHeading} />
    </H6>
  );

  renderFormActions = () => {
    const { loading } = this.state;
    return (
      <GridContainer wrap="nowrap">
        <GridItem xs />
        <GridItem>
          <Button
            size="small"
            color="black"
            variant="outline"
            dense
            disabled={loading}
            onClick={this.handlePopoverClose}
          >
            <M {...m.cancelButtonLabel} />
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="small"
            color="primary"
            type="submit"
            dense
            disabled={loading}
          >
            <M {...m.createButtonLabel} />
          </Button>
        </GridItem>
      </GridContainer>
    );
  };

  renderForm = () => (
    <GridContainer direction="column">
      <GridItem>{this.renderFormLabel()}</GridItem>
      <GridItem>{this.renderPart(Dietary, VARIANTS.FORM)}</GridItem>
      <GridItem>{this.renderFormActions()}</GridItem>
    </GridContainer>
  );

  render = () => {
    const { classes } = this.props;
    const { editing, loading } = this.state;
    return (
      <React.Fragment>
        <CreateButton
          className={classes.createButton}
          title="Add dietary requirement"
          onClick={this.handleCreateClick}
          buttonRef={this.handleCreateButtonRef}
        />
        <PopoverForm
          open={editing}
          popoverProps={this.getPopoverProps()}
          onValidSubmit={this.handleValidSubmit}
          onClose={this.handlePopoverClose}
          disabled={loading}
          formClassName={classes.popover}
        >
          {this.renderForm()}
        </PopoverForm>
      </React.Fragment>
    );
  };
}

DietaryCreate.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
};

DietaryCreate.defaultProps = {
  id: null,
};

export default compose(
  withStyles(style, { name: 'smartComponents/Person/Dietary/Create' }),
  resaga(),
)(DietaryCreate);
