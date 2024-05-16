import styles from './index.less';
import { WdTable, WdButton, RichText } from '@cloudbase/weda-ui';
import { WdCodeEditor } from './codeEditor';
import App from './react-codemirror';
export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <WdCodeEditor />
      <App />

      {/* <WdButton />
      <WdTable />
      <RichText /> */}
    </div>
  );
}
