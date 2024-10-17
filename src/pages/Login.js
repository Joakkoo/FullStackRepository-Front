import LoginButton from "../components/LoginButton";
import { Card } from "antd";
import "./login.css";

const Login = () => {
    return(
        <div className="App-Card-No-Auth">
        <Card className="Card-no-auth">
          <h1>¡Por favor, inicie sesión!</h1>
          <LoginButton />
        </Card>
      </div>
    )
}

export default Login;