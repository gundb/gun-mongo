# Gun-Mongo

A MongoDB adapter for GunJS.

# Some Considerations

`gun-mongo` stores the each graph node (along with some metadata) in a document and uses the key as the Mongo '_id'. This makes `gun-mongo` right for some application but not all.

If the following are true, then `gun-mongo` could be right for you:

1. No single node is huge (e.g., a `users` node with millions of children would be problematic). Most nodes are small to medium.
2. Nodes are created more than updated.

# Installation

`yarn add gun-mongo` or `npm install gun-mongo`.

```javascript

const Gun = require('gun');

// Must be added after Gun but before instantiating Gun
require('gun-mongo');

// Instantiate Gun
const gun = new Gun({
    file: false,
    server: httpServer,

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

In some preliminary tests (that should not be taken for official benchmarks), `gun-mongo` can write ~2,600 nodes/sec, where each node had 10 key:value pairs. Read stats pending.
