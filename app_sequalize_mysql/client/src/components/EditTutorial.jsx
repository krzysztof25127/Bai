import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditTutorial = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tytul, setTytul] = useState("");
    const [opis, setOpis] = useState("");
    const [opublikowany, setOpublikowany] = useState(false);


    useEffect(() => {
        const fetchTutorial = async () => {
                const response = await axios.get(`/api/tutorials/${id}`);
                const { tytul, opis, opublikowany } = response.data;

                setTytul(tytul);
                setOpis(opis);
                setOpublikowany(opublikowany);
        };
        fetchTutorial();
    }, [id]);


    const handleSave = async (e) => {
        e.preventDefault();
            await axios.put(`/api/tutorials/${id}`, { tytul, opis, opublikowany });
            navigate("/");
    };

    return (
        <div className="container">
            <h3>Edytuj Tutorial</h3>
            <form onSubmit={handleSave}>
                <div className="mb-3">
                    <label htmlFor="tytul" className="form-label">Tytuł</label>
                    <input
                        type="text"
                        id="tytul"
                        value={tytul}
                        onChange={(e) => setTytul(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="opis" className="form-label">Opis</label>
                    <textarea
                        id="opis"
                        value={opis}
                        onChange={(e) => setOpis(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        id="opublikowany"
                        checked={opublikowany}
                        onChange={(e) => setOpublikowany(e.target.checked)}
                        className="form-check-input"
                    />
                    <label htmlFor="opublikowany" className="form-check-label">Opublikowany</label>
                </div>
                <button type="submit" className="btn btn-primary">Zapisz</button>
                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate("/tutorials")} // Powrót do listy
                >Anuluj</button>
            </form>
        </div>
    );
};

export default EditTutorial;