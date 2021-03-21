import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import TicketDtl from '../TicketDtl/TicketDtl';
import './Home.css'


const Home = () => {
    const tickets = [
        {
            title: 'ONE TIME TICKET',
            price: 100
        },
        {
            title: 'ONE DAY PASS',
            price: 500
        },
        {
            title: 'MONTHLY PASS',
            price: 1500
        },
        {
            title: 'ANNUAL PASS',
            price: 9000
        }
    ]
    return (
        <div className="home">
            <div className="container">
                <h3 className="title">TICKETS</h3>

                <div className="ticket-container">
                {
                    tickets.map(ticket => <TicketDtl key={ticket.title} ticket={ticket}></TicketDtl>)
                }
                </div>
                <footer>
                <p>Copyright <span><FontAwesomeIcon icon={faCopyright}></FontAwesomeIcon></span> 2021 by Trip Tickets</p>
                </footer>
            </div>
        </div>
    );
};

export default Home;