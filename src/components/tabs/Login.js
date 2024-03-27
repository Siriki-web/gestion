import React, { useState } from "react";
import { Stack, TextField, Card, CardContent, Typography, Snackbar, Alert } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { DisplayButton } from "../librairy/button";
import { connect } from "react-redux";
import { addUserData } from "../../store/actions";
import { useNavigate } from "react-router-dom";


function Login({ saveData }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState("Verifier les champs");
    const [visibility, setVisibility] = useState(false);
    const [alertType, setAlertType] = useState("error");
    const navigate = useNavigate();

    const closeAlert = () => {
        setAlert(false);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://207.180.226.183:8000/user/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.data[0]);
                navigate("/liste-entreprise");
            } else {
                setAlert(true);
                setAlertType("error");
                setAlertText("Erreur: Nom d'utilisateur ou mot de passe incorrect");
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            setAlert(true);
            setAlertType("error");
            setAlertText("Erreur lors de la connexion. Veuillez réessayer.");
        }
    };

    return (

        <div>
            <Snackbar open={alert} autoHideDuration={6000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity={alertType} color={alertType}>
                    {alertText}
                </Alert>
            </Snackbar>

            <Card
                sx={{
                    width: "30%",
                    backgroundColor: "#CECECE",
                    height: "auto",
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)"
                }}
            >
                <Typography component="div" variant="h5" style={{ textAlign: "center", marginTop: "5%" }}>
                    Connexion
                </Typography>

                <CardContent>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <AccountCircle style={{ color: "grey", width: 100, height: 100 }} />
                    </div>
                    <Stack spacing={2} marginTop={2}>
                        <TextField
                            id="outlined-basic"
                            label="login"
                            name="login"
                            variant="outlined"
                            onChange={handleUsernameChange}
                            style={{ width: "90%", margin: "auto" }}
                        />
                        <Stack direction="row" spacing={1}>
                            <TextField
                                id="outlined-basic"
                                label="password"
                                name="password"
                                variant="outlined"
                                onChange={handlePasswordChange}
                                style={{ width: "90%", margin: "auto" }}
                                type={visibility ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            aria-label="visibily"
                                            onClick={() => setVisibility(!visibility)}
                                            edge="end"
                                        >
                                            {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    )
                                }}
                            />
                        </Stack>
                        <DisplayButton
                            type="contained"
                            disabled={false}
                            text={"Se Connecter"}
                            onPress={handleSubmit}
                            style={{ width: "90%", backgroundColor: "orange", margin: "auto", marginTop: "20px" }}
                        />
                    </Stack>
                </CardContent>
            </Card>
        </div>

    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchStoreToProps = (dispatch) => {
    return {
        saveData: (data) => {
            dispatch(addUserData(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchStoreToProps)(Login);
