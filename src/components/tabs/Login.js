import React, { useState, useEffect } from "react";
import { Stack, TextField, Card, CardContent, Typography, Snackbar, Alert } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
// import InputAdornment from "@mui/material/InputAdornment";
// import { DisplayButton } from "../librairy/button";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../store/actions"
import "../../style/Login.css"


function Login({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState("Verifier les champs");
    const [visibility, setVisibility] = useState(false);
    const [alertType, setAlertType] = useState("error");
    const navigate = useNavigate();

    useEffect(() => {
        // Génération dynamique des bulles
        generateBubbles();
    }, []);

    const generateBubbles = () => {
        const container = document.querySelector(".login-container");
        if (container) {
            for (let i = 0; i < 30; i++) {
                const bubble = document.createElement("div");
                bubble.classList.add("bubble", `bubble-${i % 3 + 1}`);
                bubble.style.bottom = `${Math.random() * 100}%`;
                container.appendChild(bubble);
            }
        }
    };

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

            if (data.code === 200 && data.data && data.data.length > 0) {
                const token = data.data[0]
                setToken(token)
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

        <div className="login-container">
            <Snackbar open={alert} autoHideDuration={6000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity={alertType} color={alertType}>
                    {alertText}
                </Alert>
            </Snackbar>

            <Card
                sx={{
                    width: "30%",
                    backgroundColor: "#000",
                    height: "auto",
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "1px solid grey",
                    borderRadius: "10px"
                }}
            >
                <Typography component="div" variant="h5" style={{ textAlign: "center", marginTop: "5%", color: "white" }}>
                    Connexion
                </Typography>

                <CardContent>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <AccountCircle style={{ color: "#fff", width: 100, height: 100 }} />
                    </div>
                    <Stack spacing={2} marginTop={2}>
                        <TextField
                            id="outlined-basic"
                            label="Login"
                            name="login"
                            
                            onChange={handleUsernameChange}
                            sx={{ width: "90%", margin: "auto", backgroundColor: "#000", border: "1px solid white" }}
                            InputProps={{
                                // startAdornment: (
                                //     <InputAdornment position="start">
                                //         <AccountCircle sx={{color: "white"}}/>
                                //     </InputAdornment>
                                // ),
                                style: { color: "white" }

                            }}
                            InputLabelProps={{
                                style: { color: "white" }
                            }}

                        />
                        <Stack direction="row" spacing={1}>
                            <TextField
                                id="outlined-basic"
                                label="Password"
                                name="password"
                                variant="outlined"
                                onChange={handlePasswordChange}
                                style={{ width: "90%", margin: "auto", backgroundColor: "#000", border: "1px solid white" }}
                                type={visibility ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            aria-label="visibily"
                                            onClick={() => setVisibility(!visibility)}
                                            edge="end"
                                            style={{ color: "white" }}
                                        >
                                            {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    ),
                                    style: { color: "white" }
                                }}
                                InputLabelProps={{
                                    style: { color: "white" }
                                }}
                            />
                        </Stack>
                        <button
                            onClick={handleSubmit}
                            style={{
                                width: "90%",
                                backgroundColor: "#ff7900",
                                margin: "auto",
                                marginTop: "20px",
                                border: "none",
                                height: "60px",
                                color: "white",  
                                fontWeight: "bold",
                                cursor: "pointer",
                                transition: "background-color 0.3s, color 0.3s"
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "white";
                                e.target.style.color = "black"; 
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#ff7900";
                                e.target.style.color = "white"; 
                            }}
                        >
                            SE CONNECTER
                        </button>

                        {/* <DisplayButton
                            type="contained"
                            disabled={false}
                            text={"Se Connecter"}
                            onPress={handleSubmit}
                            style={{
                                width: "90%", backgroundColor: "#ff7900", margin: "auto", marginTop: "20px", 
                            }}
                        /> */}
                    </Stack>
                </CardContent>
            </Card>
        </div>

    );
}

// const mapStateToProps = (state) => {
//     return {};
// };

const mapDispatchToProps = dispatch => ({
    setToken: token => dispatch(setToken(token))
});

export default connect(null, mapDispatchToProps)(Login);
