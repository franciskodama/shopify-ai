import "../styles/Main.css";
import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { v4 as uuidv4 } from "uuid";

const Main = () => {
  const [status, setStatus] = useState("COMMAND");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [content, setContent] = useState({
    id: "",
    prompt: "",
    result: "",
  });
  const uniqueId = uuidv4();
  const arrayOfResults = [];

  useEffect(() => {
    arrayOfResults.push(content);
  }, [result]);

  const onSubmit = (e) => {
    e.preventDefault();

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    setStatus("THINKING...");
    const openai = new OpenAIApi(configuration);

    openai
      .createCompletion("text-curie-001", {
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        setResult(response.data.choices[0].text);
        setContent((prev) => ({
          ...prev,
          id: uniqueId,
          prompt: prompt,
          result: result,
        }));

        console.log(arrayOfResults);

        setStatus("COMMAND AGAIN");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <section className="main">
      <div className="container">
        <title>Shopify Challenge by Francis Kodama</title>

        <main>
          <h1>Fun with AI</h1>
          <p className="main__signature">Shopify Challenge by Francis Kodama</p>

          <form onSubmit={onSubmit}>
            <label>Enter prompt:</label>
            <textarea
              type="text"
              name="prompt"
              placeholder="What is your demand, Master?"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button
              className="btn btn--color"
              type="submit"
              style={{
                backgroundColor:
                  status === "THINKING..."
                    ? "var(--color-dark)"
                    : "var(--color-third)",
              }}
            >
              {status}
            </button>
          </form>

          <ul className="main__result">
            {arrayOfResults.map(({ id, prompt, result }) => (
              <li key={id}>
                Your command: {prompt} My Answer: {result}
              </li>
            ))}
          </ul>
          {/* <div className="main__result">{arrayOfResults[0].prompt}</div> */}
        </main>
      </div>
    </section>
  );
};

export default Main;
