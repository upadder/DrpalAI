import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import './home.css';
import { ChatContextProvider } from '../../context/chatContext';
// import FormComponent from '../form-component/form-component'; 
import ContactForm from '../contact-form/contact-form';
import Setting from './Setting';
import Modal from './Modal';
import logo from '../../assets/logo.png';
import ChatView from './ChatView';
// import PatientSummary from "../PatientSummary/PatientSummary";

import PatientAppointmentHistory from "../PatientHistory/PatientAppointmentHistory";
const Home = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [showForm,setShowForm] = useState(true);
    const [appointmentData,setAppointmentsData] = useState([]);
    
    const onButtonClick = () => {
        // You'll update this function later
    }

    return <div className="Home">
            <div className="split-screen">
                <div className="left">
                <div className="content">
                <ChatContextProvider>
                    {/* <Modal title="Setting" modalOpen={modalOpen} setModalOpen={setModalOpen}>
                        <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
                    </Modal> */}
                    <div className="flex transition duration-500 ease-in-out ">
                        {/* <SideBar /> */}
                        <ChatView />
                    </div>
                </ChatContextProvider>
                </div>
                </div>
                <div className="right">
                <div className="content">
                    {/* <FormComponent />  */}
                    
                    {showForm ? <ContactForm setAppointmentsData = {setAppointmentsData} setShowForm = {setShowForm}/> : <PatientAppointmentHistory appointmentData = {appointmentData}/> }
                    
                </div>
                </div>
            </div>
        </div>
}

export default Home
