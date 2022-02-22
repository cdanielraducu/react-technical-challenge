import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Candidate = () => {
  const { candidate } = useLocation().state;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:3010/applications?id=${candidate.applicationId}`
    ).then((res) => {
      res.json().then((res) => setVideos(res[0].videos));
    });
  }, []);
  const questions = useSelector((state) => state.questions.candidates);
  console.log("vid-", videos);
  const question = useMemo(
    () =>
      questions.find((question) => question.id === videos[0]?.questionId)
        ?.question ?? "",
    [videos]
  );

  const [newCommentValue, setNewCommentValue] = useState("");

  const sendComment = async () => {
    await fetch(
      `http://localhost:3010/applications?id=${candidate.applicationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...videos[0],
          comments: [...videos[0].comments, newCommentValue],
        }),
      }
    ).finally(() => {
      fetch(
        `http://localhost:3010/applications?id=${candidate.applicationId}`
      ).then((res) => {
        res.json().then((res) => setVideos(res[0].videos));
      });
    });
  };

  return (
    <div>
      <Link to="/" style={{ color: "#000" }}>
        {"< Back"}
      </Link>

      <h2>{candidate?.name}</h2>
      <h3>Q: {question}</h3>
      <video width="800" height="452" controls src={videos[0]?.src}></video>
      <h3>Comments:</h3>
      <div>{videos[0]?.comments}</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "0.5rem" }}>New comment:</div>
        <input
          value={newCommentValue}
          onChange={(e) => setNewCommentValue(e.target.value)}
          style={{
            width: "50%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
          }}
        />
        <button
          style={{
            backgroundColor: "#2c8",
            border: "none",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            borderRadius: "2rem",
            marginLeft: "0.5rem",
            fontWeight: 700,
          }}
          onClick={() => {
            sendComment();
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default Candidate;
