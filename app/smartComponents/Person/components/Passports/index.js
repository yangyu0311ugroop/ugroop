import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from 'components/Dialog/UGDialogAction';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import Margin from 'viewComponents/Margin';
import DialogForm, { Title } from 'ugcomponents/DialogForm/Complex';

import Icon from 'ugcomponents/Icon';
import { H3, H5 } from 'viewComponents/Typography';
import PersonCUD from './hoc/hoc';
import SortPassport from './logic/SortPassport';
import EditPassportForm from './components/Passport/components/EditForm';

import Passport from './components/Passport';
import { CONFIG } from './config';
import styles from './styles';

export class Passports extends PureComponent {
  state = {};

  createSuccess = () => {
    this.setState({
      openAddForm: false,
    });
  };

  openCreateForm = () => {
    this.setState({
      openAddForm: true,
    });
  };

  closeCreateForm = () => {
    this.setState({
      openAddForm: false,
    });
  };

  renderDialogHeader = ({ renderCloseButton }) => (
    <GridContainer>
      <GridItem xs={11} md={11}>
        <Title
          heading={<Margin top="sm">Add Passport</Margin>}
          headingBackground="Passport"
        />
      </GridItem>
      <GridItem xs={1} md={1}>
        <DialogActions>{renderCloseButton()}</DialogActions>
      </GridItem>
    </GridContainer>
  );

  renderDialog = () => CUD => (
    <DialogForm
      renderHeader={this.renderDialogHeader}
      onClose={this.closeCreateForm}
      onCancel={this.closeCreateForm}
      open={this.state.openAddForm}
      size={SIZE_CONSTANTS.XXL}
      onValidSubmit={CUD.store({ onSuccess: this.createSuccess })}
    >
      <EditPassportForm
        hideIsDefault={false}
        userId={this.props.id}
        withFormWrap={false}
      />
    </DialogForm>
  );

  renderSortedPassport = () => ({ sortedIds }) =>
    sortedIds.map(id => (
      <Passport
        userId={this.props.id}
        variant={VARIANTS.CARD}
        id={id}
        key={id}
      />
    ));

  renderPassportEmpty = () => {
    const { classes } = this.props;
    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer alignItems="flex-start">
            <GridItem>
              <H3 noMargin>Passports</H3>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.emptyPassportBody}
          >
            <GridItem>
              <Icon icon="lnr-document" size="xl" color="gray" />
            </GridItem>
            <GridItem className={classes.title}>
              <H5 noMargin>There are no Passport in this tab</H5>
            </GridItem>
            <GridItem>
              <Button
                onClick={this.openCreateForm}
                dense
                color="primary"
                size="small"
              >
                Add Passport
              </Button>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderCardList = () => {
    const { passports, withAddButton } = this.props;
    return (
      <React.Fragment>
        <PersonCUD userId={this.props.id}>{this.renderDialog()}</PersonCUD>

        {withAddButton ? (
          <>
            {passports.length === 0 ? (
              this.renderPassportEmpty()
            ) : (
              <GridContainer
                direction="row"
                alignItems="flex-start"
                justify="space-between"
              >
                <GridItem>
                  <H3 noMargin>Passports</H3>
                </GridItem>
                <GridItem>
                  <Button
                    onClick={this.openCreateForm}
                    dense
                    color="primary"
                    size="small"
                  >
                    Add Passport
                  </Button>
                </GridItem>
              </GridContainer>
            )}
          </>
        ) : (
          ''
        )}
        <SortPassport ids={passports}>
          {this.renderSortedPassport()}
        </SortPassport>
      </React.Fragment>
    );
  };

  renderDefault = () => this.renderCardList();

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
    });
  };
}

Passports.propTypes = {
  // hoc props
  // resaga: PropTypes.object,
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  id: PropTypes.number,
  withAddButton: PropTypes.bool,
  // eslint-disable-next-line
  viewStore: PropTypes.string,

  // resaga props
  passports: PropTypes.array,
};

Passports.defaultProps = {
  passports: [],
  variant: '',
  id: 0,
  withAddButton: true,
  viewStore: '',
};

export default compose(
  withStyles(styles, { name: 'Passports' }),
  resaga(CONFIG),
)(Passports);
