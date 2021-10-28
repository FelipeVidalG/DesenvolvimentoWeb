import React from 'react';
import ReactInputDateMask from 'react-input-date-mask';

function DateInput(props) {
    return <ReactInputDateMask  mask='dd/mm/yyyy' showMaskOnFocus={true}  className={props.className}  onChange={props.onChange} showMaskOnHover={true} />;
}

export default DateInput