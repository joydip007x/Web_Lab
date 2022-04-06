//db.js

'use strict;'
//Include crypto to generate the movie id
var crypto = require('crypto');

module.exports = function() {
    return {
        bookList : [],
        /*
         * Save the movie inside the "db".
         */
        save(book) {
            book.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.bookList.push(book);
            return 1;
        },
        /*
         * Retrieve a movie with a given id or return all the movies if the id is undefined.
         */
        find(id) {
            if(id) {
                return this.bookList.find(element => {
                        return element.id === id;
                    });
            }else {
                return this.bookList;
            }
        },
        /*
         * Delete a movie with the given id.
         */
        remove(id) {
            var found = 0;
            this.bookList = this.bookList.filter(element => {
                    if(element.id === id) {
                        found = 1;
                    }else {
                        return element.id !== id;
                    }
                });
            return found;
        },
        /*
         * Update a movie with the given id
         */
        update(id, book) {
            var bookIndex = this.bookList.findIndex(element => {
                return element.id === id;
            });
            if(bookIndex !== -1) {
                this.bookList[bookIndex].name = book.name;
                this.bookList[bookIndex].author = book.author;
                this.bookList[bookIndex].publisher = book.publisher;
                return 1;
            }else {
                return 0;
            }
        }
    }
};
