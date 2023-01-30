import React, { Fragment, PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import { CONFIG } from './config';
import AddEditChecklist from '../AddEditChecklist';
import SeeDetailCheckitem from '../SeeDetailCheckitem';

export class ChecklistDialogs extends PureComponent {
  state = {};

  render = () => {
    const {
      editChecklistId,
      addChecklistParentId,
      seeCheckItemDetail,
      seeCheckItemParentId,
    } = this.props;

    return (
      <Fragment>
        <SeeDetailCheckitem
          id={seeCheckItemDetail}
          parentNodeId={seeCheckItemParentId}
        />
        <AddEditChecklist
          id={editChecklistId}
          parentNodeId={addChecklistParentId}
        />
      </Fragment>
    );
  };
}

ChecklistDialogs.propTypes = {
  // hoc props

  // parent props

  // resaga props
  seeCheckItemDetail: PropTypes.number,
  seeCheckItemParentId: PropTypes.number,
  editChecklistId: PropTypes.number,
  addChecklistParentId: PropTypes.number,
};

ChecklistDialogs.defaultProps = {
  seeCheckItemDetail: 0,
  seeCheckItemParentId: 0,
  editChecklistId: 0,
  addChecklistParentId: 0,
};

export default compose(resaga(CONFIG))(ChecklistDialogs);
