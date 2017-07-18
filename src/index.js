const {Flint, NodeAdapter} = require('gun-flint');
const MongoClient = require('mongodb');

Flint.register(new NodeAdapter({
    getTimeout: null,
    putTimeout: null,
    patchTimeout: null,
    ready: false,
    initialized: false,
    get: function(key, done) {
        if (this.initialized) {
            let get = this.get.bind(this, key, done);
            if (!this.ready) {
                this.getTimeout = setTimeout(get, 500);
            } else {
                this.db.findOne({key}, (err, result) => {
                    if (err) {
                        done(this.errors.internal)
                    } else if (!result) {
                        done(this.errors.lost);
                    } else {
                        done(null, result.val);
                    }
                });
            }
        }
    },
    put: function(key, val, done) {
        if (this.initialized) {
            let put = this.put.bind(this, key, val, done);
            if (!this.ready) {
                this.putTimeout = setTimeout(put, 500);
            } else {
                this.db.findOneAndUpdate({key}, {key, val}, {upsert: true}, done);
            }
        }
    },
    opt: function(context, opt) {
        let {mongo} = opt;
        if (mongo) {
            this.initialized = true;
            let database = mongo.database || 'gun';
            let port = mongo.port || '27017';
            let host = mongo.host || 'localhost';
            let query = mongo.query ? '?' + mongo.query : '';
            this.collection = mongo.collection || 'gun-mongo';
            
            let _self = this;
            MongoClient.connect(`mongodb://${host}:${port}/${database}${query}`, (err, db) => {
                if (err) {
                    throw err;
                }
                _self.ready = true;
                _self.db = db.collection(_self.collection);
            });
        } else {
            this.initialized = false
        }
    }
}));