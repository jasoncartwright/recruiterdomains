let vows = require('vows');
let assert = require('assert');
let fs = require('fs');
let path = require('path');
let domainList = path.join(__dirname, '..', 'domains.txt');

vows.describe('Order of the recruiter list').addBatch({
  'is': {
    topic: () => {
      let contents = fs.readFileSync(domainList).toString().split('\n');
      let domains = [];
      contents.forEach((item, index) => {
        if (item !== '') {
          // We use lowercase so sorting works properly
          domains.push(item.toLowerCase());
        }
      });
      return domains;
    },

    'unique': (topic) => {
      let uniqueDomains = Array.from(new Set(topic));
      assert.deepEqual(topic, uniqueDomains);
    },

    'alphabetical': (topic) => {
      let sorted = Array.from(topic).sort();
      assert.deepEqual(topic, sorted);
    }
  }
}).export(module);
