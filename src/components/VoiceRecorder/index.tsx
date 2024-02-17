"use client";

import * as React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

export default function VoiceRecorder() {
  const addAudioElement = async (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "recording.wav";
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Save the audio file on the server-side
    const formData = new FormData();
    formData.append("audio", blob);

    try {
      const response = await fetch("/save-audio", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Audio file saved on the server-side");
      } else {
        console.error("Failed to save audio file on the server-side");
      }
    } catch (error) {
      console.error("Error while saving audio file on the server-side", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AudioRecorder
        onRecordingComplete={addAudioElement}
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
      <br />
    </div>
  );
}
