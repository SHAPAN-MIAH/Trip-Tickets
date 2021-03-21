import React from 'react';
import { useHistory } from 'react-router';
import './TicketDtl.css';

const TicketDtl = (props) => {
    const {title, price} = props.ticket;
    const history = useHistory();

    const handleBook = (title)=>{
        history.push(`/destination/${title}`)
    }
    return (
        <div className="container">
            <div className="ticket-containers">
            <h3>{title}</h3>
            <button onClick={() => handleBook(title)} className="buyNow-btn">Buy Now</button>
            <br/>
            <h4>Price: Tk {price}</h4>
            </div>
        </div>
    );
};

export default TicketDtl;