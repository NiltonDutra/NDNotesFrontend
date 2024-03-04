import { useState } from 'react';

import {FiMail, FiLock} from 'react-icons/fi';
import { Link } from "react-router-dom";

import { useAuth } from '../../hooks/auth';

import {Input} from '../../components/input';
import {Button} from '../../components/button';

import { Container, Form, Background } from "./styles";

export function SignIn() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  
  function handleSignIn() {
    signIn({email, password});
  }

  return(
    <Container>
      <Form>
        <h1>NDNotes</h1>
        <p>Application to save and manage your useful links</p>

        <h2>Login here</h2>

          <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange= {e => setEmail(e.target.value)}
          />

          <Input
          placeholder="Password"
          type="password"
          icon={FiLock}
          onChange= {e => setPassword(e.target.value)}
          />

          <Button title="Enter" onClick={handleSignIn}/>

      <Link to="/register">Create an account</Link>

      </Form>

      <Background/>

    </Container>
  );
}