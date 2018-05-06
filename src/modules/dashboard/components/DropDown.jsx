import React              from 'react';
import PropTypes          from 'prop-types'

const DropDownCaret = () => {
  return (
    <svg version="1.1" height="12" width="12" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
      <g><g id="XMLID_621_"><path id="XMLID_623_" d="M271.4,445.6h457.2c18.5,0,35.5-10.3,44.1-26.6c8.6-16.4,7.5-36.1-3-51.4L538.3,29.4c-8.3-12.1-22-19.3-36.7-19.4c-14.7,0-28.4,7.1-36.8,19.2L230.4,367.4c-10.6,15.2-11.8,35.1-3.2,51.5C235.8,435.3,252.8,445.6,271.4,445.6z"/><path id="XMLID_622_" d="M728.6,554.4H271.4c-18.6,0-35.6,10.3-44.2,26.7c-8.6,16.4-7.4,36.3,3.2,51.5l234.5,338.2c8.4,12.1,22.1,19.2,36.8,19.2c14.7-0.1,28.4-7.3,36.7-19.4l231.4-338.2c10.5-15.3,11.6-35.1,3-51.4C764.1,564.6,747.1,554.4,728.6,554.4z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g>
    </svg>
  )
}

const DropDown = (props) => {
  let {options, selectedOptionId, text, onClick, onChange} = props;
  return (
    <div className='u-d-inline-block'>
      <div className="u-pos-rel" onClick={onClick}>
        <select className="c-select" onChange={onChange} value={selectedOptionId||text}>
          <option value={text}>{text || 'Choose a value'}</option>
          {
            options.map((option) => {
              const value = option.id || option.value;
              return (
                <option key={`option-${value}`} value={value}>{option.value}</option>
              );
            })
          }
        </select>
        <i className="c-select__icon">
          <DropDownCaret/>
        </i>
      </div>
    </div>
  )
}

export default DropDown;
