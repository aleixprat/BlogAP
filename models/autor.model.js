//Creamos autor
const create = ({nombre, email, imagen}) => {
    return db.query(
        "insert into autores (nombre, email, imagen)"+
        "values (?,?,?)",
        [nombre,email,imagen]);
}

//Recuperar autor
const getById = (autorId) =>{
    return db.query(
        "select * from autores " + 
        "where id = ?",
        [autorId]
    )
}

//Actualizar un autor
const update = (autorId,bodyUpdate) => {
    const query = "update autores set " + 
                    Object.keys(bodyUpdate).map(key => `${key} = ?`).join(", ") + 
                    " where id = ?";
    const parameters = [...Object.values(bodyUpdate), autorId];
    
    return db.query(
        query,
        parameters
    )
}

const deleteAutor = (autorID) => {
    return db.query('delete from autores where id = ?', [autorID]);
}

module.exports = {create, getById, update, deleteAutor};