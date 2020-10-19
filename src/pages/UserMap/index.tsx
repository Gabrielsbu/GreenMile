import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

import './styles.css';


function UserMap(){
    return (
        <div id="page-map">
            <aside>
                <header>
                    <div className="config-header">
                        <img src="https://scontent.ffor20-1.fna.fbcdn.net/v/t1.0-9/50644817_1140389362787923_1541726953835331584_n.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_eui2=AeFdKEvyK_RqH9vedOh1m3eyOBUpQkmasE84FSlCSZqwT9tJEbyvRE3TExU8bmiDBwKra31Q2zHoWZ8l5pAQhRox&_nc_ohc=96XmVeAw17gAX_3IU6t&_nc_ht=scontent.ffor20-1.fna&oh=8bf34fda9a9ad3d4db7227bf9e617197&oe=5FB1620D" alt="Teste"/>
                        <span>@gabrielsbu</span>
                    </div>

                    <div className="config-header-infos">
                        <span>Biografia do usuário</span>
                        <span>Url do usuário</span>
                    </div>
                </header>


                <main>
                    <h4>Lista de repositórios Likados</h4>
                    <span>aqui vai ficar</span>
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