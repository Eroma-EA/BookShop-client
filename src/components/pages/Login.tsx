import React from "react";

const Login = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className="login">
      <div className="container">
        <div className="login__inner">{children}</div>
      </div>
    </div>
  );
};

export default Login;
