//Creamos post
const create = ({titulo, descripcion, fecha_creacion, categoria, autores_id}) => {
    return db.query(
        "insert into posts (titulo, descripcion, fecha_creacion, categoria, autores_id)"+
        "values (?,?,?,?,?)",
        [titulo,descripcion,fecha_creacion,categoria,autores_id]);
}

//Recuperar post y su autor
const getById = (postId) =>{
    return db.query(
        "select p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria, p.autores_id, a.nombre, a.email, a.imagen " + 
        "from posts as p " +
        "JOIN autores as a ON a.id = p.autores_id " +
        "where p.id = ?"
    ,[postId]);
}


module.exports = {create,getById};