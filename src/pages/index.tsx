import styles from './index.less';
import { WdTable, WdButton, RichText } from '@cloudbase/weda-ui';
import { WdCodeEditor } from './codeEditor';
import { useState } from 'react';
export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <WdCodeEditor />
      <WdButton />
      <WdTable />
      <RichText />
    </div>
  );
}
