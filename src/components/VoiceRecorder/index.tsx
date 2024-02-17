"use client";

import * as React from "react";
// import { useRouter } from "next/navigation";
import { AudioRecorder } from "react-audio-voice-recorder";
import { uploadFile } from "@/actions/uploadAction";

export default function VoiceRecorder() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <RecorderWithRouter />
      <br />
    </div>
  );
}

function RecorderWithRouter() {
  // const router = useRouter();

  const addAudioElement = async (blob: Blob) => {
    const file = new File([blob], "test.wav");
    const formData = new FormData();
<<<<<<< HEAD
    formData.append("audio", blob);
    console.log(formData)
=======
    formData.append("audio", file);
    console.log(formData.get("audio"));

>>>>>>> 5e2553bbea996c91379efd3e8f773899565383d4
    try {
      // const response = await fetch("/api/save-audio", {
      //   method: "POST",
      //   body: formData,
      // });
      const res = await uploadFile(formData);
      // if (res.ok) {
      //   const data = await res.json();
      //   console.log("Audio file saved on the server-side:", data.fileName);
      //   // Redirect or do something else with the saved file
      //   router.push(`/audio/${data.fileName}`);
      // } else {
      //   console.error("Failed to save audio file on the server-side");
      // }
    } catch (error) {
      console.error("Error while saving audio file on the server-side", error);
    }
  };

  return (
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
  );
}
