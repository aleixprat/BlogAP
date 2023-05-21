//Creamos post
const create = ({titulo, descripcion, fecha_creacion, categoria, autores_id}) => {
    return db.query(
        "insert into posts (titulo, descripcion, fecha_creacion, categoria, autores_id)"+
        "values (?,?,?,?,?)",
        [titulo,descripcion,fecha_creacion,categoria,autores_id]);
};

//Recuperar post y su autor
const getById = (postId) =>{
    return db.query(
        "select p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria, p.autores_id, a.nombre, a.email, a.imagen " + 
        "from posts as p " +
        "JOIN autores as a ON a.id = p.autores_id " +
        "where p.id = ?"
    ,[postId]);
};

//Recuperar todos los posts
const getAll = () =>{
    return db.query( "select p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria, p.autores_id, a.nombre, a.email, a.imagen " + 
                     "from posts as p " +
                     "JOIN autores as a ON a.id = p.autores_id ");
};

//Recuperar posts creados por un autor en concreto
const getPostsByAutor = (autorID) => {
    return db.query(
        "select p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria, p.autores_id, a.nombre, a.email, a.imagen " + 
        "from posts as p " +
        "JOIN autores as a ON a.id = p.autores_id " +
        "where p.autores_id = ?"
    ,[autorID]);
};

//Actualizar un post
const update = (postId,bodyUpdate) => {
    const query = "update posts set " + 
                    Object.keys(bodyUpdate).map(key => `${key} = ?`).join(", ") + 
                    " where id = ?";
    const parameters = [...Object.values(bodyUpdate), postId];
    
    return db.query(
        query,
        parameters
    )
};

//Borrar un post
const deletePost = (postId) => {
    return db.query('delete from posts where id = ?', [postId]);
};

module.exports = {create,getById, getAll , getPostsByAutor, update, deletePost};