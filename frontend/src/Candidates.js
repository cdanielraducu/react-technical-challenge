import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCandidates } from "./slices/candidatesSlice";
import { fetchQuestions } from "./slices/questionsSlice";

const Candidates = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCandidates());
    dispatch(fetchQuestions());
  }, []);

  const { candidates } = useSelector((state) => state.candidates);

  return (
    <div style={{ width: "80%" }}>
      <h1>Candidates</h1>
      <div
        style={{
          display: "grid",
          gridTemplate: "3fr / 1fr 1fr 1fr",
          gridGap: "16px",
          rowGap: "16px",
        }}
      >
        {candidates?.map((candidate, index) => {
          return (
            <div
              key={`candidate-${candidate.id}-${index}`}
              style={{
                paddingLeft: "2rem",
                paddingRight: "2rem",
                paddingTop: "2.5rem",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "2.5rem",
                backgroundColor: "#2c8",
                borderRadius: "1rem",
                transform: "scale(1)",
                transition: "all 0.4s ease",
              }}
              className={"candidate_expand"}
            >
              <text
                style={{
                  fontWeight: 500,
                  fontSize: "1.25rem",
                  lineHeight: "1.75rem",
                }}
              >
                {candidate.name}
              </text>
              <div
                style={{
                  opacity: 0,
                  visibility: "hidden",
                  fontWeight: 700,
                  fontSize: "1.375rem",
                  lineHeight: "1.725rem",
                  transition: "all 0.2s ease",
                }}
                className="show_text"
              >
                <Link
                  to={{ pathname: `/${candidate.name}`, state: { candidate } }}
                  style={{
                    fontSize: "2rem",
                    lineHeight: "2.5rem",
                    marginLeft: "0.5rem",
                    fontWeight: 500,
                    textDecoration: "unset",
                    color: "#000",
                    _hover: {
                      cursor: "pointer",
                    },
                  }}
                >
                  {">"}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Candidates;
