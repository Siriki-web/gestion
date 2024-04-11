import React, { useEffect, useState } from 'react';
import Nav from "./Nav"

const ListeBaseACorriger = () => {
    const [basesACorriger, setBasesACorriger] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBasesACorriger = async () => {
            try {
                const response = await fetch('http://207.180.226.183:8000/baseacorriger/all/');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setBasesACorriger(data.data[0]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchBasesACorriger();
    }, []);

    return (
        <div>
            <Nav />
            <h1>Liste des Bases à Corriger</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Libellé</th>
                            <th>Date de mise à jour</th>
                            <th>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {basesACorriger.map((base) => (
                            <tr key={base.id}>
                                <td>{base.libelle}</td>
                                <td>{new Date(base.updated_at).toLocaleString()}</td>
                                <td>{base.statut ? "Traité" : "Non traité"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListeBaseACorriger;
