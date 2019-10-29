import React from 'react'

class Information extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        var { data } = this.props
        return (
            <div className={this.props.className}>
                <p class="ac-name">{data.name}</p>
                <p class="ac-node-type"><i class="fa fa-info-circle"></i> {data.NodeTypeFormatted} {data.Type}</p>
                {data.Milk && <p class="ac-milk"><i class="fa fa-angle-double-right"></i> {data.Milk}</p>}
                {data.Country && <p class="ac-country"><i class="fa fa-map-marker"></i> {data.Country}</p>}
                <p class="ac-more">
                    <i class="fa fa-external-link"></i>
                    <a target="_blank" href="https://duckduckgo.com/?q={{name}}">More information</a>
                </p>
            </div>
        )
    }
}

export default Information