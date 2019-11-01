import React from 'react'

class Information extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        var { data, className } = this.props
        return (
            <div className={className}>
                <p className="ac-name">{data.name}</p>
                <p className="ac-node-type"><i className="fa fa-info-circle"></i> {data.NodeTypeFormatted} {data.Type}</p>
                {data.Milk && <p className="ac-milk"><i className="fa fa-angle-double-right"></i> {data.Milk}</p>}
                {data.Country && <p className="ac-country"><i className="fa fa-map-marker"></i> {data.Country}</p>}
                <p className="ac-more">
                    <i className="fa fa-external-link"></i>
                    <a target="_blank" href="https://duckduckgo.com/?q={{name}}">More information</a>
                </p>
            </div>
        )
    }
}

export default Information