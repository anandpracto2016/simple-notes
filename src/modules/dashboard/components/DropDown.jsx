import React              from 'react';

const DropDown = (props) => {
  let {options, selectedOptionId, text, onClick, onChange} = props;
  return (
    <div className='c-dropdown-wrapper'>
      <select className="c-dropdown-select" id='folderDropdown'>
        <option value="" disabled selected>{text}</option>
        {
          options.map((option) => {
            const value = option.id || option.value;
            return (
              <option key={`option-${value}`} value={value}>{option.value}</option>
            );
          })
        }
      </select>
    </div>
  )
}

export default DropDown;
