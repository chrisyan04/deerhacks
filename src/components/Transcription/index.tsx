import { useState } from "react";

export default function Transcription() {
  const [transcription, setTranscription] = useState("");

  const handleSTTRequest = async () => {
    const txt = {
      ln: "https://res.cloudinary.com/dyhkvcl9v/raw/upload/v1708235515/voice-recordings/orhancangurel%40gmail.com-Title.wav",
    };

    try {
      const response = await fetch("http://localhost:5328/papi/stt/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(txt),
      });

      if (response.ok) {
        const data = await response.json();
        setTranscription(data.transcription); // assuming the response contains a 'transcription' field
      } else {
        console.error("Failed to get transcription");
      }
    } catch (error) {
      console.error("Error occurred while fetching transcription:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSTTRequest}>Get Transcription</button>
      <div>{transcription}</div>
    </div>
  );
}
