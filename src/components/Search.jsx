import React from 'react';
import Information from './Information';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
        }
    }


    componentWillReceiveProps(nextProps) {
        // this.setState({
        //     list: nextProps.elements
        // });
    }

    componentDidMount() {
        this.setState({
            list: this.props.allNodes
        });
    }

    handleChange = (e) => {

        if (e.target.value.length < 2 || !this.props.allNodes) {
            this.setState({
                filtered: []
            })
            return;
        }

        this.props.searchListShowSet(true)
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];


        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.props.allNodes;

            var query = e.target.value.toLowerCase();


            function matches(str, q) {
                str = (str || '').toLowerCase();
                q = (q || '').toLowerCase();

                return str.match(q);
            }

            var fields = ['name', 'NodeType', 'Country', 'Type', 'Milk'];

            function anyFieldMatches(n) {
                for (var i = 0; i < fields.length; i++) {
                    var f = fields[i];

                    if (matches(n.data(f), query)) {
                        return true;
                    }
                }

                return false;
            }

            function getData(n) {
                var data = n.data();
                return data;
            }

            function sortByName(n1, n2) {
                if (n1.data('name') < n2.data('name')) {
                    return -1;
                } else if (n1.data('name') > n2.data('name')) {
                    return 1;
                }

                return 0;
            }

            newList = this.props.allNodes.stdFilter(anyFieldMatches).sort(sortByName).map(getData);


        } else {
            // If the search bar is empty, set newList to original task list
            newList = [];
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        });

    }

    handleFocus = e => e.target.select()


    render() {
        return (
            <>
                <div className="search-wrapper" >
                    <input type="text" className="form-control" id="search" placeholder="&#xf002; Search" onChange={this.handleChange} onFocus={this.handleFocus} />
                    {this.state.filtered.length != 0 && this.props.searchListShow && <div className={"information-wrapper"}>
                        {this.state.filtered.map(item => (
                            <div key={item.id} className={"information"} onClick={() => this.props.handleCickInformation(item.id)}>
                                <Information data={item} />
                            </div>
                        ))}
                    </div>}
                </div>

            </>
        )
    }

}

export default Search