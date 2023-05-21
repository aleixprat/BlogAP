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

module.exports = {create, getById};