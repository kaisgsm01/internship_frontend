import React from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './Email.css';

const Email = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      body: {
        value: '',
        isValid: false
      },
      email: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const placeSubmitHandler = event => {
    event.preventDefault();
    window.open(`mailto:${document.getElementById('email').value}? , &bcc=lastperson@theirsite.com&subject=${document.getElementById('title').value}&body=${document.getElementById('body').value}`);
    
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
        id="email"
        element="input"
        type="email"
        label="Send to"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter a valid Email."
        onInput={inputHandler}
      />
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="body"
        element="textarea"
        label="Message"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid message (at least 5 characters)."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        SEND
      </Button>
    </form>
  );
};

export default Email;
