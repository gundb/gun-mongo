# Gun-Mongo

A MongoDB adapter for GunJS.

# Some Considerations

`gun-mongo` stores the each graph node (along with some metadata) in a document and uses the key as the Mongo '_id'. This makes `gun-mongo` right for some application but not all.

If the following are true, then `gun-mongo` could be right for you:

1. No single node is huge (e.g., a `users` node with millions of children would be problematic). Most nodes are small to medium. Fair warning: If a node grows too large, it _could_ overwhelm memory and cause crashes.
2. Nodes are created more than updated.

Contrast this with [`gun-mongo-key`](https://github.com/sjones6/gun-mongo-key). Whereas `gun-mongo-key` has the advantage for updates and enabling streaming of large nodes, `gun-mongo` makes Node creation much more efficient.

# Installation

`yarn add gun-mongo` or `npm install gun-mongo`.

```javascript

const Gun = require('gun');

// Must be added after Gun but before instantiating Gun
require('gun-mongo');

// Instantiate Gun
const gun = new Gun({
    file: false,
    web: httpServer,

    // The following are defaults. You can supply `true` to use all defaults, or overwrite the ones you choose
    mongo: {
        host: 'localhost',
        port: '27017',
        username: null,
        password: null,
        database: 'gun',
        collection: 'gun-mongo',
        query: ''
    },
    //Instead of using an object (like above), you may also provide the MongoDB connection URI yourself:
    mongo: "mongodb://127.0.0.1/gun"
});
```

# Performance

Tests run on a 2012 Macbook Pro, 2.5 GHz Intel Core i5, 16 GB RAM.

**On an empty collection:**

* Write 10000 nodes: : 7188ms; 7.188s; 0.7188 ms/node.
* Read 10000 nodes: : 4383ms; 4.383s; 0.4383 ms/node.
* Update 10000 nodes: : 8077ms; 8.077s; 0.8077 ms/node.
* Update single field on 10000 nodes: : 7661ms; 7.661s; 0.7661 ms/node.

**On a collection with ~1.4 million documents:**

* Write 10000 nodes: : 9764ms; 9.764s; 0.9764 ms/node.
* Read 10000 nodes: : 4579ms; 4.579s; 0.4579 ms/node.
* Update 10000 nodes: : 8599ms; 8.599s; 0.8599 ms/node.
* Update single field on 10000 nodes: : 8486ms; 8.486s; 0.8486 ms/node.

# Issues & Contributing

Issues welcome on [Github](https://github.com/sjones6/gun-mongo/issues).

Community contributions welcome. PRs accepted after code review.
