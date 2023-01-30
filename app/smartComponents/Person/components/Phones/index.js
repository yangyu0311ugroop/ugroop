import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import SortPhones from 'smartComponents/Phone/logic/SortPhones';
import JButton from 'viewComponents/Button/variants/JButton';
import { EditablePlaceholder } from 'viewComponents/Editable';

// view
import Icon from 'viewComponents/Icon';
import Margin from 'viewComponents/Margin';
import { H5 } from 'viewComponents/Typography';
import { FormattedMessage as M } from 'react-intl';

import { CONFIG } from './config';
import Phone from './components/Phone';
import styles from './styles';
import m from './messages';

export class PhoneList extends PureComponent {
  state = {
    creating: false,
  };

  handleAddContact = () => {
    this.setState({ creating: true });
  };

  finishCreating = () => {
    this.setState({ creating: false });
  };

  renderDefault = () => this.renderPhoneListForm();

  renderPhoneListForm = () => {
    const { creating } = this.state;

    return (
      <React.Fragment>
        <GridContainer direction="column" spacing={3}>
          <GridItem>{this.renderPhoneList()}</GridItem>

          <GridItem>
            {creating ? (
              <Phone
                userId={this.props.id}
                isForCreating
                viewStore={this.props.viewStore}
                onFinish={this.finishCreating}
              />
            ) : (
              <JButton onClick={this.handleAddContact} bg="green">
                <GridContainer alignItems="center" wrap="nowrap">
                  <GridItem>
                    <Icon size="normal" icon="lnr-plus" />
                  </GridItem>
                  <GridItem>Phone</GridItem>
                </GridContainer>
              </JButton>
            )}
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  };

  renderPlaceholder = () => (
    <EditablePlaceholder>
      <M {...m.placeholder} />
    </EditablePlaceholder>
  );

  renderSortedPhones = () => ({ sortedIds }) => {
    const { showDefaultOnly, showSimple, noMargin, component } = this.props;

    if (showDefaultOnly && sortedIds.length) {
      if (noMargin)
        return (
          <Phone
            userId={this.props.id}
            id={sortedIds[0]}
            variant={LOGIC_HELPERS.ifElse(showSimple, VARIANTS.ICON)}
            withAction={this.props.withAction}
          />
        );
      return (
        <Margin bottom="md" key={sortedIds[0]}>
          <Phone
            userId={this.props.id}
            id={sortedIds[0]}
            variant={LOGIC_HELPERS.ifElse(showSimple, VARIANTS.ICON)}
            withAction={this.props.withAction}
          />
        </Margin>
      );
    }

    return (
      <GridContainer direction="column" spacing={2}>
        {sortedIds.map(phoneId => (
          <GridItem key={phoneId}>
            <Phone
              userId={this.props.id}
              id={phoneId}
              variant={LOGIC_HELPERS.ifElse(showSimple, VARIANTS.TEXT_ONLY)}
              component={component}
              withAction={this.props.withAction}
            />
          </GridItem>
        ))}
      </GridContainer>
    );
  };

  renderSortedPhoneFields = () => ({ sortedIds }) => {
    if (!sortedIds || !sortedIds.length)
      return <GridItem> {this.renderPlaceholder()} </GridItem>;
    return sortedIds.map(phoneId => (
      <GridItem>
        <Phone
          userId={this.props.id}
          id={phoneId}
          variant={VARIANTS.FIELDS_ONLY}
          withAction={this.props.withAction}
        />
      </GridItem>
    ));
  };

  renderPhoneList = () => {
    const { phones } = this.props;

    return <SortPhones ids={phones}>{this.renderSortedPhones()}</SortPhones>;
  };

  renderPhoneFields = () => {
    const { phones } = this.props;
    return (
      <GridContainer direction="column" spacing={0} wrap="nowrap">
        <GridItem>{this.renderFormLabel()}</GridItem>
        <SortPhones ids={phones}>{this.renderSortedPhoneFields()}</SortPhones>
      </GridContainer>
    );
  };

  renderFormLabel = () => (
    <H5 dense weight="bold">
      <M {...m.formHeading} />
    </H5>
  );

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.LIST_ONLY]: this.renderPhoneList,
      [VARIANTS.WITH_FORM]: this.renderPhoneListForm,
      [VARIANTS.FIELDS_ONLY]: this.renderPhoneFields,
      [DEFAULT]: this.renderDefault,
    });
  };
}

PhoneList.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  id: PropTypes.number,
  // I disable it for the sake that it will appear in the
  // auto complete of webstorm
  // eslint-disable-next-line
  viewStore: PropTypes.string,
  showDefaultOnly: PropTypes.bool,
  showSimple: PropTypes.bool,
  noMargin: PropTypes.bool,
  component: PropTypes.any,
  withAction: PropTypes.bool,
  // resaga props
  phones: PropTypes.array,
  showCreateForm: PropTypes.bool,
};

PhoneList.defaultProps = {
  phones: [],
  variant: '',
  id: 0,
  showCreateForm: false,
  viewStore: '',
  noMargin: false,
};

export default compose(
  withStyles(styles, { name: 'PhoneList' }),
  resaga(CONFIG),
)(PhoneList);
