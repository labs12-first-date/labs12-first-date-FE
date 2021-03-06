import { useState, useEffect } from 'react';

const useForm = (onSubmit, initialValues) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    if (initialValues) setValues({ ...initialValues });
  }, [initialValues]);

  const handleChange = e => {
    // console.log('useform e', e);
    const { name, value } = e.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await onSubmit(values);
    setValues({});
  };

  const handleClear = () => {
    setValues({});
  };

  return { values, handleChange, handleSubmit, handleClear };
};

export default useForm;
