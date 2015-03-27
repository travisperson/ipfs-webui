var webdriverio = require('webdriverio');
var expect = require('referee').expect;

var dagEl = require('./helpers/dag.js').elems
var config = require('./helpers/config.js')

describe('DAG', function () {
	var session = {};
	this.timeout(9000);
	
	before(function() {
		session = webdriverio.remote({desiredCapabilities: {browserName: 'chrome'}});
		session.init();
		session.url(config.url + "#/objects")
		session.waitForExist(".img-responsive", 5000);
	})

	after(function(done) {
		session.end(done);
	})

	describe('Request object', function() {
		it('should search', function(done) {
			session.setValue('#'+dagEl.HASH_INPUT, "asd")
			session.getValue('#'+dagEl.HASH_INPUT, function(err, res) {
				expect(res).toBe("asd")
			})
			session.call(done)
		})
	})
})
