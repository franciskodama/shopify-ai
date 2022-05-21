import "../styles/Main.css";
import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const Main = () => {
  const [status, setStatus] = useState("COMMAND");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("Waiting for your command...");

  const onSubmit = (e) => {
    e.preventDefault();

    const configuration = new Configuration({
      apiKey: "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",
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
        console.log(result);
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
          <div className="main__result">{result}</div>
        </main>
      </div>
    </section>
  );
};

export default Main;

//   return (
//     <div>
//       <title>OpenAI Quickstart</title>

//       <main>
//         <h3>Name my pet</h3>

//         <form onSubmit={onSubmit}>
//           <input
//             type="text"
//             name="prompt"
//             placeholder="What is your demand, Master?"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//           />
//           <input type="submit" value="Generate" />
//         </form>

//         <div>{result}</div>
//       </main>
//     </div>
//   );
// };

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// const response = await openai.createCompletion("text-curie-001", {
//   prompt:
//     "Correct this to standard English:\n\nShe no went to the market.\n\nShe didn't go to the market.",
//   temperature: 0.5,
//   max_tokens: 60,
//   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0,
// });

//   const [promptInput, setPromptInput] = useState("");
//   const [result, setResult] = useState();

//   async function onSubmit(event) {
//     event.preventDefault();

//     const response = await fetch("/api/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ prompt: promptInput }),
//     });
//     const data = await response.json();
//     setResult(data.result);
//     console.log(data.result);
//     // setPromptInput("");
//   }

//   return (
//     <section className="main">
//       <div className="container">
//         <title>Shopify Challenge by Francis Kodama</title>

//         <main>
//           <h1>Fun with AI</h1>

//           <form onSubmit={onSubmit}>
//             <label>Enter prompt:</label>
//             <textarea
//               type="text"
//               name="prompt"
//               placeholder="What is your demand, Master?"
//               value={promptInput}
//               onChange={(event) => {
//                 setPromptInput(event.target.value);
//               }}
//             />

//             <button
//               className="btn btn--color-third"
//               type="submit"
//               style={{
//                 backgroundColor:
//                   status === "SENT"
//                     ? "var(--color-dark)"
//                     : "var(--color-third)",
//               }}
//             >
//               {status}
//             </button>
//           </form>
//           <div className="main__result">{result}</div>
//         </main>
//       </div>
//     </section>
//   );
// };

// export default Main;

// ================= SECOND =================
// ================= SECOND =================
// ================= SECOND =================

// import { useState } from "react";
// import { Configuration, OpenAIApi } from "openai";

// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// const response = await openai.createCompletion("text-curie-001", {
//   prompt: "Correct this to standard English:\n\nShe no went to the market.\n\nShe didn't go to the market.",
//   temperature: 0.5,
//   max_tokens: 60,
//   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0,
// });

// export default async function (req, res) {
//   const completion = await openai.createCompletion("text-curie-001", {
//     prompt: generatePrompt(req.body.animal),
//     temperature: 0.6,
//   });
//   res.status(200).json({ result: completion.data.choices[0].text });
// }

// function generatePrompt(animal) {
//   const capitalizedAnimal =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Suggest three names for an animal that is a superhero.

// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;
// }

// export default function Main() {
//   const [animalInput, setAnimalInput] = useState("");
//   const [result, setResult] = useState();

//   async function onSubmit(event) {
//     event.preventDefault();
//     const response = await fetch("/api/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ animal: animalInput }),
//     });
//     const data = await response.json();
//     setResult(data.result);
//     setAnimalInput("");
//   }

//   return (
//     <div>
//       <title>OpenAI Quickstart</title>

//       <main>
//         <h3>Name my pet</h3>

//         <form onSubmit={onSubmit}>
//           <input
//             type="text"
//             name="animal"
//             placeholder="Enter an animal"
//             value={animalInput}
//             onChange={(e) => setAnimalInput(e.target.value)}
//           />
//           <input type="submit" value="Generate names" />
//         </form>

//         <div>{result}</div>
//       </main>
//     </div>
//   );
// }

// ================= FIRST =================
// ================= FIRST =================
// ================= FIRST =================

// import "../styles/Main.css";
// import React, { useState } from "react";

// const Main = () => {
//   const [status, setStatus] = useState("SUBMIT");

//   // ===================================================
//   const [promptInput, setPromptInput] = useState("");
//   const [result, setResult] = useState();

//   async function onSubmit(event) {
//     event.preventDefault();

//     const response = await fetch("/api/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ prompt: promptInput }),
//     });
//     const data = await response.json();
//     setResult(data.result);
//     console.log(data.result);
//     // setPromptInput("");
//   }

//   return (
//     <section className="main">
//       <div className="container">
//         <title>Shopify Challenge by Francis Kodama</title>

//         <main>
//           <h1>Fun with AI</h1>

//           <form onSubmit={onSubmit}>
//             <label>Enter prompt:</label>
//             <textarea
//               type="text"
//               name="prompt"
//               placeholder="What is your demand, Master?"
//               value={promptInput}
//               onChange={(event) => {
//                 setPromptInput(event.target.value);
//               }}
//             />

//             <button
//               className="btn btn--color-third"
//               type="submit"
//               style={{
//                 backgroundColor:
//                   status === "SENT"
//                     ? "var(--color-dark)"
//                     : "var(--color-third)",
//               }}
//             >
//               {status}
//             </button>
//           </form>
//           <div className="main__result">{result}</div>
//         </main>
//       </div>
//     </section>
//   );
// };

// export default Main;

// ================= THIRD =================

// import React, { useState } from "react";

// const { Configuration, OpenAIApi } = require("openai");

// const Main = () => {
//   const [result, setResult] = useState;
//   const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
//   const openai = new OpenAIApi(configuration);

//   async function generateCommand(req, res) {
//     const completion = await openai.createCompletion("text-curie-001", {
//       prompt: "Say this is a test",
//       temperature: 0.6,
//     });
//     res.status(200).json({ result: completion.data.choices[0].text });
//   }

//   console.log(result);

//   return (
//     <div>
//       <h1>TEST</h1>
//     </div>
//   );
// };

// export default Main;

// import React from "react";
// import { useState } from "react";

// export default function Main() {
//   const [animalInput, setAnimalInput] = useState("");
//   const [result, setResult] = useState();

//   async function onSubmit(event) {
//     event.preventDefault();
//     const response = await fetch("/src/pages/api/generate.js", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ animal: animalInput }),
//     });
//     const data = await response.json();
//     setResult(data.result);
//     setAnimalInput("");
//   }

//   return (
//     <div>
//       <title>OpenAI Quickstart</title>
//       <link rel="icon" href="/dog.png" />

//       <main>
//         <img src="/dog.png" />
//         <h3>Name my pet</h3>

//         <form onSubmit={onSubmit}>
//           <input
//             type="text"
//             name="animal"
//             placeholder="Enter an animal"
//             value={animalInput}
//             onChange={(e) => setAnimalInput(e.target.value)}
//           />
//           <input type="submit" value="Generate names" />
//         </form>

//         <div>{result}</div>
//       </main>
//     </div>
//   );
// }
