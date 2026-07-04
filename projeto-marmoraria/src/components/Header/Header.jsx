import "./Header.css";

import { FaBell } from "react-icons/fa";

function Header(){

    return(

        <header className="header">

            <div>

                <h1>Dashboard</h1>

                <p>Bem-vindo ao sistema da Marmoraria.</p>

            </div>

            <div className="user">

                <FaBell />

                <img
                    src="https://i.pravatar.cc/45"
                    alt=""
                />

            </div>

        </header>

    )

}

export default Header;