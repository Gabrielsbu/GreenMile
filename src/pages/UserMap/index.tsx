import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiDelete } from 'react-icons/fi';

import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

import './styles.css';
import api from '../../services/api';

interface User{
    id: number;
    login: string;
    avatar_url: string;
    url: string;
    name: string;
    bio:string;
    repos: Array<{
        id: number;
        name: string;
        description: string;
        url: string;
        stargazers_count: number;
    }>
}

interface Repos {
    id: number;
    name: string;
    stargazers_count: number;
    owner: Array<{
        login: string;
    }>
}

interface UserParams{
    name: string;
}

function UserMap(){
    const params = useParams<UserParams>();
    const [user, setUser] = useState<User>();
    const [list, setList] = useState<Repos[]>([]);

    useEffect(() => {
         api.get(`users/${params.name}`).then(response => {
            setUser(response.data)
        })
    }, [params.name])

    useEffect(() => {
        api.get(`users/${params.name}/starred`).then(repositorios => {
            setList(repositorios.data)
        })
    }, [params.name])

    function handleDislike(id: any) {

        console.log(id)
        const newRepositories = list.map( repo => {
            return repo.id === id ? { ...repo} : repo
        })
        console.log(newRepositories)
    }

    if(!user) {
        return <p>Spinner</p>
    }

    if(!list) {
        return <p>Carregando ...</p>
    }
    return (
        <div id="page-map">
            <aside>
                <header>
                    <div className="config-header">
                        <img src={user.avatar_url} alt={user.name}/>
                        <span>@{user.login}</span>
                    </div>

                    <div className="config-header-infos">
                        <span>{user.bio}</span>
                        <span>{user.url}</span>
                    </div>
                </header>


                <main>
                    <h4>Stars</h4>
                    {list.map(rep => {
                        return (
                            <div key={rep.id} className="config-dislike">
                                <p>{rep.name} </p>
                                <button onClick={() => handleDislike(rep.id)}><FiDelete /><span>Remove</span></button>
                            </div>
                        );
                    })}
                    
                </main>
            </aside>

            <Map 
                center={[-4.8415535,-37.7896551]}
                zoom={14}
                style={{ width: '100%', height: '100%'}}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
            </Map>
            
            <Link to="" className="create-orphanage">
                <FiArrowLeft size={32} color="#fff"/>
            </Link>
           
        </div>
    );
}

export default UserMap;