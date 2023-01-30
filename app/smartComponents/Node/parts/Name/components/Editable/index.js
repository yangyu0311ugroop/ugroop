import React from 'react';
import PropTypes from 'prop-types';
import dotProp from 'dot-prop-immutable';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { VARIANTS } from 'variantsConstants';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { Checkbox } from 'ugcomponents/Inputs';
import FirstName from 'smartComponents/Person/parts/FirstName';
import MiddleName from 'smartComponents/Person/parts/MiddleName';
import LastName from 'smartComponents/Person/parts/LastName';
import PersonName from 'smartComponents/Person/parts/Name';
import { EditableForm } from 'smartComponents/Editables';
import { CONFIG } from './config';

export class NameEditable extends React.PureComponent {
  state = {
    override: undefined,
  };

  getPersonId = () => {
    const { userPersonId, personId } = this.props;
    return this.isUserName() ? userPersonId : personId;
  };

  isUserName = () => {
    const { namePersonId, userPersonId } = this.props;
    return (
      userPersonId && (namePersonId === 0 || namePersonId === userPersonId)
    );
  };

  isCurrentUserName = () => {
    const { override } = this.state;
    return override === undefined ? this.isUserName() : !override;
  };

  getNamePersonIdName = () =>
    NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.namePersonId, this.props);

  handleUserCheckboxChange = (_, checked) => {
    this.setState({ override: checked });
  };

  handleSubmit = ({ model, ...rest }) => {
    const { id, personId, userPersonId } = this.props;
    const { namePersonId: override, ...person } = model;

    if (!this.isCurrentUserName()) {
      PERSON_DETAIL_HELPER.updatePerson(
        {
          personId,
          person,
          ...rest,
        },
        this.props,
      );
    }

    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        ...dotProp.set(
          {},
          this.getNamePersonIdName(),
          override ? null : userPersonId,
        ),
        ...rest,
      },
      this.props,
    );
  };

  renderPart = (Component, variant, props = {}) => {
    const { personId, readOnly, dataStore } = this.props;
    return (
      <Component
        id={personId}
        variant={variant}
        readOnly={readOnly}
        dataStore={dataStore}
        {...props}
      />
    );
  };

  renderValue = () =>
    this.renderPart(PersonName, VARIANTS.TEXT_ONLY, {
      id: this.getPersonId(),
    });

  renderNameInputs = (variant = VARIANTS.TEXT_FIELD) =>
    !this.isCurrentUserName() && (
      <React.Fragment>
        <GridItem>{this.renderPart(FirstName, variant)}</GridItem>
        <GridItem>{this.renderPart(MiddleName, variant)}</GridItem>
        <GridItem>{this.renderPart(LastName, variant)}</GridItem>
      </React.Fragment>
    );

  renderUserSelection = () => {
    const { userPersonId, renderAvatar } = this.props;
    return (
      userPersonId && (
        <React.Fragment>
          <GridItem>
            <GridContainer wrap="nowrap" alignItems="center">
              <GridItem xs>
                {this.renderPart(PersonName, VARIANTS.TEXT_ONLY, {
                  id: userPersonId,
                })}
              </GridItem>
              <GridItem>{renderAvatar()}</GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <Checkbox
              name="namePersonId"
              value={!this.isUserName()}
              label="Specify a different full name?"
              size={SIZE_CONSTANTS.SM}
              autoFocus
              compact
              onChange={this.handleUserCheckboxChange}
            />
          </GridItem>
        </React.Fragment>
      )
    );
  };

  renderForm = () => (
    <GridContainer direction="column">
      {this.renderUserSelection()}
      {this.renderNameInputs()}
    </GridContainer>
  );

  render = () => {
    const { id, readOnly, label } = this.props;
    return (
      <EditableForm
        value={id}
        renderValue={this.renderValue}
        onSubmit={this.handleSubmit}
        readOnly={readOnly}
        label={label}
      >
        {this.renderForm()}
      </EditableForm>
    );
  };
}

NameEditable.propTypes = {
  // parent
  id: PropTypes.number,
  personId: PropTypes.number,
  readOnly: PropTypes.bool,
  label: PropTypes.node,
  dataStore: PropTypes.string,
  renderAvatar: PropTypes.func,

  // resaga value
  namePersonId: PropTypes.number,
  userPersonId: PropTypes.number,
};

NameEditable.defaultProps = {
  id: null,
  personId: null,
  readOnly: false,
  label: null,
  dataStore: null,
  renderAvatar: () => null,

  namePersonId: null,
  userPersonId: null,
};

export default resaga(CONFIG)(NameEditable);
