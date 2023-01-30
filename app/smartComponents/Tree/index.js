import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export class Tree extends PureComponent {
  constructor(props) {
    super(props);
    this.initializeArr();
  }

  arrSetter = pair => arr => (arr ? [...arr, ...pair] : pair);

  initializeArr = () => {
    const parentId = this.props.parentId;
    const pair = [[this.props.id, parentId]];
    this.props.resaga.setValue({
      array: this.arrSetter(pair),
    });
  };

  stripOwnProps = () => omit(this.props, ['id', 'childIds', 'resaga']);

  render = () => (
    <>
      {this.props.childIds.map(childId => (
        <TreeWithHOC
          key={childId}
          {...this.stripOwnProps()}
          id={childId}
          parentId={this.props.id}
        />
      ))}
    </>
  );
}

Tree.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  parentId: PropTypes.number,
  id: PropTypes.number,
  selectors: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  viewPath: PropTypes.string,
  viewStore: PropTypes.string,

  // resaga props
  childIds: PropTypes.array,
};

Tree.defaultProps = {
  id: 0,
  selectors: [],
  viewPath: 'tree',
  viewStore: '',
  childIds: [],
};

const TreeWithHOC = compose(resaga(CONFIG))(Tree);

export default TreeWithHOC;
