import "../styles/Main.css";
import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { v4 as uuidv4 } from "uuid";
import Logo from "../assets/images/logo-fkodama.svg";

const Main = () => {
  const [status, setStatus] = useState("COMMAND");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [id, setId] = useState("");
  const [content, setContent] = useState([]);

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
      .createCompletion("text-curie-001", {
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
        setStatus("COMMAND AGAIN");
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
            Shopify Challenge <br></br>Frontend Developer
          </p>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="container">
            <h1 className="title">Fun with AI</h1>

            <form onSubmit={onSubmit}>
              <p className="examples">Tell me 3 names for an cat.</p>
              <p className="examples">
                Give me a suggestion of giftsTell me 3 names for an cat.
              </p>
              <p className="examples">
                Write me a cold email for small business
              </p>

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

            <ul className="result">
              {content.map(({ id, prompt, result }) => (
                <li className="result__item" key={id}>
                  <div className="result__prompt-wrapper">
                    <h4 className="result__title">Your command:</h4>
                    <p className="result__text">{prompt}</p>
                  </div>
                  <div className="result__answer-wrapper">
                    <h4 className="result__title">My Answer:</h4>
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

// const Main = () => {
//   const [status, setStatus] = useState("COMMAND");
//   const [prompt, setPrompt] = useState("");
//   const [content, setContent] = useState({
//     id: "",
//     prompt: "",
//     result: "",
//   });
//   const uniqueId = uuidv4();
//   const arrayOfResults = [];

//   useEffect(() => {
//     arrayOfResults.push(content);
//     console.log(
//       arrayOfResults[0].id,
//       arrayOfResults[0].prompt,
//       arrayOfResults[0].result
//     );
//     setStatus("COMMAND AGAIN");
//   }, [content]);

//   const onSubmit = (e) => {
//     e.preventDefault();
//     const configuration = new Configuration({
//       apiKey: process.env.REACT_APP_OPENAI_API_KEY,
//     });
//     setStatus("THINKING...");
//     const openai = new OpenAIApi(configuration);

//     openai
//       .createCompletion("text-curie-001", {
//         prompt: prompt,
//         temperature: 0.5,
//         max_tokens: 60,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//       })
//       .then((response) => {
//         setContent((prev) => ({
//           ...prev,
//           id: uniqueId,
//           prompt: prompt,
//           result: response.data.choices[0].text,
//         }));
//       })
//       .catch((error) => {
//         if (error.response) {
//           console.log(error.message);
//         }
//       });
//   };

//   return (
//     <section className="main">
//       <div className="container">
//         <title>Shopify Challenge by Francis Kodama</title>

//         <main>
//           <h1>Fun with AI</h1>
//           <p className="main__signature">Shopify Challenge by</p>
//           <img
//             src={Logo}
//             alt="Logo Francis Kodama Webdeveloper"
//             className="main__logo"
//           />

//           <form onSubmit={onSubmit}>
//             <label>Enter prompt:</label>
//             <textarea
//               type="text"
//               name="prompt"
//               placeholder="What is your demand, Master?"
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//             />

//             <button
//               className="btn btn--color"
//               type="submit"
//               style={{
//                 backgroundColor:
//                   status === "THINKING..."
//                     ? "var(--color-dark)"
//                     : "var(--color-third)",
//               }}
//             >
//               {status}
//             </button>
//           </form>

//           <ul className="main__result">
//             {arrayOfResults.map(({ id, prompt, result }) => (
//               <li key={id}>
//                 Your command: {prompt} My Answer: {result}
//               </li>
//             ))}
//           </ul>

//         </main>
//       </div>
//     </section>
//   );
// };

// export default Main;
