import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

const TutorialsList = () => {
    const [tutorials, setTutorials] = useState([]);
    const [message, setMessage] = useState("");

    const fetchTutorials = async () => {
            const response = await axios.get("/api/tutorials");
            setTutorials(response.data);
    };

    useEffect(() => {
        fetchTutorials();
    }, []);


    const deleteTutorial = async (id) => {
            await axios.delete(`/api/tutorials/${id}`);
            setTutorials(tutorials.filter((tutorial) => tutorial.id !== id));
            setMessage("Tutorial został usunięty.");
    };
    const navigate = useNavigate();

    return (
        <div className="container">
            <h3>Lista Tutoriali</h3>
            {message && <div className="alert alert-info">{message}</div>}
            {Array.isArray(tutorials) && tutorials.length > 0 ? (
                <ul className="list-group">
                    {tutorials.map((tutorial) => (
                        <li key={tutorial.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{tutorial.id}. </strong>
                                <strong>{tutorial.tytul}</strong>
                                <p>{tutorial.opis}</p>
                                {tutorial.opublikowany ? <span className="badge bg-success">Opublikowany</span> : <span className="badge bg-secondary">Nieopublikowany</span>}
                            </div>
                            <div>
                                <button
                                    onClick={() => navigate(`/tutorials/${tutorial.id}/edit`)}
                                    className="btn btn-warning btn-sm me-2">Edytuj</button>
                                <button onClick={() => deleteTutorial(tutorial.id)} className="btn btn-danger btn-sm">Usuń</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Brak danych do wyświetlenia.</p>
            )}
        </div>
    );
};
export default TutorialsList;