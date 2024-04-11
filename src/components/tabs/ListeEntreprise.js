// ListeEntreprises.js
import React, { useState, useEffect } from 'react';
import '../../style/ListeEntreprises.css'
import Nav from './Nav'
import { CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { AiFillEdit } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

// import VoirEntreprise from './VoirEntreprise';

function ListeEntreprises() {
    const [entreprises, setEntreprises] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [selectedEntreprise, setSelectedEntreprise] = useState(null); 
    const navigate = useNavigate()
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://207.180.226.183:8000/data/read/', {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch entreprises data');
                }
                const data = await response.json();
                setEntreprises(data.data[0]);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch entreprises data', error);
                setLoading(false);
            }
        }
        fetchData();
    }, [token]);

    const handleVoir = (entreprise) => {
        navigate(`/voir-entreprise/${entreprise.id}`);
    };

    const handleModifier = (entreprise) => {
        navigate(`/modif-entreprise/${entreprise.id}`);
        // console.log('Modifier entreprise :', entreprise);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (entreprises.length === 0) {
        return <Typography variant="h6">Aucune entreprise trouvée.</Typography>;
    }

    return (
        <div>
            <Nav />

            <div style={{ marginTop: "30px", marginBottom: "30px", backgroundColor: "white", width: "25%", margin: "auto", boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px", padding: "10px"}}>
                <Typography variant="h5" style={{ textAlign: "center", textTransform: "uppercase", fontWeight: "bold" }}>Liste des entreprises</Typography>
            </div>


            <table>
                <thead>
                    <tr>
                        <th>Numero CC</th>
                        <th>Catégorie</th>
                        <th>Capital</th>
                        <th>Raison social fiabilisée</th>
                        <th>...</th>
                        <th>Region</th>
                        <th>Type client</th>
                        <th>Secteur activie</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {entreprises.map(entreprise => (
                        <tr key={entreprise.IDENTIFIANT_UNIQUE}>
                            <td>{entreprise.NUMERO_CC}</td>
                            <td>{entreprise.CATEGORIE}</td>
                            <td>{entreprise.CAPITAL}</td>
                            <td>{entreprise.RAISON_SOCIALE_FIABILISE}</td>
                            <td>...</td>
                            <td>{entreprise.REGION}</td>
                            <td>{entreprise.TYPE_CLIENT}</td>
                            <td>{entreprise.SECTEUR_ACTIVITE}</td>
                            <td style={{ gap: "10px"}}>
                                <button className='btn-bt' onClick={() => handleVoir(entreprise)}><GrFormView /></button>
                                <button className='btn-bt' onClick={() => handleModifier(entreprise)}><AiFillEdit /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListeEntreprises;
