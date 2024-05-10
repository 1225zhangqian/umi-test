import React, { useImperativeHandle, useMemo, useRef, useState } from 'react';
import { processHtml, htmlEncode } from './utils';
import './index.scss';
export const WdCodeEditor = React.forwardRef<any, WdCodeEditorProps>(
  function WdCodeEditor(props, ref) {
    const {
      name = 'code',
      placeholder = 'enter',
      maxLength = 500,
      classRoot = 'code-editor',
      language = 'sql',
      theme = 'dark',
    } = props;
    const [value, setValue] = useState(`CREATE TABLE dbo.EmployeePhoto
    (
        EmployeeId INT NOT NULL PRIMARY KEY,
        Photo VARBINARY(MAX) FILESTREAM NULL,
        MyRowGuidColumn UNIQUEIDENT NOT NULL ROWGUIDCOL
                        UNIQUE DEFAULT NEWID()
    );

    GO`);
    /** 兼容从 Form 获取属性，必须引入，自动挂载组件方法 */
    const [innerHandle, setInnerHandle] = useState({});

    const classPrefix = 'wd';
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle<HTMLTextAreaElement, HTMLTextAreaElement>(
      ref,
      () => textareaRef.current!,
      [textareaRef],
    );
    const wrapRef = useRef(null);

    const root = `${classPrefix}-${classRoot}`;
    const inputWrap = `${classPrefix}-form-input-wrap`;
    const textareaWrap = `${classPrefix}-form-code-editor-wrap`;
    const displayValue = value ?? '';

    const htmlStr = useMemo(
      () =>
        processHtml(
          `<pre aria-hidden=true><code ${
            language && value ? `class="language-${language}"` : ''
          } >${htmlEncode(String(value || ''))}</code><br /></pre>`,
        ),
      [value, language],
    );
    const preView = useMemo(
      () => (
        <div
          className={`${root}__content-preview ${
            language ? `language-${language}` : ''
          }`}
          dangerouslySetInnerHTML={{
            __html: htmlStr,
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [classPrefix, language, htmlStr],
    );

    /** 内部事件 */
    const onChange = function (e: {
      target: { value: React.SetStateAction<string> };
    }) {
      setValue(e.target.value);
    };

    const onFocus = function () {};

    const onBlur = function () {};

    return (
      <div className={`${root} `}>
        <div
          className={`${textareaWrap} `}
          ref={wrapRef}
          data-color-mode={theme}
        >
          <div className={`${root}__content`}>
            {preView}
            <textarea
              ref={textareaRef}
              placeholder={placeholder}
              name={name}
              value={displayValue}
              maxLength={maxLength}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    );
  },
);

export interface WdCodeEditorProps {
  classRoot?: string;
  language?: string;
  theme?: string;
  name?: string;
  placeholder?: string;
  maxLength?: number;
  value?: string;
}
