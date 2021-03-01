import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../constants/apiConstants';

function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={() =>
          localStorage.getItem(ACCESS_TOKEN_NAME) ? (
            children
          ) : null
        }
      />
    );
  }
export default PrivateRoute;