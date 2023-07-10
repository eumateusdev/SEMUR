const createAttraction = `
    CREATE TABLE IF NOT EXISTS Attraction
    (
        AttractionId INTEGER PRIMARY KEY AUTOINCREMENT,
        Name VARCHAR,
        Local VARCHAR,
        Data VARCHAR,
        Time VARCHAR,
        Image VARCHAR NULL,
        Type VARCHAR,
        CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UpdadeDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        DelitionDate TIMESTAMP
    )
`;

module.exports = createAttraction;