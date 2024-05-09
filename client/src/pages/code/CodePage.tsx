import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Editor, { useMonaco } from '@monaco-editor/react';
import Header from '../../components/Header/Header';
import getDefaultLanguageCode from './getDefaultLanguageCode';
import { useDebounce } from '../../hooks/useDebounce';
import { sendExecuteRequest, fetchExecutionStatus } from '../../services/api';
import './CodePage.css';

const CodePage = () => {
  const monaco = useMonaco();
  const interval = useRef<number | null>(null);
  const [autoRun, setAutoRun] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [time, setTime] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const language = searchParams.get('language') || 'javascript';

  const onCodeChange = useDebounce<string, (value: string | undefined) => void>(
    () => (autoRun ? onExecute() : null),
    1000
  );

  const onExecute = useCallback(() => {
    if (monaco) {
      const code = monaco.editor.getEditors()[0].getValue();

      (async () => {
        try {
          setOutput('Loading...');
          const response = await sendExecuteRequest({ code, language, input });
          const id = response.id;

          interval.current = setInterval(() => {
            (async () => {
              const data = await fetchExecutionStatus(id);

              if (data.isDone) {
                setTime(`${data.time?.toFixed(2)} ms` || time);
                setOutput(data.output || output);
                if (interval.current !== null) clearInterval(interval.current);
              }
            })();
          }, 1000);
        } catch (error) {
          setOutput('Something went wrong...');
        }
      })();
    }
  }, [input, language, monaco, output, time]);

  useEffect(() => {
    if (localStorage.getItem('autoRun') !== null) setAutoRun(true);

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'Enter') onExecute();
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      if (interval.current !== null) clearInterval(interval.current);
    };
  }, [onExecute]);

  return (
    <section className="code-page">
      <Header />

      <div className="code-page__editor">
        <Editor
          height="90vh"
          width="75%"
          theme="vs-dark"
          onChange={onCodeChange}
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
            <div className="code-page__editor__sidebar__output_title">
              <h4>Output {time || ''}</h4>

              <div className="code-page__editor__sidebar__output_title__control">
                <label>Auto Run:</label>
                <input
                  type="checkbox"
                  checked={autoRun}
                  onChange={e => {
                    setAutoRun(e.target.checked);
                    if (e.target.checked) localStorage.setItem('autoRun', '1');
                    else localStorage.removeItem('autoRun');
                  }}
                />
              </div>
            </div>
            <textarea
              readOnly
              value={output}
              className="code-page__editor__sidebar__output__textarea"
            ></textarea>
          </div>

          <div className="code-page__editor__sidebar__button">
            <button onClick={onExecute} title="CTRL + Enter">
              Execute &gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodePage;
