import "../styles/Main.css";
import React, { useState } from "react";

const Main = () => {
  const [status, setStatus] = useState("SUBMIT");

  // ===================================================
  const [promptInput, setPromptInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: promptInput }),
    });
    const data = await response.json();
    setResult(data.result);
    console.log(data.result);
    // setPromptInput("");
  }

  return (
    <section className="main">
      <div className="container">
        <h1>Fun with AI</h1>

        <form onSubmit={onSubmit}>
          <label>Enter prompt:</label>
          <textarea
            type="text"
            name="prompt"
            placeholder="Ask something like this example: Create a list of 8 questions for my interview with a science fiction author."
            value={promptInput}
            onChange={(event) => {
              setPromptInput(event.target.value);
            }}
          />

          <button
            className="btn btn--color-third"
            type="submit"
            style={{
              backgroundColor:
                status === "SENT" ? "var(--color-dark)" : "var(--color-third)",
            }}
          >
            {status}
          </button>
        </form>
        <div className="main__result">{result}</div>
      </div>
    </section>
  );
};

export default Main;
