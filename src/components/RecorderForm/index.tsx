"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { uploadFile } from "../../actions/uploadAction";
import { useUser } from "@auth0/nextjs-auth0/client";

import "./RecorderForm.css";

export default function RecorderForm() {
  const [title, setTitle] = useState("");
  const [audio, setAudio] = useState(new Blob());
  const [titleError, setTitleError] = useState("");
  const [topicError, setTopicError] = useState("");
  const [audioError, setAudioError] = useState("");
  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([]);
  const { user } = useUser();

  console.log(topic);

  useEffect(() => {
    fetchData(); // Fetch topics on component mount

    return () => {
      setTopics([]);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/topics");
      if (response.ok) {
        const data = await response.json();
        setTopics(data);
      } else {
        throw new Error("Failed to fetch topics");
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate title
    if (topic === "") {
      setTopicError("You must choose one topic");
      return;
    } else if (title.trim() === "") {
      setTitleError("Title cannot be empty");
      return; // Do not proceed with submission if there's an error
    } else if (audio.size === 0) {
      setAudioError("No audio file detected");
      return;
    }

    // Clear any previous errors
    setTitleError("");
    setAudioError("");
    setTopicError("");
    let questions = "";
    // Perform actions with title and audio, for example, send to the server
    try {
      const file = new File([audio], "test.wav");
      const formData = new FormData();
      formData.append("audio", file);
      const resurl = await uploadFile(formData, user?.email, title, topic);
      console.log("the url: " + resurl)
      questions = await fetch("http://localhost:5328/papi/stt/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ln: resurl }),
      })
        .then((res) => res.json())
        .then((body) => {
          return body;
        });
      console.log(questions);
    } catch (error) {
      console.error("Error while saving audio file on the server-side", error);
    }

    // Reset form fields if needed
    setTitle("");
    setAudio(new Blob());
    setTopic("");
  };

  return (
    <div>
      <form
        id="recorder-form"
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center h-screen"
      >
        <div
          className="flex flex-col items-center justify-center mt-10 border border-gray-300 p-4 rounded style"
          style={{
            backgroundColor: "#7E9BF6",
            width: "100%",
            margin: "0 auto",
            borderRadius: "50px",
            marginBottom: "15px",
          }}
        >
          <div className="dashboard grid grid-cols-2 max-sm:grid-cols-1 topics">
            {topics.map((topic: any, index: number) => {
              return (
                <div
                  key={index}
                  className="px-4 flex items-center"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    setTopic(topic.topic);
                  }}
                >
                  <span className="text-xl">{topic.topic}</span>
                </div>
              );
            })}
          </div>
        </div>
        {topicError && <p style={{ color: "red" }}>{topicError}</p>}
        <input
          type="text"
          className="mb-4 p-4"
          placeholder="Enter a title"
          style={{ color: "black", borderRadius: "50px", width: "75%" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && <p style={{ color: "red" }}>{titleError}</p>}
        <AudioRecorder
          onRecordingComplete={(blob) => {
            setAudio(blob);
          }}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          onNotAllowedOrFound={(err: any) => console.table(err)}
          downloadOnSavePress={false}
          downloadFileExtension="wav"
          mediaRecorderOptions={{
            audioBitsPerSecond: 128000,
          }}
        />
        {audioError && <p style={{ color: "red" }}>{audioError}</p>}
        <button
          type="submit"
          className="mt-4 p-3"
          style={{
            backgroundColor: "#7E9BF6",
            width: "50%",
            borderRadius: "50px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
