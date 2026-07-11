import "./login.css";

import LeftPanel from "../../components/leftPanel/leftPanel";
import LoginForm from "../../components/loginForm/loginForm";

function Login() {
  return (
    <div className="login-container">
      <LeftPanel />
      <LoginForm />
    </div>
  );
}

export default Login;