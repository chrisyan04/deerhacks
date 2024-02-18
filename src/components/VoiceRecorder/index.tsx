"use client";

import * as React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { uploadFile } from "@/actions/uploadAction";
// import { useUser } from "@auth0/nextjs-auth0/client";

export default function VoiceRecorder() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <RecorderWithRouter />
      <br />
    </div>
  );
}

function RecorderWithRouter() {
  // const { user, error, isLoading } = useUser();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  // if (!user)
  //   return (
  //     <div className="text-4xl flex flex-col justify-center items-center h-screen">
  //       Not logged in
  //     </div>
  //   );

  const addAudioElement = async (blob: Blob) => {
    const file = new File([blob], "test.wav");
    const formData = new FormData();
    console.log(formData.get("audio"));

    formData.append("audio", file);
    console.log(formData)
    try {
      // const response = await fetch("/api/save-audio", {
      //   method: "POST",
      //   body: formData,
      // });
      // await uploadFile(formData, user.email);
      await uploadFile(formData);
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
