import React from "react";
import {Auth} from "aws-amplify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

import LoaderButton from "../LoaderButton/LoaderButton";
import {onError} from "../../libs/errorLib";
import {useAuthContext} from "../../context/AuthContext";

const ResetPassword = () => {
  const {
    authPhaseTransition,
    isLoading, setIsLoading,
    fields, handleFieldChange,
  } = useAuthContext();

  function validateForm() {
    return fields.email.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.forgotPassword(fields.email);
      authPhaseTransition('resetPasswordConfirmation');
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="ResetPassword">
      <Form onSubmit={handleSubmit}>
        <header>Reset password</header>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <div className="options">
          <div/>
          <Button className="option" variant="link" onClick={
            () => authPhaseTransition('login')
          }>
            Return to login
          </Button>
        </div>
        <LoaderButton
          block
          type="submit"
          size="lg"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Send Confirmation
        </LoaderButton>
      </Form>
    </div>
  );
}

export default ResetPassword;
