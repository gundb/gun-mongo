# Gun-Mongo

A MongoDB adapter for GunJS. 

# WARNING: THIS IS NOT READY FOR PRODUCTION USE!! API unstable. Not fully tested.

Feel free to contribute and help get it ready for general use. :)

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

    // The following are defaults. You can supply `true` to use all defaults
    mongo: {
        host: 'localhost',
        port: '27017',
        database: 'gun',
        collection: 'gun-mongo',
        query: ''
    }
});
```
