var webdriverio = require('webdriverio');
var expect = require('referee').expect;

var peerEl = require('./helpers/peer.js').elems
var config = require('./helpers/config.js')

describe('Home', function () {
	var session = {};
	this.timeout(9000);
	
	before(function() {
		session = webdriverio.remote({desiredCapabilities: {browserName: 'chrome'}});
		session.init();
		session.url(config.url + "#/")
		session.waitForExist(".img-responsive", 5000);
	})

	after(function(done) {
		session.end(done);
	})

	describe('Fields should fill', function() {
		it('should have a peer id', function(done) {
			session.getText('#'+peerEl.PEER_ID, function(err, res) {
				expect(err).toBeFalsy();
				expect(res).toBeString()
				expect(res.length).toBeGreaterThan(3)
			})
			session.call(done)
		})

		it('should have a agent version', function(done) {
			session.getText('#'+peerEl.AGENT_VER, function(err, res) {
				expect(err).toBeFalsy();
				expect(res).toBeString()
				expect(res.length).toBeGreaterThan(0)
			})
			session.call(done)
		})

		it('should have a protocol version', function(done) {
			session.getText('#'+peerEl.PROTO_VER, function(err, res) {
				expect(err).toBeFalsy();
				expect(res).toBeString()
				expect(res.length).toBeGreaterThan(0)
			})
			session.call(done)
		})

		it('should have a public key', function(done) {
			session.getText('#'+peerEl.PUBLIC_KEY, function(err, res) {
				expect(err).toBeFalsy();
				expect(res).toBeString()
				expect(res.length).toBeGreaterThan(0)
			})
			session.call(done)
		})

		it('should have network addresses', function(done) {
			session.elements(peerEl.NET_ADDR_LIST, function(err, res) {
				expect(err).toBeFalsy();
				expect(res.value.length).toBeGreaterThan(0)
			})
			session.call(done)
		})
	})

})
