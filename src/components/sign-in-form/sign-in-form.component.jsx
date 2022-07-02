import { useState } from "react";
import "./sign-in.styles.scss";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(res);

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("This email is not registered yet.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password! Please try again...");
      }
      console.log("ERROR NAME: ", error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>I already have an account.</h2>
      <p>Sign In With email and password</p>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Email"}
          type={"email"}
          name="email"
          value={email}
          required
          onChange={handleChange}
        />
        <FormInput
          label={"Password"}
          type={"password"}
          name="password"
          required
          value={password}
          onChange={handleChange}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button type={"submit"} children={"Sign In"} />
          <Button
            type={"button"}
            buttonType={"google"}
            children={"Sign in with google"}
            onClick={signInWithGoogle}
          />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;