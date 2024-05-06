import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Editor, { useMonaco } from '@monaco-editor/react';
import Header from '../../components/Header/Header';
import sendExecuteRequest from './sendExecuteRequest';
import getDefaultLanguageCode from './getDefaultLanguageCode';
import './CodePage.css';

const CodePage = () => {
  const monaco = useMonaco();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [time, setTime] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const language = searchParams.get('language') || 'javascript';

  const onExecute = () => {
    if (monaco) {
      const code = monaco.editor.getEditors()[0].getValue();

      (async () => {
        try {
          setOutput('Loading...');
          const response = await sendExecuteRequest({ code, language, input });
          setOutput(response.output);
          setTime(`(${response.time.toFixed(2)}) ms`);
        } catch (error) {
          setOutput('Something went wrong...');
        }
      })();
    }
  };

  return (
    <section className="code-page">
      <Header />

      <div className="code-page__editor">
        <Editor
          height="90vh"
          width="75%"
          theme="vs-dark"
          defaultLanguage={language}
          defaultValue={getDefaultLanguageCode(language)}
          options={{ fontSize: 16 }}
        />

        <div className="code-page__editor__sidebar">
          <div className="code-page__editor__sidebar__input">
            <h4>Input</h4>
            <textarea
              className="code-page__editor__sidebar__input__textarea"
              placeholder="Enter Your Input Here..."
              value={input}
              onChange={e => setInput(e.target.value)}
            ></textarea>
          </div>

          <div className="code-page__editor__sidebar__output">
            <h4>Output {time || ''}</h4>
            <textarea
              readOnly
              value={output}
              className="code-page__editor__sidebar__output__textarea"
            ></textarea>
          </div>

          <div className="code-page__editor__sidebar__button">
            <button onClick={onExecute}>Execute &gt;</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodePage;
