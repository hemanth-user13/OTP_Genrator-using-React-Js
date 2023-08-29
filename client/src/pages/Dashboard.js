import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const navigate = useNavigate();

  const userValid = () => {
    let token = localStorage.getItem("userdbtoken");
    if (!token) {
      navigate("*");
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSlotSelect = (slotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const handleBookAppointment = () => {
    if (selectedSlot) {
      const newAppointment = {
        title: "New Appointment",
        start: selectedSlot.start,
        end: selectedSlot.end,
      };
      setAppointments([...appointments, newAppointment]);
      setSelectedSlot(null);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dashboard
      </h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>Calendar</h2>
          <Calendar
            localizer={localizer}
            events={appointments}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSlotSelect}
            style={{ height: 400 }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <button
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleBookAppointment}
            >
              Book Appointment
            </button>
            <button
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#FF5733",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleBookAppointment}
            >
              Cancel Appointment
            </button>
          </div>
        </div>
        <div style={{ marginLeft: "30px" }}>
          {selectedSlot && (
            <div>
              <h2 style={{ fontSize: "20px" }}>Selected Time Slot</h2>
              <p>
                Start: {selectedSlot.start.toLocaleString()} <br />
                End: {selectedSlot.end.toLocaleString()}
              </p>
            </div>
          )}
          {selectedSlot && !submitted && (
            <button
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                cursor: "pointer",
                marginTop: "10px",
              }}
              onClick={handleSubmit}
            >
              Confirm Appointment
            </button>
          )}
          {submitted && (
            <div>
              <h2 style={{ fontSize: "20px", marginTop: "20px" }}>
                Confirmed Appointments
              </h2>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {appointments.map((appointment, index) => (
                  <li
                    key={index}
                    style={{
                      fontSize: "16px",
                      marginBottom: "10px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {appointment.title} - {appointment.start.toLocaleString()}{" "}
                    to {appointment.end.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
