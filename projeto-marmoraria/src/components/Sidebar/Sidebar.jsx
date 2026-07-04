import "./Sidebar.css";

import {
    FaHome,
    FaClipboardList,
    FaUsers,
    FaBoxes,
    FaWarehouse,
    FaTools,
    FaDollarSign,
    FaCog
} from "react-icons/fa";

function Sidebar(){

    return(

        <aside className="sidebar">

            <h2>Marmoraria</h2>

            <nav>

                <a href="#"><FaHome /> Dashboard</a>

                <a href="#"><FaClipboardList /> Pedidos</a>

                <a href="#"><FaUsers /> Clientes</a>

                <a href="#"><FaBoxes /> Materiais</a>

                <a href="#"><FaWarehouse /> Estoque</a>

                <a href="#"><FaTools /> Produção</a>

                <a href="#"><FaDollarSign /> Financeiro</a>

                <a href="#"><FaCog /> Configurações</a>

            </nav>

        </aside>

    )

}

export default Sidebar;