import React from 'react';
import { Link } from 'react-router-dom'
import './styles.css';

import { FiStar } from 'react-icons/fi'
import { FiSearch } from 'react-icons/fi'


function Main(){
    return (
        <div className="content">
            <header> 
                <h1>
                    GreenSearch
                </h1>
                <FiStar size="50" color="#79d96a"/>
            </header>

            <main>
                <form>
                    <input type="text" placeholder="Nome ou Apelido"/>
                    <Link to="/users">
                        <FiSearch />
                        <span>Pesquisar Usuário</span> 
                    </Link>
                </form>
            </main>
        </div>
    );
}

export default Main