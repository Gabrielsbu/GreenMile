import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import 'leaflet/dist/leaflet.css'

import { Map, TileLayer } from 'react-leaflet';

import { FiArrowLeft, FiDelete, FiLink } from 'react-icons/fi';
import { BounceLoader } from 'react-spinners';

interface User{
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
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

    const { goBack } = useHistory();

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

        const newRepositories = list.map( repo => {
            return repo.id === id ? { ...repo} : repo
        })
        
    }

    if(!user) {
        
        return (
            <div className="spinner">
                <BounceLoader size={120} color="#79d96a"/>
            </div>
        )
    }

    return (
       
        <div className="page-map">
            <header>
                <div className="profile-desktop">
                    
                    <img src={user.avatar_url} alt={user.name}/>

                    <div>
                        <h3>{user.name}</h3>
                        <p>@{user.login}</p>
                        <h4>{user.bio}</h4>
                        <span> <a target="_blank" rel="noopener noreferrer" href={user.html_url}> <FiLink />{user.html_url}</a></span>
                    </div>
                </div>

                <div className="profile-mobile">
                    <button className="config-button" onClick={goBack}>
                        <FiArrowLeft size={32} color="#fff"/>
                    </button>
                    
                    <img src={user.avatar_url} alt={user.name}/>
                    <h3>{user.name}</h3>
                    <p>@{user.login}</p>
                    <h4>{user.bio}</h4>
                    <span> <a target="_blank" rel="noopener noreferrer" href={user.html_url}> <FiLink />{user.html_url}</a></span>
                    
                </div>
                
                <button className="config-button" onClick={goBack}>
                    <FiArrowLeft size={32} color="#fff"/>
                </button>
            </header>


            <main>

            <div className="unfavorite">

                <h2>Stars</h2>

                {list.map(rep => {
                    return (
                        <div key={rep.id} className="config-unfavorite">
                            <span>
                                <p>{rep.name} </p>
                                <FiDelete onClick={() => handleDislike(rep.id)} /> 
                            </span>
                            
                        </div>
                    );
                })}
                </div>

                <div className="map">
                    
                    <h2>Localização</h2>

                    <Map 
                        center={[-4.8415535,-37.7896551]}
                        zoom={14}
                    >
                    
                    <TileLayer 
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                    />
                    </Map>
                </div>
                
            </main>
            
        </div>
    );
}

export default UserMap;