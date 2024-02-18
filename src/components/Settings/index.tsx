'use client'

import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import AddPopup from "../../components/AddPopup";
import "./Settings.css";

export default function Settings() {
  const { user, error: authError, isLoading } = useUser();
  const [showPopup, setShowPopup] = useState(false);
  const [topics, setTopics] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleAddTopic = async (topicData: any) => {
    try {
      const response = await fetch("/api/topics", {
        method: "POST",
        body: JSON.stringify(topicData),
      });
      if (response.ok) {
        console.log("Topic added successfully");
        // Refresh topics after adding a new one
        fetchData();
      } else {
        throw new Error("Failed to add topic");
      }
    } catch (error) {
      console.error("Error adding topic:", error);
      // Optionally, set an error state to display a message to the user
    }
  };

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
        setFetchError(null);
      } else {
        throw new Error("Failed to fetch topics");
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (authError) return <div>{authError.message}</div>;

  if (!user)
    return (
      <div className="text-4xl flex flex-col justify-center items-center h-screen">
        Not logged in
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="flex flex-col align-items items-center">
        <Image
          src={user.picture ?? ""}
          alt={user.name ?? ""}
          width={200}
          height={200}
        />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          <button>
            <a href="/api/auth/logout">Logout</a>
          </button>
        </div>
      </div>
      <button onClick={openPopup}>Add Topic</button>

      {showPopup && (
        <AddPopup
          userEmail={user.email ?? ""}
          onClose={closePopup}
          onSubmit={handleAddTopic}
        />
      )}

      {fetchError ? (
        <div>{fetchError}</div>
      ) : (
        <div
          className="flex flex-col items-center justify-center mt-10 border border-gray-300 p-4 rounded style"
          style={{
            backgroundColor: "#7E9BF6",
            width: "50%",
            margin: "0 auto",
            borderRadius: "50px",
          }}
        >
          <div className="dashboard grid grid-cols-2 max-sm:grid-cols-1 topics">
            {topics.map((topic: any, index: number) => (
              <div key={index} className="px-4 flex items-center">
                <span className="text-xl">{topic.topic}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
