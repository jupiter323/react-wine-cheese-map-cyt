import React from 'react'

const Information = (props) => {

    var { data, className } = props
    return (
        <div className={className}>
            <p className="ac-name">{data.name}</p>
            <p className="ac-node-type"> {data.NodeTypeFormatted} {data.Type}</p>
            {data.Milk && <p className="ac-milk">{data.Milk}</p>}
            {data.Country && <p className="ac-country"> {data.Country}</p>}
            <p className="ac-more">
                <a target="_blank" href={`https://duckduckgo.com/?q=${data.name}`}>More information</a>
            </p>
        </div>
    )

}

export default Information