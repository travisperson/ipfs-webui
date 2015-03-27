var React = require('react')
var Router = require('react-router')
var Nav = require('../views/nav.jsx')
var Object = require('../views/object.jsx')
var multihash = require('multihashes')
var base58 = require('bs58');

var objectsEl = require('../../test/helpers/dag.js').elems

module.exports = React.createClass({
  mixins: [ Router.State ],

  componentDidMount: function() {
    window.addEventListener('hashchange', this.handleHashChange)
  },

  componentWillUnmount: function() {
    window.removeEventListener('hashchange', this.handleHashChange)
  },

  getInitialState: function() {
    var hash = window.location.hash.substr('/objects'.length+1)
    hash = (hash || '').replace(/[\\]/g, '/')
    if(hash.split('/')[0].length === 0) hash = hash.slice(1)
    if(hash) this.getObject(hash)

    return { object: null, hash: hash, hashInput: hash, valid: false }
  },

  handleHashChange: function() {
    console.log('handleHashChange: ' + this.state.hash + ' ' + window.location.hash)
    var hash = window.location.hash
    if(!/^#\/objects/.test(hash)) return
    hash = hash.substring('#/objects'.length+1).replace(/\\/g, '/')
    this.setState({ hash: hash, hashInput: hash })
    this.getObject(hash)
  },

  handleBack: function(e) {
    var hash = this.state.hash
    var slashIndex = hash.lastIndexOf('/')
    if(slashIndex === -1) return
    hash = hash.substr(0, slashIndex)
    this.setState({ hash: hash })
    this.getObject(hash)
  },

  getObject: function(path) {
    console.log('getObject:', path)

    if(path[0] === '/' && !/^\/ip[fn]s\//.test(path)) {
      path = path.slice(1)
      this.setState({ hash: path })
    }

    var t = this
    t.props.ipfs.object.get(path, function(err, res) {
      if(err) return console.error(err)

      path = path.replace(/[\/]/g, '\\')
      var hash = '#/objects/' + path
      window.location = hash
      t.setState({ object: res })
    })
  },

  updateHash: function(e) {
    var path = $(e.target).val().trim()
    var hash = path.split('/')[0];
    var isValid = true
    try {
      var buff = base58.decode(hash)
      var buf  = new Buffer(buff)
      var mh = multihash.decode(buf)
    } catch(e) {
      isValid = false
    }
    this.setState({ hashInput: path, valid: isValid })
  },

  update: function(e) {
    if(e.which && e.which !== 13) return
    this.setState({ hash: this.state.hashInput })
    if(this.state.hashInput) this.getObject(this.state.hashInput)
  },

  render: function() {
    var object = this.state.object ? Object({
      object: this.state.object,
      handleBack: this.handleBack,
      path: this.state.hash,
      gateway: this.props.gateway
    }) : null

	var fieldValid = "";

	if(this.state.hashInput.length > 0) {
		fieldValid = this.state.valid ? "valid" : "invalid"
	}
    return (
      <div className="row">
        <div className="col-sm-10 col-sm-offset-1 webui-dag">
          <div className="row">
            <h4>Enter hash or path</h4>
            <div className="path row">
              <div className="col-xs-11">
                <input type="text" id={objectsEl.HASH_INPUT} className={"form-control input-lg " + fieldValid } onChange={this.updateHash} onKeyPress={this.update} value={this.state.hashInput} placeholder="Enter hash or path: /ipfs/QmBpath..."/>
              </div>
              <button className="btn btn-primary go col-xs-1" onClick={this.update}>GO</button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              {object}
            </div>
          </div>
        </div>
      </div>
    )
  }
})
