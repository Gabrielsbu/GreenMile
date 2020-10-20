import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './styles.css';

import { FiStar } from 'react-icons/fi'
import { FiSearch } from 'react-icons/fi'

import ImgMain from '../../assets/images/gab.png';


function Main(){
    
    const [name, setName] = useState('');

    return (
        <div className="container">
            <header>
                <h1>
                    <FiStar size="50" color="#79d96a"/>
                    <span>GreenSearch</span> 
                </h1>
            </header>

            <main className="content">

                <div className="config-description">
                    <h2>
                        Bem vindo ao GreenSearh
                    </h2>
                    <p>
                        Aqui você encontra a ferramenta de pesquisa de Usuários do Github, simples e eficáz, basta apenas um click, vem conferir!!
                    </p>

                    <div>
                        <input type="text" placeholder="Insert the username" value={name} onChange={ e => {setName(e.target.value)}}/>
                        <Link to={`/users/${name}`}>
                            <FiSearch />
                            <span>Search user</span> 
                        </Link>
                    </div>

                </div>

                <div className="config-img">
                    <img src={ImgMain} alt="ImgIndex"/>
                </div>
            </main>
        </div>
    );
}

export default Main