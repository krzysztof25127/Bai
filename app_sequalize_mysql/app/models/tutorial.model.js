module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize. define("tutorial", {
        tytul: {
            type: Sequelize.STRING
        },
        opis: {
            type: Sequelize.STRING
        },
        opublikowany: {
            type: Sequelize.BOOLEAN
        }
    });

    return Tutorial;
}