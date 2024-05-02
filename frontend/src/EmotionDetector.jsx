import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUpload, faExclamationTriangle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const EmotionDetector = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [emotion, setEmotion] = useState(null);
  const [status, setStatus] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [predicting, setPredicting] = useState(false);

  // Fetch employees when component mounts
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3001/api/employee/all")
      .then((response) => setEmployees(response.data))
      .catch(() =>
        setStatus({ type: "error", message: "Failed to fetch employees" })
      );
  }, []);

  const handleUpload = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const predictWord = () => {
    if (!audioFile) {
      setStatus({ type: "error", message: "Please select a WAV file" });
      return;
    }
    setPredicting(true);
    const formData = new FormData();
    formData.append("file", audioFile);

    axios
      .post("http://127.0.0.1:3001/api/voice/predict", formData)
      .then((response) => {
        const emotion = response.data.emotion;
        setEmotion(emotion);
        setPredicting(false);
      })
      .catch((error) => {
        console.error("Error predicting word:", error.message);
        setStatus({ type: "error", message: "Failed to predict word" });
      });
  };

  const saveEmotionRecord = () => {
    if (!selectedEmployee || !emotion) {
      setStatus({
        type: "error",
        message: "Please select an employee and upload an audio file.",
      });
      return;
    }
    axios
      .post("http://127.0.0.1:3001/api/emotion/create", {
        employee_id: selectedEmployee,
        date: new Date().toISOString().slice(0, 10),
        status: emotion,
      })
      .then(() =>
        setStatus({ type: "success", message: "Emotion recorded successfully" })
      )
      .catch(() =>
        setStatus({ type: "error", message: "Failed to record emotion" })
      );
  };

  useEffect(() => {
    if (status) {
      const timeoutId = setTimeout(() => {
        setStatus(null);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [status]);

  return (
    <div
      style={{
        backgroundColor: "rgba(245, 245, 245, 1)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease-in-out",
          margin: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "6px",
            padding: "10px",
          }}
        >
          Recognize Employee Voice Emotion
        </h2>
        <p
          style={{
            fontSize: "18px",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          Please select an employee and upload a WAV file.
        </p>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            fontSize: "18px",
            borderRadius: "4px",
            border: "1px solid rgba(169, 169, 169, 0.6)",
            boxShadow: "0 0 10px rgba(169, 169, 169, 0.6)",
            padding: "10px",
          }}
        >
          <option value="">Select an employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <input
            type="file"
            onChange={handleUpload}
            style={{
              fontSize: "18px",
              borderRadius: "4px",
              border: "1px solid rgba(169, 169, 169, 0.6)",
              boxShadow: "0 0 10px rgba(169, 169, 169, 0.6)",
              padding: "10px",
              margin: "10px",
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={predictWord}
            style={{
              backgroundColor: "#3498db",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              margin: "10px",
            }}
          >
            {predicting ? "Predicting..." : <FontAwesomeIcon icon={faUpload} />} Upload
          </button>
        </div>
        <p
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "6px",
            padding: "10px",
          }}
        >
          {emotion && <span style={{ color: "green" }}>{emotion}</span>}
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={saveEmotionRecord}
          style={{
            backgroundColor: "#3498db",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            margin: "10px",
          }}
        >
          <FontAwesomeIcon icon={faSave} /> Save
        </button>
        {status && (
          <div
            style={{
              backgroundColor:
                status.type === "error" ? "#fce4e4" : "#c6efce",
              borderColor:
                status.type === "error" ? "#fce4e4" : "#c6efce",
              padding: "10px",
              borderRadius: "4px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              position: "fixed",
              top: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: "1",
              margin: "10px",
            }}
          >
            <div>
              {status.type === "error" ? (
                <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: 10 }} />
              ) : (
                <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: 10 }} />
              )}
              <span>{status.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

};

export default EmotionDetector;