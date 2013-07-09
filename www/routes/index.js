var async = require('async');



var client = require("redis").createClient();

exports.createGame = function createGame( id, name, callback) {

    client.hlen(id,  function(err, reply) {
        if (reply == 0) {
            client.hset(id, "gameid", id);
            client.hset(id, "name", name);
            callback(true);
        } else {
            callback(false);
        }
    });
}