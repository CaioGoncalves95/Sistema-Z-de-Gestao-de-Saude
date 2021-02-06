import React from 'react';

import addCircle from '../../assets/images/icons/add_circle_outline_24px.svg';
import editCircle from '../../assets/images/icons/settings_24px.svg';
import minusCircle from '../../assets/images/icons/remove_circle_outline_24px.svg';
import searchCircle from '../../assets/images/icons/search_24px.svg';

import './styles.css';

const Action = ({title, type, action}) => {
    let image;
    switch(type) {
        case 'sum':
            image = addCircle;
            break;
        case 'edit':
            image = editCircle;
            break;
        case 'minus': 
            image = minusCircle;
            break;
        case 'search':
            image = searchCircle;
            break;
    }
    return (
        <button className="card" onClick={action}>
            <p className="card-title">{title}</p>
            <img src={image} alt={type}/>
        </button>
    );
}

export default Action;