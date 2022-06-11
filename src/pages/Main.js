import '../styles/Main.css';
import React, { useEffect, useRef, useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { v4 as uuidv4 } from 'uuid';
import Logo from '../assets/images/logo-fkodama.svg';
// import QuestionMark from '../assets/images/ico-question.svg';

const Main = () => {
  const [status, setStatus] = useState('Get your suggestion');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [id, setId] = useState('');
  const [content, setContent] = useState([]);
  // const [engine, setEngine] = useState('text-curie-001');
  // const [isActive, setIsActive] = useState(false);
  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  useEffect(() => {
    if (result) {
      const newResult = {
        id: id,
        prompt: prompt,
        result: result,
      };

      const updatedContent = [...content, newResult];
      setContent(updatedContent);
      setPrompt('');
    }
  }, [content, id, prompt, result]);

  const onSubmit = (e) => {
    e.preventDefault();

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    setStatus('THINKING...');
    const openai = new OpenAIApi(configuration);

    openai
      .createCompletion('text-curie-001', {
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
        setStatus('Wow! I want more suggestions :)');
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <header>
        <a href='https://www.fkodama.com/' target='_blank' rel='noreferrer'>
          <img
            src={Logo}
            alt='Logo Francis Kodama Webdeveloper'
            className='logo'
          />
        </a>
      </header>
      <main>
        <section className='explain'>
          <p className='explain__question'>
            Can't you figure out what to watch on TV?
          </p>
          <h1 className='explain__title'>TV Suggestion Helper</h1>

          <div className='examples'>
            <h2 className='examples__title'>Check out some examples:</h2>
            <ul>
              <li className='examples__item'>
                Suggest a drama movie based on a true story with a good score on
                the rotten tomatoes website.
              </li>
              <li className='examples__item'>
                What Brazilian comedy shows can I watch on Netflix today?
              </li>
              <li className='examples__item'>
                What's the best thriller series available on Prime in Canada?
              </li>
              <li className='examples__item'>
                Give me 3 suggestions of animation movies.
              </li>
            </ul>
          </div>
        </section>

        <form onSubmit={onSubmit}>
          <textarea
            ref={textAreaRef}
            type='text'
            name='prompt'
            placeholder='Give me a good suggestion of...'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
          <button
            className='btn btn--color'
            type='submit'
            style={{
              backgroundColor:
                status === 'Thinking...'
                  ? 'var(--color-dark)'
                  : 'var(--color-third)',
            }}
          >
            {status}
          </button>
        </form>

        <ul className='result'>
          {content.map(({ id, prompt, result }) => (
            <li className='result__item' key={id}>
              <div className='result__wrapper'>
                <h4 className='result__title'>Your question:</h4>
                <p className='result__text'>{prompt}</p>
              </div>
              <div className='result__wrapper'>
                <h4 className='result__title'>My Suggestion:</h4>
                <p className='result__text'>{result}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Main;
