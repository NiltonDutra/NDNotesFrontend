import { api } from "../../services/api";

import { useState } from "react";

import { Container, Form, Background } from "./styles";

import { Link, useNavigate } from "react-router-dom";

import {FiUser, FiMail, FiLock} from 'react-icons/fi'

import {Button} from '../../components/button'

import {Input} from '../../components/input'

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()


  function handleSignUp() {

    if(!name || !email || !password) {
       return alert("Fill in all the fields!");
      }

api.post("/users", {name, email, password})
    .then(() => {
      alert("User successfully registered");
      navigate("/");
    })
    .catch(error => {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert("Unable to register");
      }
    });

  }

  return(
    <Container>
      <Background/>
      <Form>
        <h1>NDNotes</h1>
        <p>Application to save and manage your useful links</p>

        <h2>Create your account</h2>

        <Input
          placeholder="Name"
          type="text"
          icon={FiUser}
          onChange={event => setName(event.target.value)}
          />

          <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={event => setEmail(event.target.value)}
          />

          <Input
          placeholder="Password"
          type="password"
          icon={FiLock}
          onChange={event => setPassword(event.target.value)}
          />

          <Button title="Register" onClick={handleSignUp}/>

      <Link to="/">Back to Login</Link>

      </Form>

    </Container>
  );

}