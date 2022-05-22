import "../styles/Main.css";
import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { v4 as uuidv4 } from "uuid";
import Logo from "../assets/images/logo-fkodama.svg";
import QuestionMark from "../assets/images/ico-question.svg";

const Main = () => {
  const [status, setStatus] = useState("GET YOUR SUGGESTION");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [id, setId] = useState("");
  const [content, setContent] = useState([]);
  const [engine, setEngine] = useState("text-curie-001");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (result) {
      const newResult = {
        id: id,
        prompt: prompt,
        result: result,
      };

      const updatedContent = [...content, newResult];
      setContent(updatedContent);
    }
  }, [result]);

  const onSubmit = (e) => {
    e.preventDefault();

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    setStatus("THINKING...");
    const openai = new OpenAIApi(configuration);

    openai
      .createCompletion(engine, {
        prompt: prompt,
        temperature: 1,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
      })
      .then((response) => {
        setId(uuidv4());
        setPrompt(prompt);
        setResult(response.data.choices[0].text.trim());
        setStatus("WOW! I WANT MORE SUGGESTIONS :)");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <header>
        <div className="container">
          <img
            src={Logo}
            alt="Logo Francis Kodama Webdeveloper"
            className="logo"
          />
          <p className="signature">
            <span style={{ color: "var(--color-third)" }}>
              Shopify Challenge
            </span>
            <br></br>Frontend Developer
          </p>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="container">
            <div
              className="modal"
              style={{ display: isActive ? "flex" : "none" }}
            >
              <p className="modal__title">
                Choose an engine based on its characteristics:
              </p>
              <ul className="modal__engine">
                <li className="modal__engine-title">Davinci</li>
                <li className="modal__engine-description">
                  {" "}
                  Most capable engine. Can do any task the other models can do,
                  often with less context.
                </li>
              </ul>
              <ul className="modal__engine">
                <li className="modal__engine-title">Curie</li>
                <li className="modal__engine-description">
                  Very capable, but faster!
                </li>
              </ul>
              <ul className="modal__engine">
                <li className="modal__engine-title">Babbage</li>
                <li className="modal__engine-description">
                  Capable of straightforward tasks and very fast.
                </li>
              </ul>
              <ul className="modal__engine">
                <li className="modal__engine-title">Ada</li>
                <li className="modal__engine-description">
                  Capable of very simple tasks, usually the fastest model in the
                  GPT-3 series.
                </li>
              </ul>
            </div>
            <p className="question">
              Can't you figure out what to watch on TV?
            </p>
            <h1 className="title">TV Suggestion Helper</h1>

            <form onSubmit={onSubmit}>
              <ul className="examples">
                <h2 className="examples__title">Check out some examples:</h2>
                <li className="examples__item">
                  Suggest a drama movie based on a true story with a good score
                  on the rotten tomatoes website.
                </li>
                <li className="examples__item">
                  What Brazilian comedy shows can I watch on Netflix today?
                </li>
                <li className="examples__item">
                  Give me 3 suggestions of animation movies.
                </li>
                <li className="examples__item">
                  What's the best thriller series available on Prime in Canada?
                </li>
              </ul>

              <textarea
                type="text"
                name="prompt"
                placeholder="Give me a good suggestion of..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />

              <div className="select-and-button">
                <img
                  src={QuestionMark}
                  alt="question mark icon"
                  className="engine-icon"
                  onMouseEnter={() => setIsActive(true)}
                  onMouseLeave={() => setIsActive(false)}
                />
                <p className="engine-title">A.I. engine:</p>
                <select
                  className="select"
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                >
                  <option value="text-davinci-002">Davinci</option>
                  <option value="text-curie-001" defaultChecked>
                    Curie
                  </option>
                  <option value="text-babbage-001">Babbage</option>
                  <option value="text-ada-001">Ada</option>
                </select>

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
              </div>
            </form>

            <ul className="result">
              {content.map(({ id, prompt, result }) => (
                <li className="result__item" key={id}>
                  <div className="result__prompt-wrapper">
                    <h4 className="result__title">Your question:</h4>
                    <p className="result__text">{prompt}</p>
                  </div>
                  <div className="result__answer-wrapper">
                    <h4 className="result__title">My Suggestion:</h4>
                    <p className="result__text">{result}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default Main;
