'use strict';
    // Include our "db"
    var db = require('../../config/db')();
    // Exports all the functions to perform on the db
    module.exports = {getAll, save, getOne, update, delMovie};
 
    // GET /movie operationId
    function getAll(req, res, next) {
      res.json({ books: db.find()});
    }
    // POST /movie operationId
    function save(req, res, next) {
        res.json({success: db.save(req.body), description: "Book added to the list!"});
    }
    // GET /movie/{id} operationId
    function getOne(req, res, next) {
        var id = req.swagger.params.id.value; // req.swagger contains the path parameters
        var book = db.find(id);
        if(book) {
            res.json(book);
        }else {
            res.status(204).send();
        }
    }
    // PUT /movie/{id} operationId
    function update(req, res, next) {
        var id = req.swagger.params.id.value; // req.swagger contains the path parameters
        var book = req.body;
        if(db.update(id, book)){
            res.json({success: 1, description: "Book updated!"});
        }else{
            res.status(204).send();
        }
 
    }
    // DELETE /movie/{id} operationId
    function delMovie(req, res, next) {
        var id = req.swagger.params.id.value; // req.swagger contains the path parameters
        if(db.remove(id)){
            res.json({success: 1, description: "Movie deleted!"});
        }else{
            res.status(204).send();
        }
 
    }
