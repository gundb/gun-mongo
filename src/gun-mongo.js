const {NodeAdapter} = require('gun-flint');
const Mongojs = require('mongojs');

module.exports = new NodeAdapter({

    /**
     * @type {boolean}  Whether or not the adapter has been properly initialized and can attempt DB connections
     */
    initialized: false,

    /**
     * Handle Initialization options passed during Gun initialization of <code>opt</code> calls.
     * 
     * Prepare the adapter to create a connection to the Mongo server
     * 
     * @param {object}  context    The full Gun context during initialization/opt call
     * @param {object}  opt        Options pulled from fully context
     * 
     * @return {void}
     */
    opt: function(context, opt) {
        let mongo = opt.mongo || null;
        if (mongo) {
            this.initialized = true;
            let dbString;
            if (typeof obj === "string") {
                dbString = mongo;
            } else {
                let database = mongo.database || 'gun';
                let port = mongo.port || '27017';
                let host = mongo.host || 'localhost';
                let userUri = mongo.username || '';
                if (userUri.length > 0) {
                    if (mongo.password) {
                        userUri += `:${mongo.password}`;
                    }
                    userUri += '@';
                }
                let query = mongo.query ? '?' + mongo.query : '';
                this.collection = mongo.collection || 'gun-mongo';
                this.indexInBackground = mongo.indexInBackground || false;
                let dbString = `mongodb://${userUri}${host}:${port}/${database}${query}`;
            }
            this.db = Mongojs(dbString);
        } else {
            this.initialized = false
        }
    },

    /**
     * Retrieve results from the DB
     * 
     * @param {string}   key    The key for the node to retrieve
     * @param {function} done   Call after retrieval (or error)
     *
     * @return {void}
     */
    get: function(key, done) {
        if (this.initialized) {
            this.getCollection().findOne({_id: key}, {}, (err, result) => {
                if (err) {
                    done(this.errors.internal)
                } else if (!result) {
                    done(this.errors.lost);
                } else {
                    done(null, result.val);
                }
            });
        }
    },

    /**
     * Write nodes to the DB
     * 
     * @param {string}   key   The key for the node
     * @param {object}   node  The full node with metadata
     * @param {function} done  Called when the node has been written
     * 
     * @return {void}
     */
    put: function(key, node, done) {
        if (this.initialized) {
            this.getCollection(key).findAndModify(
                {
                    query: {_id: key},
                    update: { 
                        key: key,
                        val: node
                    },
                    upsert: true
                }, done
            );
        }
    },

    /**
     * Retrieve the collection for querying
     * 
     * @return {object}   A collection to query
     */
    getCollection: function() {
        return this.db.collection(this.collection);
    },

    /**
     * Ensure indexes are created on the proper fields
     * 
     * @return {void}
     */
    _ensureIndex() {
        this._getCollection().createIndex({
            _id: 1,
        }, {
            background: this.indexInBackground
        });
   }
});
