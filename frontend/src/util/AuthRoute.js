import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// TEST
import { connect } from 'react-redux';
import { getJobs } from '../redux/actions/jobAction';
import PropTypes from 'prop-types';
// TEST

let authenticated;
const token = localStorage.token;

if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    authenticated = false;
    localStorage.removeItem('token');
  } else {
    authenticated = true;
  }
}

const AuthRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    // if authenticated is true and user === null run redux actions to get all user data
    // this should set state if user refreshes page
    // authenticated is not true unless a refresh happens and token is still valid
    console.log(authenticated);
    if (authenticated) {
      console.log();
    } else {
      console.log('no youre not authenticated');
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

//TEST
AuthRoute.propTypes = {
  getJobs: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user,
});
//TEST

export default connect(mapStateToProps, { getJobs })(AuthRoute);
