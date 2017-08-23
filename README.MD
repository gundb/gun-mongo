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
        database: 'gun',
        collection: 'gun-mongo',
        query: ''
    }
});
```

# Performance

Tests run on a 2012 Macbook Pro, 2.5 GHz Intel Core i5, 16 GB RAM.

**Small Nodes: 10 Properties Each**
* Write 10000 nodes: 14960ms; 14.96s; **1.496 ms/node**
* Read 10000 nodes: 7159ms; 7.159s; **0.716 ms/node**
* Full Update 10000 nodes: 24272ms; 24.272s; **2.427 ms/node**
* Update single field on 10000 nodes: 26881ms; 26.881s; **2.688 ms/node**

**Medium Nodes: 1000 Properties Each**
* Write 1000 nodes: 17427ms; 17.427s; **17.410 ms/node**
* Read 1000 nodes: 12255ms; 12.255s; **12.243 ms/node**
* Full Update 1000 nodes: 27271ms; 27.271s; **27.244 ms/node**
* Update single field on 1000 nodes: 13280ms; 13.28s; **13.267 ms/node**

# Issues & Contributing

Issues welcome on [Github](https://github.com/sjones6/gun-mongo/issues).

Community contributions welcome. PRs accepted after code review.