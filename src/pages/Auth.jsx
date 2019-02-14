import React, { useEffect, useState, useRef } from 'react';

import { post }  from '../lib/http';

import './Auth.css';

const AuthPage = props => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    console.log(props);
    console.log(email);
    console.log(password);
    }, [emailRef, passwordRef, email, password]
  );

  const register = async (e) => {
    try {
      e.preventDefault();

      const query = {
        query: `
          mutation {
            createUser(input: { email: "${emailRef.current.value.trim()}", password: "${passwordRef.current.value.trim()}" }) {
              _id,
              email,
              password,
              createdEvents {
                _id
              },
              bookedEvents {
                _id
              }
            }
          }
        `
      };

      const response = await post('http://localhost:3001/graphql', {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
      });

      const responseBody = await response.json();

      if (responseBody.errors) {
        console.log(responseBody.errors)
      }

      setEmail('');
      setPassword('');

      return responseBody;
    } catch (err) {
      console.log(err);
      return
    }
  };

  const login = async (e) => {
    try {
      e.preventDefault();

      const query = {
        query: `
          query {
            login(email: "${emailRef.current.value.trim()}", password: "${passwordRef.current.value.trim()}") {
              userId,
              token,
              tokenExpiration
            }
          }
        `
      };

      const response = await post('http://localhost:3001/graphql', {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
      });

      const responseBody = await response.json();

      console.log(responseBody);


      setEmail('');
      setPassword('');

      return responseBody;
    } catch (err) {
      console.log(err);
      return
    }
  };

  return (
    <form className="auth-form" onSubmit={login}>
      <div className="form-control">
        <label htmlFor="email">email</label>
        <input ref={emailRef} value={email} onChange={e => setEmail(e.target.value)} type="email" id="email"/>
      </div>
      <div className="form-control">
        <label htmlFor="password">password</label>
        <input ref={passwordRef} value={password} onChange={e => setPassword(e.target.value)} type="password" id="password"/>
      </div>
      <div className="form-actions">
        <button type="submit">Login</button>
        <button type="button" onClick={register}>Register</button>
      </div>
    </form>
  );
}

export default AuthPage;