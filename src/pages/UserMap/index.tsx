import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import 'leaflet/dist/leaflet.css'

import { Map, TileLayer, Marker, Popup} from 'react-leaflet';

import { FiArrowLeft, FiStar, FiLink } from 'react-icons/fi';
import { BounceLoader } from 'react-spinners';
import mapIcon from '../../utils/mapIcon';

interface User{
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    name: string;
    location: string;
    bio:string;
    repos: Array<{
        id: number;
        name: string;
        description: string;
        url: string;
        stargazers_count: number;
    }>
}

interface RepositoriesStar {
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
interface Repositories{
    id: number;
    name: string;
    favorite: boolean;

}

function UserMap(){

    const { goBack } = useHistory();

    const params = useParams<UserParams>();

    const [user, setUser] = useState<User>();
    const [listStars, setListStars] = useState<RepositoriesStar[]>([]);
    const [repositories, setRepositories] = useState<Repositories[]>([]);

    useEffect(() => {
         api.get(`users/${params.name}`).then(response => {
            setUser(response.data)
        })

        api.get(`users/${params.name}/starred`).then(stars => {
            setListStars(stars.data)
        })

        api.get(`users/${params.name}/repos`).then(repositorios => {
            setRepositories(repositorios.data)
        })
    }, [params.name])
   

    function handleDislike(id: any) {

        const newRepositories = repositories.map( repo => {
            return repo.id === id ? { ...repo, favorite: !repo.favorite} : repo
            
        })

        setRepositories(newRepositories);
    }

    if(!user) {
        
        return (
            <>

            <div className="config-dont-search">
                <button className="dont-search-button" onClick={goBack}>
                        <FiArrowLeft size={32} color="#fff"/>
                </button>
            

                <div className="spinner">
                    <BounceLoader size={120} color="#79d96a"/>
                </div>
            </div>

            </>
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
                
                <button onClick={goBack}>
                    <FiArrowLeft size={32} color="#fff"/>
                </button>
            </header>


            <main>

                <div className="unfavorite">

                <h2>Repositórios (Stars)</h2>

                {listStars.map(rep => {
                    return (
                        <div key={rep.id}>
                            <span>
                                <p>{rep.name} </p>
                                
                            </span>
                            
                        </div>
                    );
                })}
                </div>

                <div className="repos-desktop">
                
                    <h2>Repositórios</h2>
                    {repositories.map(repo => {
                            return (
                                <div key={repo.id}>
                                    <span>
                                        <p>{repo.name} {repo.favorite && <strong>(Favorito)</strong>} </p>
                                        <button onClick={() => handleDislike(repo.id)} > <FiStar  /> Favoritar</button>
                                    </span>
                                    
                                </div>
                            );
                        })}
                </div>

                <div className="map-mobile">
                    
                    <h2>Localização</h2>

                    <Map 
                        center={[-4.8415535,-37.7896551]}
                        zoom={14}
                    >
                    
                    <TileLayer 
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                    />

                    <Marker 
                            icon={mapIcon}
                            position={[-4.8415535,-37.7896551]}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup"
                            >   
                                {user.name} - {user.location}
                        
                            </Popup>

                        </Marker> 
                    </Map>
                </div>
                
            </main>


            <div className="repos-mobile">
                
                <h2>Repositórios</h2>
                {repositories.map(repo => {
                        return (
                            <div key={repo.id}>
                                <span>
                                    <p>{repo.name} {repo.favorite && <strong>(Favorito)</strong>} </p>
                                    <button onClick={() => handleDislike(repo.id)} > <FiStar  /> Favoritar</button>
                                </span>
                                
                            </div>
                        );
                    })}
            </div>

            <div className="map-desktop">
                    
                    <h2>Localização</h2>

                    <Map 
                        center={[-4.8415535,-37.7896551]}
                        zoom={14}
                    >
                    
                    <TileLayer 
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                    />

                    <Marker 
                            icon={mapIcon}
                            position={[-4.8415535,-37.7896551]}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup"
                            >   
                                {user.name} - {user.location}
                        
                            </Popup>

                        </Marker> 
                    </Map>
                </div>
            
        </div>
    );
}

export default UserMap;