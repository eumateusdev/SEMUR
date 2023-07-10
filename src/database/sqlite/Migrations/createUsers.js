const createUsers = `
    CREATE TABLE IF NOT EXISTS Users 
    (
        UsersId INTEGER PRIMARY KEY AUTOINCREMENT,
        Name VARCHAR,
        Email VARCHAR,
        Password VARCHAR,
        Status VARCHAR,
        Avatar VARCHAR NULL,
        CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UpdadeDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        DelitionDate TIMESTAMP
    )
`;

module.exports = createUsers;