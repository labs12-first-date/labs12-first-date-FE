import React, { useState } from 'react';
import styled from 'styled-components';

const ComponentStyles = styled.div`
  margin-top: 10px;
  form {
    display: flex;
    width: 100%;
  }
  .input-box {
    flex: 1;
    margin-right: 1rem;
    input {
      width: 100%;
      border: none;
      background: #273342;
      padding: 0.8rem 1rem;
      color: #eee;
      border-radius: 1em;
      &:focus {
        outline: none;
      }
    }
  }
  .control {
    button {
      height: 100%;
      display: block;
      padding: 0 1rem;
      border-radius: 1em;
      background: #25d482;
      border: none;
      font-weight: bold;
      color: white;
      &:focus {
        outline: none;
      }
    }
  }
`;

const MessageInput = ({ send }) => {
  const [inputVal, setInputVal] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setInputVal(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    send(inputVal);
    setInputVal('');
  };

  return (
    <ComponentStyles>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            placeholder="Type your message here..."
            value={inputVal}
            onChange={handleChange}
            name="message"
          />
        </div>
        <div className="control">
          <button type="submit">Send</button>
        </div>
      </form>
    </ComponentStyles>
  );
};

export default MessageInput;
