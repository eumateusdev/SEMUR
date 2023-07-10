const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");
const { all } = require("../routes");

class UsersController {

    async create(request, response){
        try{
            const {name, email, password} = request.body;

            const database = await sqliteConnection();
            //const checkUserExist = await database.all("SELECT * FROM Users");
            const checkUserExist = await database.get("SELECT * FROM Users WHERE Email = (?)", [email]);

            if(checkUserExist)
                throw new AppError("Este email ja esta em uso.");

            //const encryptPassword = await hash(password, 8);
            
            await database.run("INSERT INTO Users (Name, Email, Password) VALUES ( ?, ?, ? )",[name, email, password]);

            return response.status(201).json(checkUserExist);
        }
        catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro interno do servidor.' });
        } 
    }

    async update(request, response){
        try{
            const {name, email, password, oldPassword} = request.body;
            const { id } = request.params;

            const database = await sqliteConnection();
            const user = await database.get("SELECT * FROM Users WHERE UsersId = (?)", [id]);

            if(!user)
                throw new AppError("Usuário naão encontrado.");
            
            const userWithUpdateEmail = await database.get("SELECT * FROM Users WHERE Email = (?)", [email]);

            if(userWithUpdateEmail && userWithUpdateEmail.UsersId !== user.UsersId)
                throw new AppError("Email ja esta em uso");

            user.Name = name ?? user.Name;
            user.Email = email ?? user.Email;
            user.UpdadeDate = getDate();

            if(password && !oldPassword)
                throw new AppError("É necessario informa a senha antiga");
            
            if(password && oldPassword){
                const checkOldPassword = await compare(oldPassword, user.Password);
                
                if(!checkOldPassword)
                    throw new AppError("Senha antiga não confere");
            
                //user.Password = await hash(password, 8);
            }
            

            await database.run(`UPDATE Users SET Name = ?, Email = ?, Password = ?, UpdadeDate = ? WHERE UsersId = ? `,[user.Name, user.Email, user.Password, user.UpdadeDate, id]);

            return response.json();     
        }
        catch (error) {
            console.error(error);
            if (error instanceof AppError) 
                return response.status(400).json({ error: { message: error.message } });
            else
                return response.status(500).json({ error: { message: 'Erro interno do servidor.' } });
        }   
    }

    async login(request, response){
        try{
            const {email, password} = request.body;

            const database = await sqliteConnection();

            const checkUserExist = await database.get("SELECT * FROM Users WHERE Email = (?) AND Password = (?)", [email, password]);
            console.log(checkUserExist)
            if(!checkUserExist)
                throw new AppError("Confira suas credenciais");

            return response.status(201).json(checkUserExist);
        }
        catch (error) {
            console.error(error);
            if (error instanceof AppError) 
                return response.status(400).json({ error: { message: error.message } });
            else
                return response.status(500).json({ error: { message: 'Erro interno do servidor.' } });
        } 
    }

    async createAttraction(request, response){
        try{
            const {name, local, data, time, image, type} = request.body;

            const database = await sqliteConnection();
            const checkAttractionExist = await database.get("SELECT * FROM Attraction WHERE Name = (?) AND DelitionDate IS NULL", [name]);

            if(checkAttractionExist)
                throw new AppError({ message: type == 'atracao' ? 'ERRO: Essa atração já registrada' : 'ERRO: Esse evento já está registrado' });
            
            await database.run("INSERT INTO Attraction (Name, Local, Data, Time, Image, Type) VALUES ( ?, ?, ?, ?, ?, ? )",[name, local, data, time, image, type]);

            return response.status(201).json({ message: type == 'atracao' ? 'Atração registrada' : 'Evento registrado' });
        }
        catch (error) {
            console.error(error);
            if (error instanceof AppError) 
                return response.status(400).json({ error: { message: error.message } });
            else
                return response.status(500).json({ error: { message: 'Erro interno do servidor.' } });
        } 
    }

    async getAttractionById(request, response){
        try{
            const {Id} = request.body;

            const database = await sqliteConnection();
            const checkAttractionExist = await database.get("SELECT * FROM Attraction WHERE AttractionId = (?) AND DelitionDate IS NULL", [Id]);console.log("**************"+checkAttractionExist)

            if (checkAttractionExist == null || checkAttractionExist == undefined) 
                throw new AppError('ERRO: Essa atração ou evento não está registrado',{code:400});
        
            return response.status(201).json(checkAttractionExist);
        }
        catch (error) {
            console.error(error);
            if (error instanceof AppError) 
                return response.status(400).json({ error: { message: error.message } });
            else
                return response.status(500).json({ error: { message: 'Erro interno do servidor.' } });      
        } 
    }

    async getAttractionByNameAndType(request, response){
        try{
            const {name, type} = request.body;

            const database = await sqliteConnection();
            const checkAttractionExist = await database.all("SELECT * FROM Attraction WHERE Name LIKE ('%' || (?) || '%') AND DelitionDate IS NULL AND Type = (?)", [name, type]);

            if (checkAttractionExist === null || checkAttractionExist === undefined) 
                throw new AppError({ message: type == 'atracao' ? 'ERRO: Essa atração não está registrada' : 'ERRO: Esse evento não está registrado' });
        
            return response.status(201).json(checkAttractionExist);
        }
        catch (error) {
            console.error(error);
            if (error instanceof AppError) 
                return response.status(400).json({ error: { message: error.message } });
            else
                return response.status(500).json({ error: { message: 'Erro interno do servidor.' } });
        } 
    }

    async getAllAttractionsByType(request, response){
        try{
            const {type} = request.body;
            const database = await sqliteConnection();

            let checkAttractionExist = await database.all("SELECT * FROM Attraction WHERE Type = (?) AND DelitionDate IS NULL", [type]);
        
            return response.status(201).json(checkAttractionExist);
        }
        catch (error) {
            console.error(error);
            if (error instanceof AppError) 
                return response.status(400).json({ error: { message: error.message } });
            else
                return response.status(500).json({ error: { message: 'Erro interno do servidor.' } });
        } 
    }

    async removeAttractionById(request, response){
        try{
            const {Id} = request.body;

            const database = await sqliteConnection();

            const date = getDate();
            await database.run(`UPDATE Attraction SET DelitionDate = (?), UpdadeDate = (?) WHERE AttractionId = (?) `,[date, date, Id]);
        
            return response.status(201).json({ message: 'Removido com sucesso.'});
        }
        catch (error) {
            console.error(error);
            if (error instanceof AppError) 
                return response.status(400).json({ error: { message: error.message } });
            else
                return response.status(500).json({ error: { message: 'Erro interno do servidor.' } });
        }     
    }

    async editAttractionById(request, response){
        try {
            const {Id, name, local, data, time, image} = request.body;

            const database = await sqliteConnection();
            const attraction = await database.get("SELECT * FROM Attraction WHERE AttractionId = (?) AND DelitionDate IS NULL", [Id]);console.log(request.body);console.log(attraction)

            attraction.Name = name || attraction.Name;
            attraction.Local = local || attraction.Local;
            attraction.Data = data || attraction.Data;
            attraction.Time = time || attraction.Time;
            attraction.Image = image || attraction.Image;

            const date = getDate();console.log(attraction)
            await database.run(`UPDATE
                                    Attraction 
                                        SET Name = (?), Local = (?), Data = (?), Time  = (?), Image = (?), Type = (?), UpdadeDate = (?)
                                            WHERE 
                                                AttractionId = (?) `,[attraction.Name, attraction.Local, attraction.Data, attraction.Time, attraction.Image,attraction.Type, date, Id]);

            return response.status(201).json({ message: 'Editado com sucesso.'});
        } 
        catch (error) {
            console.error(error);
            if (error instanceof AppError) 
                return response.status(400).json({ error: { message: error.message } });
            else
                return response.status(500).json({ error: { message: 'Erro interno do servidor.' } });
        }     
    }

}

function getDate(){
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear());
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const currentDateTime =  year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    return currentDateTime;
}

module.exports = UsersController;