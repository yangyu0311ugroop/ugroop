/**
 * Created by stephenkarpinskyj on 12/7/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import GridItem from 'components/GridItem';
import { EventIcon } from 'viewComponents/Event';
import { EditableSelectForm } from 'smartComponents/Editables';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import iconUtils from '../../utils';

export class IconEditableHeadingForm extends React.PureComponent {
  getValue = () => {
    const { value } = this.props;
    return value || '';
  };

  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  makeOptions = () => {
    const { type, subtype } = this.props;
    return iconUtils.makeIconOptions(type, subtype);
  };

  renderValue = value => {
    const { type, subtype } = this.props;
    return (
      <EventIcon
        type={type}
        subtype={subtype}
        iconOverride={value}
        size="base"
      />
    );
  };

  render = () => {
    const {
      dataId,
      name,
      SelectProps,
      readOnly,
      rootClass,
      displayFlex,
    } = this.props;
    return (
      <GridItem className={rootClass}>
        <EditableSelectForm
          value={this.getValue()}
          name={name}
          options={this.makeOptions()}
          placeholder={null}
          renderValue={this.renderValue}
          SelectProps={SelectProps}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
          displayFlex={displayFlex}
        >
          <EventPatchData dataId={dataId} />
        </EditableSelectForm>
      </GridItem>
    );
  };
}

IconEditableHeadingForm.propTypes = {
  // parent
  dataId: PropTypes.number,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  subtype: PropTypes.string,
  SelectProps: PropTypes.object,
  readOnly: PropTypes.bool,
  rootClass: PropTypes.string,
  displayFlex: PropTypes.bool,
};

IconEditableHeadingForm.defaultProps = {
  dataId: null,
  value: '',
  type: '',
  subtype: '',
  SelectProps: {},
  readOnly: false,
  displayFlex: false,
};

export default compose(resaga())(IconEditableHeadingForm);
