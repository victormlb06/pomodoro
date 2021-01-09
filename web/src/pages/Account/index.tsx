import React from "react";
import tomato from "../../assets/images/tomato.png";
import { mdiGoogle, mdiGithub } from "@mdi/js";
import { GoogleLogin } from "react-google-login";
import Icon from "@mdi/react";
import "./styles.css";
import Modal from "../../components/Modal";
// @ts-ignore
import LoginGithub from "react-login-github";
// @ts-ignore
import OAuth2Login from 'react-simple-oauth2-login';

import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/modules/user/actions";

// @ts-ignore
// import LoginGithub from "react-login-github";

interface AccountProps {
  id: string;
}

function Account(props: AccountProps) {
  const dispatch = useDispatch();

  const responseGoogle = (response: any) => {
    const {
      profileObj: { name, email, imgUrl },
    } = response;
    dispatch(loginSuccess({ name, email, imgUrl, isLogged: true }));
  };

  const responseGithub = async (response : any) => {
    fetch("https://github.com/login/oauth/access_token", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    
      //make sure to serialize your JSON body
      body: JSON.stringify({
        code: response.code,
      })
    })
    .then( (response) => { 
       console.log(response)
    });

// const githubTokenUser = require('github-token-user');
//     githubTokenUser(response.code).then((data: any) => {
//   });

  }



  return (
    <Modal target={props.id}>
      <div className="w-100 d-flex flex-column align-items-center">
        <div className="tomato-brand">
          <img src={tomato} width="48" alt="Pomodoro Tracker" />
        </div>
        <h1 className="title-account">Welcome to Pomodoro</h1>
        <p className="subtitle-account">Don't have an account?</p>
        <GoogleLogin
          render={(renderProps) => (
            <button
              className="btn btn-google"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <Icon path={mdiGoogle} size={0.7} color="#FAFAFA" />{" "}
              <span>Continue with Google</span>
            </button>
          )}
          clientId="587816230714-dfbm14btdpbfavveitvuqbt2a38q27if.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
         <OAuth2Login
          authorizationUrl="https://github.com/login/oauth/authorize"
          responseType="code"
          clientId="76d38bf3c0156731e6cf"
          redirectUri="http://localhost:3000/"
          onSuccess={responseGithub}
          onFailure={responseGithub}
          className="btn btn-github"
          buttonText="Continue with Github"
          />,
        {/* <button className="btn btn-github">
          <Icon path={mdiGithub} size={0.7} color="#1E1E1E" />{" "}
          <span>Continue with Github</span>
        </button> */}
      </div>
    </Modal>
  );
}

export default Account;
