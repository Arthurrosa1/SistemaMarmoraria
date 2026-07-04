import "./loginForm.css";

import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

function LoginForm() {

    return (

        <div className="login-form">

            <div className="box">


                <h1>Bem-vindo!</h1>

                <p>Faça login para acessar sua conta.</p>

                <h2>Email</h2>
                <div className="input-group">

                    <FaEnvelope />

                    <input
                        type="email"
                        placeholder="meuemail@exemplo.com"
                    />

                </div>

                <h2>Senha</h2>

                <div className="input-group">

                    <FaLock />

                    <input
                        type="password"
                        placeholder="Minhasenha123"
                    />

                </div>


                <button>

                    Entrar

                </button>

                <div className="forgot-password">
                    <a href="#">Esqueceu a senha?</a>
                </div>

                <div className="linha-horizontal">
                    <span></span>
                    ou
                    <span></span>
                </div>

                <div className="google-login">
                    <button>
                        <img src="https://logopng.com.br/logos/google-37.png" alt="Logo do Google" />
                        Entrar com Google
                    </button>
                </div>

                <div className="register">

                    <p>Não tem uma conta? <a href="#">Cadastre-se</a></p>
                </div>

            </div>

        </div>

    )

}

export default LoginForm;