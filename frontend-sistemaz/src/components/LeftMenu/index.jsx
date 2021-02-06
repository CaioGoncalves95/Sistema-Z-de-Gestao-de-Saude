import React from 'react';

import './styles.css';

const LeftMenu = ({options}) => {
    const test = () => {
    }

    return (
        <div className="option-block">
            <button className="option-top" onClick={test}>{options[0]}</button>
            <button className="option-mid" >{options[1]}</button>
            <button className="option-mid" >{options[2]}</button>
            <button className="option-mid" >{options[3]}</button>
            <button className="option-mid" >{options[4]}</button>
            <button className="option-mid" >{options[5]}</button>
            <button className="option-bottom" >{options[6]}</button>
        </div>
    )
}

export default LeftMenu;