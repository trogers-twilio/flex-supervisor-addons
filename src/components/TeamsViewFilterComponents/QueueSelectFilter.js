import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Select from 'react-select';

import { setSelectedQueue } from '../../state';

// Setting height to the max allowed for any individual filter
// to provide as much room as possible to the options list
const FilterContainer = styled('div')`
  height: 220px;
  margin-left: 16px;
  margin-right: 16px;
`;

const mapStateToProps = (state) => {
  return {
    selectedQueue: state?.flex?.view?.componentViewStates?.queueFilter?.selectedQueue
  }
}

class QueueSelectFilterClass extends React.Component {
  state = {
    selectedQueue: undefined
  }

  elementId = `${this.props.name}-select`;

  selectStyles = {
    // Setting maxHeight to 53 to ensure the input field only expands
    // to two lines. If it grows beyond two lines, it will push the
    // menu list outside of the div and requiring scrolling the containing
    // div as well as the menu list itself to see all the options, which
    // could be confusing for the user
    valueContainer: (provided) => ({
      ...provided,
      maxHeight: 50,
      overflow: 'auto',
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: 0,
      maxHeight: 53
    }),
    // Setting maxHeight to 150px to ensure that its height along with
    // the input container's height at two lines of selected options
    // doesn't exceed the height of the containing div
    menuList: (provided) => ({
      ...provided,
      maxHeight: '150px',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: 0,
    })
  };

  componentDidUpdate() {
    const { currentValue } = this.props;

    if (this.props.selectedQueue && !currentValue) {
      this._handleChange(this.props.selectedQueue);
    }
  }

  _handleChange = (e, v) => {
    const newValue = e?.value ? e.value : e;
    console.debug('QueueSelectFilter, _handleChange, e:', e);
    this.props.handleChange(newValue);
    setSelectedQueue(newValue);
    const valueContainer = document.querySelector(`.${this.props.name}__value-container`);
    // Without setting scrollTop, the most recently selected option can be hidden
    // until the user manually scrolls to the bottom of the value containers
    valueContainer.scrollTop = valueContainer.scrollHeight - valueContainer.clientHeight;
  }

  render() {
    const {
      isMultiSelect,
      name,
      options,
      selectedQueue
    } = this.props;

    const isMulti = isMultiSelect === undefined ? true : isMultiSelect;
    return (
      <FilterContainer>
        <Select
          classNamePrefix={name}
          id={this.elementId}
          isClearable
          isMulti={isMulti}
          name={name}
          options={options}
          onChange={this._handleChange}
          styles={this.selectStyles}
          value={options.filter(o => o.value === selectedQueue)}
        />
      </FilterContainer>
    )
  }
};

export const QueueSelectFilter = connect(mapStateToProps)(QueueSelectFilterClass);

export const QueueSelectFilterLabel = connect(mapStateToProps)((props) => {
  let label = 'Any';
  // if (selectedQueue && selectedQueue?.label) {
  //   label = selectedQueue.label;
  // }
  const { activeOption, currentValue, options } = props;
  console.debug('QueueSelectFilterLabel, props:', props);
  if (activeOption?.label) {
    label = activeOption.label;
  }
  else if (currentValue) {
    label = options.find(o => o.value === currentValue)?.label || currentValue;
  }
  // else if (Array.isArray(currentValue) && currentValue.length === 1) {
  //   label = `${currentValue[0]} only`;
  // }
  // else if (Array.isArray(currentValue) && currentValue.length > 1) {
  //   label = `${currentValue.length} selected`;
  // }
  return (<>{label}</>);
});

