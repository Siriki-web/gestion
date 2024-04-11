import React, { useState, useEffect } from 'react';
import '../../style/ModifierEntreprise.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from './Nav';

function ModifierEntreprise() {
    const [entrepriseData, setEntrepriseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://207.180.226.183:8000/data/row/read/${id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch entreprise data');
                }

                const data = await response.json();
                setEntrepriseData(data.data[0]);
                setFormData(data.data[0]);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch entreprise data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [token, id]);


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://207.180.226.183:8000/data/validate/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update entreprise data');
            }

            navigate(`/liste-entreprise`);
        } catch (error) {
            console.error('Failed to update entreprise data:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    console.log(entrepriseData);


    return (
        <div>
            <Nav />
            <div className='container'>
                <h1>Modifier les données de l'entreprise</h1>
                <form>
                    <div className="form-row">
                        <label className="form-label">Catégorie:</label>
                        <input className="form-input" type="text" name="CATEGORIE" defaultValue={formData.CATEGORIE} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Nom et prénoms représentant légal:</label>
                        <input className="form-input" type="text" name="NOM_PRENOMS_REPRESENTANT_LEGAL" defaultValue={formData.NOM_PRENOMS_REPRESENTANT_LEGAL} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label"> Ville:</label>
                        <input className="form-input" type="text" name="VILLE_COMMUNE" defaultValue={formData.VILLE_COMMUNE} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Libellé activité:</label>
                        <input className="form-input" type="text" name="LIBELLE_ACTIVITE" defaultValue={formData.LIBELLE_ACTIVITE} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Contact mobile:</label>
                        <input className="form-input" type="text" name="CONTACT_MOBILE" defaultValue={formData.CONTACT_MOBILE} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Qualité représentant légal:</label>
                        <input className="form-input" type="text" name="QUALITE_REPRESENTANT_LEGAL" defaultValue={formData.QUALITE_REPRESENTANT_LEGAL} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Adresse géographique complète</label>
                        <input className="form-input" type="text" name="ADRESSE_GEOGRAPHIQUE_COMPLETE" defaultValue={formData.ADRESSE_GEOGRAPHIQUE_COMPLETE} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Date de création:</label>
                        <input className="form-input" type="date" name="DATE_DE_CREATION" defaultValue={formData.DATE_DE_CREATION} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Second mobile:</label>
                        <input className="form-input" type="text" name="SECOND_MOBILE" defaultValue={formData.SECOND_MOBILE} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Téléphone répresentant légal</label>
                        <input className="form-input" type="text" name="TEL_REPRESENTANT_LEGAL" defaultValue={formData.TEL_REPRESENTANT_LEGAL} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Type scénario:</label>
                        <input className="form-input" type="text" name="TYPE_SCENARIO" defaultValue={formData.TYPE_SCENARIO} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label"> Capital:</label>
                        <input className="form-input" type="text" name="CAPITAL" defaultValue={formData.CAPITAL} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">E-mail</label>
                        <input className="form-input" type="text" name="E_MAIL" defaultValue={formData.E_MAIL} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Adresse postale répresentant légal:</label>
                        <input className="form-input" type="text" name="ADRESSE_POSTALE_REPRESENTANT_LEGAL" defaultValue={formData.ADRESSE_POSTALE_REPRESENTANT_LEGAL} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">District:</label>
                        <input className="form-input" type="text" name="DISTRICT" defaultValue={formData.DISTRICT} onChange={handleChange} />
                    </div>
                    {/* <div className="form-row">
                        <label className="form-label">Adresse postale répresentant légal:</label>
                        <input className="form-input" type="text" name="DISTRICT" defaultValue={formData.DISTRICT} onChange={handleChange} />
                    </div> */}
                    <div className="form-row">
                        <label className="form-label">Numero de piece d'identité du répresentant légal:</label>
                        <input className="form-input" type="text" name="NUMERO_DE_PIECE_IDENTITE_DU_REPRESENTANT_LEGAL" defaultValue={formData.NUMERO_DE_PIECE_IDENTITE_DU_REPRESENTANT_LEGAL} onChange={handleChange} />

                    </div>
                    <div className="form-row">
                        <label className="form-label">Segment marché:</label>
                        <input className="form-input" type="text" name="SEGMENT_MARCHE" defaultValue={formData.SEGMENT_MARCHE} onChange={handleChange} />

                    </div>
                    <div className="form-row">
                        <label className="form-label">Raison sociale fiabilisé:</label>
                        <input className="form-input" type="text" name="RAISON_SOCIALE_FIABILISE" defaultValue={formData.RAISON_SOCIALE_FIABILISE} onChange={handleChange} />

                    </div>
                    <div className="form-row">
                        <label className="form-label">Adresse email representant légal:</label>
                        <input className="form-input" type="text" name="ADRESSE_EMAIL_REPRESENTANT_LEGAL" defaultValue={formData.ADRESSE_EMAIL_REPRESENTANT_LEGAL} onChange={handleChange} />

                    </div>
                    <div className="form-row">
                        <label className="form-label">REGION:</label>
                        <input className="form-input" type="text" name="REGION" defaultValue={formData.REGION} onChange={handleChange} />

                    </div>
                    <div className="form-row">
                        <label className="form-label">Nationalité du répresentant légal:</label>
                        <input className="form-input" type="text" name="NATIONALITE_DU_REPRESENTANT_LEGAL" defaultValue={formData.NATIONALITE_DU_REPRESENTANT_LEGAL} onChange={handleChange} />

                    </div>
                    <div className="form-row">
                        <label className="form-label"> Gestionnaire:</label>
                        <input className="form-input" type="text" name="GESTIONNAIRE" defaultValue={formData.GESTIONNAIRE} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Raison sociale OCI:</label>
                        <input className="form-input" type="text" name="RAISON_SOCIALE_OCI" defaultValue={formData.RAISON_SOCIALE_OCI} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Localisation:</label>
                        <input className="form-input" type="text" name="LOCALISATION" defaultValue={formData.LOCALISATION} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Departement:</label>
                        <input className="form-input" type="text" name="DEPARTEMENT" defaultValue={formData.DEPARTEMENT} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Site web entreprise:</label>
                        <input className="form-input" type="text" name="SITE_WEB_ENTREPRISE" defaultValue={formData.SITE_WEB_ENTREPRISE} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Catégorie new:</label>
                        <input className="form-input" type="text" name="CATEGORIE_NEW" defaultValue={formData.CATEGORIE_NEW} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label"> Raison sociale impôt:</label>
                        <input className="form-input" type="text" name="RAISON_SOCIALE_IMPOT" defaultValue={formData.RAISON_SOCIALE_IMPOT} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Adresse postale entreprise:</label>
                        <input className="form-input" type="text" name="ADRESSE_POSTALE_ENTREPRISE" defaultValue={formData.ADRESSE_POSTALE_ENTREPRISE} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Forme juridique:</label>
                        <input className="form-input" type="text" name="FORME_JURIDIQUE" defaultValue={formData.FORME_JURIDIQUE} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Type client:</label>
                        <input className="form-input" type="text" name="TYPE_CLIENT" defaultValue={formData.TYPE_CLIENT} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Sigle:</label>
                        <input className="form-input" type="text" name="Sigle" defaultValue={formData.Sigle} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Ville:</label>
                        <input className="form-input" type="text" name="FORME_JURIDIQUE" defaultValue={formData.VILLE} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Secteur d'activité:</label>
                        <input className="form-input" type="text" name="SECTEUR_ACTIVITE" defaultValue={formData.SECTEUR_ACTIVITE} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-label">
                            Statut:
                            <div>
                                <input type="radio" id="traite" name="TREATED_STATUS" defaultValue={formData.TREATED_STATUS} onChange={handleChange} />
                                <label htmlFor="traite">Traité</label>
                            </div>

                            <div>
                                <input type="radio" id="non_traite" name="TREATED_STATUS" defaultValue={formData.TREATED_STATUS} onChange={handleChange} />
                                <label htmlFor="non_traite">Non traité</label>
                            </div>

                        </label>
                    </div>
                    <div className="button-container">
                        <button className="button-save" type="button" onClick={handleSave}>Sauvegarder</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModifierEntreprise;
