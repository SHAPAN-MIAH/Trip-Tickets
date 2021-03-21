import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router';
import map from "../../images/map.png";
import ticketImg from "../../images/tickets 3.png";

import './Destination.css'

const Destination = () => {
    const {title} = useParams();
    
    const handelSearch = ()=>{
        const fromInput = document.getElementById('fromInput').value;
        const toInput = document.getElementById('toInput').value;
        const dateInput = document.getElementById('dateInput').value;
        document.querySelector('.fromView').innerText = fromInput;
        document.querySelector('.toView').innerText = toInput;
        document.querySelector('.dateView').innerText = dateInput;


        let bookingDtl = document.querySelector(".booking-dtl");
        bookingDtl.style.display = "none";
        let bookedDtl = document.querySelector(".booked-dtl");
        bookedDtl.style.display = "block";
      
    }


    return (
        <div className="container destination-container">
            
            <div className="row">
                <div className="col-md-6">
                    <div className="booking-dtl">
                       
                       <h6>Pick From</h6>
                        <input id="fromInput" type="text"/>
                        <h6>Pick To</h6>
                        <input id="toInput" type="text"/>
                        <h6>Date</h6>
                        <input id="dateInput" type="date"/>
                        <br/>
                        <button onClick={handelSearch} id="searchBtn">Search</button>

                        
                    </div>
                    <div className="booked-dtl">
                        <div className="destinationDtl">
                            <p className="fromView"></p>
                            <p className="toView"></p>
                            <p className="dateView"></p>
                        </div>
                        
                        <div className="booked-tickets">
                            <img src={ticketImg} alt=""/>
                            <h6>{title}</h6>
                            
                        </div>
                        

                    </div>
                </div>
                <div className="col-md-6">
                        <div class="google_map">
                            <img src={map} alt=""/>
                        </div>
                </div>
            </div>
            <footer>
                <p>Copyright <span><FontAwesomeIcon icon={faCopyright}></FontAwesomeIcon></span> 2021 by Trip Tickets</p>
            </footer>
        </div>
    );
};

export default Destination;