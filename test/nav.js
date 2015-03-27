var webdriverio = require('webdriverio');
var expect = require('referee').expect;

var navEl = require('./helpers/navigation.js').elems
var config = require('./helpers/config.js')

describe('Navigation links should be present and functioning', function () {
	var session = {};
	this.timeout(9000);
	
	before(function() {
		session = webdriverio.remote({desiredCapabilities: {browserName: 'chrome'}});
		session.init();
		session.url(config.url)
		session.waitForExist(".img-responsive", 5000);
	})

	after(function(done) {
		session.end(done);
	})

	afterEach(function() {
		session.url(config.url)
		session.waitForExist(".img-responsive", 5000);
	})

	describe('Home', function () {
		it('should be present', function(done) {
			session.isExisting("#"+navEl.HOME, function(err, vis) {
				expect(err).toBeFalsy();
				expect(vis).toBe(true);
			})
			session.isVisible("#"+navEl.HOME, function(err, vis) {
				expect(err).toBeFalsy();
				expect(vis).toBe(true);
			})
			session.call(done)
		})

		it('should direct us to home', function(done) {
			session.click("#"+navEl.HOME);
			session.execute(function() {
				return window.location.hash
			}, function(err, res) {
				expect(err).toBeFalsy();
				expect(res.value).toBe("#/")
			})
			session.call(done);
		})
	})

	describe('Connections', function () {
		it('should be present', function(done) {
			session.isExisting("#"+navEl.CONNS, function(err, vis) {
				expect(err).toBeFalsy();
				expect(vis).toBe(true);
			})
			session.isVisible("#"+navEl.CONNS, function(err, vis) {
				expect(err).toBeFalsy();
				expect(vis).toBe(true);
			})
			session.call(done)
		})

		it('should direct us to connections', function(done) {
			session.click("#"+navEl.CONNS);
			session.execute(function() {
				return window.location.hash
			}, function(err, res) {
				expect(err).toBeFalsy();
				expect(res.value).toBe("#/connections")
			})
			session.call(done);
		})
	})

	describe('Files', function () {
		it('should be present', function(done) {
			session.isExisting("#"+navEl.FILES, function(err, vis) {
				expect(err).toBeFalsy();
				expect(vis).toBe(true);
			})
			session.isVisible("#"+navEl.FILES, function(err, vis) {
				expect(err).toBeFalsy();
				expect(vis).toBe(true);
			})
			session.call(done)
		})

		it('should direct us to files', function(done) {
			session.click("#"+navEl.FILES);
			session.execute(function() {
				return window.location.hash
			}, function(err, res) {
				expect(err).toBeFalsy();
				expect(res.value).toBe("#/files")
			})
			session.call(done);
		})
	})

	describe('DAG', function () {
		it('should be present', function(done) {
			session.isExisting("#"+navEl.DAG, function(err, vis) {
				expect(err).toBeFalsy();
				expect(vis).toBe(true);
			})
			session.isVisible("#"+navEl.DAG, function(err, vis) {
				expect(err).toBeFalsy();
				expect(vis).toBe(true);
			})
			session.call(done)
		})

		it('should direct us to objects', function(done) {
			session.click("#"+navEl.DAG);
			session.execute(function() {
				return window.location.hash
			}, function(err, res) {
				expect(err).toBeFalsy();
				expect(res.value).toBe("#/objects")
			})
			session.call(done);
		})
	})
	describe('Config', function () {
		it('should be present', function(done) {
			session.isExisting("#"+navEl.CONFIG, function(err, vis) {
				expect(err).toBeFalsy();
				expect(vis).toBe(true);
			})
			session.isVisible("#"+navEl.CONFIG, function(err, vis) {
				expect(err).toBeFalsy();
				expect(vis).toBe(true);
			})
			session.call(done)
		})

		it('should direct us to config', function(done) {
			session.click("#"+navEl.CONFIG);
			session.execute(function() {
				return window.location.hash
			}, function(err, res) {
				expect(err).toBeFalsy();
				expect(res.value).toBe("#/config")
			})
			session.call(done);
		})
	})

	describe('Logs', function () {
		it('should be present', function(done) {
			session.isExisting("#"+navEl.LOGS, function(err, vis) {
				expect(err).toBeFalsy();
				expect(vis).toBe(true);
			})
			session.isVisible("#"+navEl.LOGS, function(err, vis) {
				expect(err).toBeFalsy();
				expect(vis).toBe(true);
			})
			session.call(done)
		})

		it('should direct us to logs', function(done) {
			session.click("#"+navEl.LOGS);
			session.execute(function() {
				return window.location.hash
			}, function(err, res) {
				expect(err).toBeFalsy();
				expect(res.value).toBe("#/logs")
			})
			session.call(done);
		})
	})
})
