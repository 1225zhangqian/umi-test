import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { mongodb } from './mongodb';

function App() {
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);
  return (
    <>
      <CodeMirror
        value={value}
        height="200px"
        extensions={[mongodb()]}
        onChange={onChange}
      />
    </>
  );
}
export default App;
