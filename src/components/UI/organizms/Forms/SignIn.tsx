import React, { useState } from "react";
import "./sign-in.scss";
import { Link } from "react-router-dom";
import { InputField } from "../../atoms/Inputs";
import { Button } from "../../atoms/Buttons";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { login } from "../../../../store/slices/userSlice";

interface IAuthorization {
  email: string;
  password: string;
}
function SignIn() {
  const sign = useAppSelector((state) => state.user.user);
  const [user, setUser] = useState<IAuthorization>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(user));
  };

  return (
    <div className="sign-in">
      <div className="sign-in__form">
        {!sign?.email ? (
          <>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <InputField
                  type="text"
                  id="username"
                  placeholder="example@gmail.com"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <InputField
                  type="password"
                  id="password"
                  placeholder="********"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" value={"Sign in"} />
            </form>
            <p>
              Don't have an account? <Link to="/sign-up">Sign up</Link>
            </p>
          </>
        ) : (
          <>
            <h2>Sign in</h2>
            <p>Authorization was successfully</p>
            <Link to={"/"}>
              <Button value={"Home"} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default SignIn;
