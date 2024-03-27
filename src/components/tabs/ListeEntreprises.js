import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography } from '@mui/material';

function ListeEntreprises() {
    const [entreprises, setEntreprises] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://207.180.226.183:8000/data/read/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        
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
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (entreprises.length === 0) {
        return <Typography variant="h6">Aucune entreprise trouvée.</Typography>;
    }

    return (
        <div>
            <Typography variant="h5">Liste des entreprises</Typography>
            <ul>
                {entreprises.map((entreprise, index) => (
                    <li key={index}>
                        <Typography>{entreprise.RAISON_SOCIALE_FIABILISE}</Typography>
                        {/* Afficher d'autres détails de l'entreprise ici */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListeEntreprises;
