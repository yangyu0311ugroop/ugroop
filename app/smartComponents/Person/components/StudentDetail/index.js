import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { EditableForm } from 'smartComponents/Editables';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import TextOnly from './components/TextOnly';
import { Number, Year, Class } from './parts';
import { CONFIG } from './config';

export class StudentDetail extends React.PureComponent {
  handleEditableSubmit = ({ model, ...rest }) => {
    const { id: studentDetailId, personId } = this.props;
    if (studentDetailId) {
      PERSON_DETAIL_HELPER.patchStudentDetail(
        {
          personId,
          studentDetailId,
          ...model,
          ...rest,
        },
        this.props,
      );
    } else {
      PERSON_DETAIL_HELPER.addStudentDetail(
        {
          personId,
          ...model,
          ...rest,
        },
        this.props,
      );
    }
  };

  renderPart = (Component, variant) => (
    <Component {...this.props} variant={variant} />
  );

  renderTextOnly = () => {
    const { id, placeholder } = this.props;
    return <TextOnly id={id} placeholder={placeholder} />;
  };

  renderForm = () => (
    <GridContainer direction="column">
      <GridItem>
        <GridContainer>
          <GridItem xs={6}>
            {this.renderPart(Year, VARIANTS.TEXT_FIELD)}
          </GridItem>
          <GridItem xs={6}>
            {this.renderPart(Class, VARIANTS.TEXT_FIELD)}
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>{this.renderPart(Number, VARIANTS.TEXT_FIELD)}</GridItem>
    </GridContainer>
  );

  renderEditable = () => {
    const { id, readOnly, placeholder } = this.props;
    return (
      <GridItem>
        <EditableForm
          value={id}
          renderValue={this.renderTextOnly}
          onSubmit={this.handleEditableSubmit}
          readOnly={readOnly}
          placeholder={placeholder}
        >
          {this.renderForm()}
        </EditableForm>
      </GridItem>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.FORM]: this.renderForm,
      [DEFAULT]: this.renderEditable,
    });
  };
}

StudentDetail.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,

  // resaga value
  personId: PropTypes.number,
};

StudentDetail.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,
  placeholder: 'Click to specify details',

  personId: null,
};

export default resaga(CONFIG)(StudentDetail);
