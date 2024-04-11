import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from './Nav';


function VoirEntreprise() {
    const [entrepriseData, setEntrepriseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); 
    const entrepriseId = parseInt(id);
    const token = useSelector(state => state.auth.token);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://207.180.226.183:8000/data/row/read/', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token,
                        row_index: entrepriseId
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch entreprise data');
                }

                const data = await response.json();
                setEntrepriseData(data.data[0][0]); 
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch entreprise data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [token, entrepriseId]); 

    return (
        <div>
            <Nav />
            {loading ? (
                <CircularProgress />
            ) : (
                <div>
                    <div style={{ marginTop: "30px", marginBottom: "30px", backgroundColor: "white", width: "35%", margin: "auto", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "10px" }}>
                        <Typography variant="h5" style={{ textAlign: "center", textTransform: "uppercase", fontWeight: "bold" }}>Details entreprise : <span style={{ color: "orange" }}>{entrepriseData && entrepriseData.RAISON_SOCIALE_FIABILISE}</span></Typography>
                    </div>
                    {entrepriseData && (
                        <table style={{ borderCollapse: 'collapse', width: '80%', margin: "auto" }}>
                            <tbody>
                                {Object.entries(entrepriseData).map(([key, value]) => (
                                    <tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}><strong>{key}</strong></td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}

export default VoirEntreprise;
