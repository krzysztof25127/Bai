import React, { useState } from "react";
import axios from "axios";

const AddTutorial = () => {
    const [tytul, setTytul] = useState("");
    const [opis, setOpis] = useState("");
    const [opublikowany, setOpublikowany] = useState(false);
    const [wiadomosc, setWiadomosc] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tytul || !opis) {
            setWiadomosc("Proszę podać tytuł i opis.");
            return;
        }
        try {
            await axios.post("/api/tutorials", {
                tytul,
                opis,
                opublikowany,
            });
                setWiadomosc("Tutorial został pomyślnie dodany.");
                setTytul("");
                setOpis("");
                setOpublikowany(false);
        } catch (error) {
            console.error("Błąd podczas dodawania tutoriala:", error); // Wyświetlenie błędu w konsoli
            setWiadomosc("Wystąpił błąd podczas dodawania tutoriala.");
        }
    };

    return (
        <div className="container">
            <h3>Dodaj nowy tutorial</h3>
            {wiadomosc && <div className="alert alert-info">{wiadomosc}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="tytul" className="form-label">Tytuł</label>
                    <input
                        type="text"
                        id="tytul"
                        className="form-control"
                        value={tytul}
                        onChange={(e) => setTytul(e.target.value)}
                        placeholder="Wprowadź tytuł tutoriala"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="opis" className="form-label">Opis</label>
                    <textarea
                        id="opis"
                        className="form-control"
                        value={opis}
                        onChange={(e) => setOpis(e.target.value)}
                        placeholder="Wprowadź opis tutoriala"
                    ></textarea>
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        id="opublikowany"
                        className="form-check-input"
                        checked={opublikowany}
                        onChange={(e) => setOpublikowany(e.target.checked)}
                    />
                    <label htmlFor="opublikowany" className="form-check-label">Opublikowany</label>
                </div>

                <button type="submit" className="btn btn-primary">Dodaj tutorial</button>
            </form>
        </div>
    );
};

export default AddTutorial;