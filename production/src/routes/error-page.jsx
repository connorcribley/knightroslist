import React from 'react';
import { useRouteError } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Alert show={false} variant="danger">Hello</Alert>
    </div>
  );
}