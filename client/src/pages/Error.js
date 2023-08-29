import React from "react";

const Error = () => {
  const errorStyles = {
    color: "red",
    fontSize: "300px", // Increased font size
    fontWeight: "bold",
    textAlign: "center",
    position: "fixed", // Position fixed to keep it centered
    top: "50%", // Move the element 50% down from the top
    left: "50%", // Move the element 50% from the left
    transform: "translate(-50%, -50%)", // Center the element
    // Add more styling properties here
  };

  return <div style={errorStyles}>ERROR</div>;
};

export default Error;
