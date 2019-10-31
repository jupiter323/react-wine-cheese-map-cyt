import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
            list: []
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.elements
        });
    }

    componentWillMount() {
        this.setState({
            list: this.props.elements
        });
    }

    handleChange = (e) => {
        if (e.target.value.length < 2) return;
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.state.list;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.data.name.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = [];
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        });

    }

    handleFocus = e=>e.target.select()
    render() {
        return (
            <div className="search-wrapper" >
                <input type="text" className="form-control" id="search" placeholder="&#xf002; Search" onChange={this.handleChange} onFocus={this.handleFocus} />
                <ul>
                    {this.state.filtered && this.state.filtered.map(item => (
                        <li key={item.data.id}>
                            {item.data.name}  &nbsp;
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

}

export default Search