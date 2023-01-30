import React from 'react';
import { withStyles } from '@material-ui/core';
import { SCHOOL_ORG_TYPE } from 'containers/Profile/constants';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { DEFAULT, THE_BIG_DOT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import {
  EditableSelectForm,
  EditableTextForm,
} from 'smartComponents/Editables';
import { Select } from 'smartComponents/Inputs';
import StudentDetails from 'smartComponents/Node/parts/StudentDetails';
import helpers from './helpers';
import inputs from './inputs';
import m from './messages';
import styles from './styles';
import { PERSON_TYPES, EDUCATIONAL_PERSON_TYPES } from './constants';
import { CONFIG_1, CONFIG_2 } from './config';

export class PersonType extends React.PureComponent {
  state = {
    showOtherTextField: true,
  };

  getName = () =>
    NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.personType, this.props);

  getValue = (other = false) => {
    const { defaultValue, value } = this.props;
    if (other && (value === '' || value === null)) return 'other';
    return LOGIC_HELPERS.ifElse(value, value, defaultValue);
  };

  handleSubmit = ({ model, onSuccess, onError }) => {
    const { id, value } = this.props;
    const { personType } = model.node.customData;
    const notChanged = {
      node: {
        customData: { personType: value },
      },
    };
    const includesValue = EDUCATIONAL_PERSON_TYPES.includes(value);
    const newModel = LOGIC_HELPERS.ifElse(
      personType === '' && (value !== '' || value !== null) && !includesValue,
      notChanged,
      model,
    );
    if (personType !== '') this.handleClear();
    if (personType === '') this.setTextField();

    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        ...newModel,
        onSuccess,
        onError,
      },
      this.props,
    );
  };

  handleTextFieldSubmit = ({ model, onSuccess, onError }) => {
    const { id } = this.props;
    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        ...model,
        onSuccess,
        onError,
      },
      this.props,
    );
  };

  handleClear = () => this.setState({ showOtherTextField: false });

  setTextField = () => this.setState({ showOtherTextField: true });

  renderTextField = () => (
    <GridItem xs>
      <Select
        name={this.getName()}
        value={this.getValue()}
        options={helpers.makeOptions()}
        {...inputs.base}
      />
    </GridItem>
  );

  renderTypeEditable = value => {
    switch (value) {
      case PERSON_TYPES.student:
        return <StudentDetails {...this.props} />;
      default:
        return null;
    }
  };

  renderEditableWithType = (value, editable) => {
    const type = this.renderTypeEditable(value);
    return (
      <GridContainer wrap="nowrap" alignItems="baseline">
        <GridItem xs={!type}>{editable}</GridItem>
        {!!type && (
          <>
            <GridItem>{THE_BIG_DOT}</GridItem>
            <GridItem xs title="Details">
              {type}
            </GridItem>
          </>
        )}
      </GridContainer>
    );
  };

  renderOtherOnly = () => (
    <GridItem>
      <EditableTextForm
        readOnly={this.props.readOnly}
        name={this.getName()}
        value={this.getValue()}
        renderValue={helpers.renderOtherValue}
        onSubmit={this.handleTextFieldSubmit}
        placeholder={`Click to specify ${this.props.paxLabel} type`}
        {...inputs.base}
      />
    </GridItem>
  );

  renderEditable = () => {
    const { readOnly, defaultValue, orgType, classes } = this.props;
    const { showOtherTextField } = this.state;
    const participatingAs = this.getValue();
    const includesValue = EDUCATIONAL_PERSON_TYPES.includes(this.getValue());
    let type = '';
    if (!orgType) {
      type = this.props.oType;
    }
    if (type !== SCHOOL_ORG_TYPE) return this.renderOtherOnly();
    return (
      <GridItem>
        <GridContainer>
          <GridItem
            className={participatingAs === '' && classes.selectFieldContainer}
          >
            <EditableSelectForm
              name={this.getName()}
              value={this.getValue(true)}
              renderValue={helpers.renderValue}
              {...inputs.base}
              placeholder={`Click to specify ${this.props.paxLabel} type`}
              onSubmit={this.handleSubmit}
              readOnly={readOnly}
              renderEditable={this.renderEditableWithType}
            />
          </GridItem>
          {showOtherTextField &&
          !includesValue &&
          (this.getValue() === defaultValue || type === SCHOOL_ORG_TYPE) ? (
            <GridItem className={classes.textFieldContainer}>
              <GridContainer>
                <GridItem className={classes.dotContainer}>
                  {THE_BIG_DOT}
                </GridItem>
                <GridItem className={classes.textField}>
                  <EditableTextForm
                    name={this.getName()}
                    value={this.getValue()}
                    renderValue={helpers.renderOtherValue}
                    onSubmit={this.handleTextFieldSubmit}
                    placeholder={`Click to specify ${this.props.paxLabel} type`}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          ) : null}
        </GridContainer>
      </GridItem>
    );
  };

  renderTextOnly = () => {
    const value = this.getValue();
    const { renderValue, renderDot, typeOnly } = this.props;
    const values = Object.keys(m);
    const includesValue = values.includes(value);
    return (
      !!value && (
        <React.Fragment>
          {typeOnly ? (
            <GridItem>
              {includesValue ? renderValue(<M {...m[value]} />) : value}
            </GridItem>
          ) : (
            <GridItem>
              {includesValue ? (
                renderValue(
                  <M
                    {...m.text}
                    values={{ type: helpers.renderValue(value) }}
                  />,
                )
              ) : (
                <div>{value}</div>
              )}
            </GridItem>
          )}
          {renderDot ? <GridItem>{THE_BIG_DOT}</GridItem> : null}
        </React.Fragment>
      )
    );
  };

  renderProp = () => {
    const { children } = this.props;
    const value = this.getValue();

    return children(value);
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.EDITABLE]: this.renderEditable,
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

PersonType.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  defaultValue: PropTypes.string,
  readOnly: PropTypes.bool,
  renderValue: PropTypes.func,
  renderDot: PropTypes.bool,
  typeOnly: PropTypes.bool,
  children: PropTypes.func,
  oType: PropTypes.string,
  // resaga value
  value: PropTypes.string,
  orgType: PropTypes.string,
  paxLabel: PropTypes.string,
};

PersonType.defaultProps = {
  id: null,
  variant: null,
  defaultValue: PERSON_TYPES.none,
  readOnly: false,
  renderValue: value => value,
  renderDot: false,
  typeOnly: false,

  value: 'other',
};

export default compose(
  withStyles(styles, { name: 'PersonTypePart' }),
  resaga(CONFIG_1),
  resaga(CONFIG_2),
)(PersonType);
