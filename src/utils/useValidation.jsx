import { useEffect, useState } from 'react';

export const useValidation = (value, validations) => {
  const [inputValid, setInputValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [minLengthError, setMinLengthError] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          if (value) {
            setIsEmpty(false);
          } else {
            setIsEmpty(true);
            setErrorMessage('поле не может быть пустым');
          }
          break;

        case 'minLength':
          if (value.length < validations[validation]) {
            setMinLengthError(true);
            setErrorMessage(`минимальное количество символов: ${validations[validation]}`);
          } else {
            setMinLengthError(false);
          }
          break;

        case 'maxLength':
          if (value.length > validations[validation]) {
            setMaxLengthError(true);
            setErrorMessage(`максимальное количество символов: ${validations[validation]}`);
          } else {
            setMaxLengthError(false);
          }
          break;

        case 'isEmail':
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (re.test(String(value).toLowerCase())) {
            setIsEmailInvalid(false);
          } else {
            setIsEmailInvalid(true);
            setErrorMessage(`email не валиден`);
          }
          break;

        default:
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || isEmailInvalid || maxLengthError || minLengthError || isEmailInvalid) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, isEmailInvalid, maxLengthError, minLengthError]);

  return { inputValid, errorMessage, isEmpty, minLengthError, maxLengthError, isEmailInvalid };
};
