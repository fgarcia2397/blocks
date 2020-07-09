import React, { useState } from 'react';
import { Input } from 'antd';
import { InputProps } from './input-auto-label.interface';

import styles from './index.less';

const InputPassword = Input.Password;
/*
 * Functional Component Block Input Auto Label
 *
 */
const InputAuto: React.FC<InputProps> = (props) => {
  const { inputPassword, onCopyDisabled, onPasteDisabled, error, ...restProps } = props;
  const [LabelState, setLabelState] = useState(false);

  /*
   * Function that set the state of label
   */
  const labelPlaceHolder = (e: any) => {
    const value = e.target.value;
    if (value === '') {
      setLabelState(false);
    } else if (value.length > 0) {
      setLabelState(true);
    }
  };

  /*
   * Function that disabled paste on input
   */
  const disableCopyPaste = (e: any) => {
    if (props.onCopyDisabled || props.onPasteDisabled) {
      e.preventDefault();
    }
  };

  return (
    <div className={`${styles.main} ${LabelState ? styles.activeLabel : ''}`}>
      <p className={styles.floating}>
        {LabelState && (
          <label htmlFor="labelInput" className={`${error ? styles.floating : ''}`}>
            {props.placeholder}
            {error && '*'}
          </label>
        )}
      </p>

      {inputPassword ? (
        <InputPassword
          onPaste={disableCopyPaste}
          onCopy={disableCopyPaste}
          onChangeCapture={labelPlaceHolder}
          {...restProps}
        />
      ) : (
        <Input
          onPaste={disableCopyPaste}
          onCopy={disableCopyPaste}
          onChangeCapture={labelPlaceHolder}
          {...restProps}
        />
      )}
    </div>
  );
};

export default InputAuto;
