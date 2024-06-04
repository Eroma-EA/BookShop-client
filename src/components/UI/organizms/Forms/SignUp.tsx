import React, { useState } from "react";
import { InputField } from "../../atoms/Inputs";
import { Button } from "../../atoms/Buttons";
import "./sign-up.scss";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { registration } from "../../../../store/slices/userSlice";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }
    setIsSubmitting(true);
    dispatch(registration({ email, password }));
    window.location.href = "http://localhost:5173/sign-in";
  };

  return (
    <form className="sign-up" onSubmit={handleSubmit}>
      <h1 className="sign-up__title">Sign Up</h1>
      <label className="sign-up__label" htmlFor="email">
        Email
        <InputField
          className="sign-up__input"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
          required
        />
      </label>
      <label className="sign-up__label" htmlFor="password">
        Password
        <InputField
          className="sign-up__input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          required
        />
      </label>
      <label className="sign-up__label" htmlFor="confirmPassword">
        Confirm Password
        <InputField
          className="sign-up__input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="********"
          required
        />
      </label>
      <Button type="submit" disabled={isSubmitting} value={"Sign Up"} />

      <p>
        Already have an account?{" "}
        <Link to="/sign-in" className="sign-up__link">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
