var React = require('react')
var Link = require('react-router').Link

var navEl = require('../../test/helpers/navigation.js').elems

module.exports = React.createClass({

  render: function() {
    return (
      <div className="row">
        <ul id="side" className="nav nav-sidebar">
          <li className="active">
            <Link id={navEl.HOME} className="link" to="home">
              <span className="icon fa fa-dot-circle-o" aria-hidden="true"></span> Home
            </Link>
          </li>
          <li>
            <Link id={navEl.CONNS} className="link" to="connections">
              <span className="icon fa fa-globe" aria-hidden="true"></span> Connections
            </Link>
          </li>
          <li>
            <Link id={navEl.FILES} className="link" to="files">
              <span className="icon fa fa-file" aria-hidden="true"></span> Files
            </Link>
          </li>
          <li>
            <Link id={navEl.DAG} className="link" to="objects">
              <span className="icon fa fa-list-alt" aria-hidden="true"></span> DAG
            </Link>
          </li>
          <li>
            <Link id={navEl.CONFIG} className="link" to="config">
              <span className="icon fa fa-cog" aria-hidden="true"></span> Config
            </Link>
          </li>
          <li>
            <Link id={navEl.LOGS} className="link" to="logs">
              <span className="icon fa fa-list" aria-hidden="true"></span> Logs
            </Link>
          </li>
        </ul>
      </div>
    )
  }
})
