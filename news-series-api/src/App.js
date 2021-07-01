import React, { Component } from "react";
import "./App.css";

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Fazlul",
    num_commemts: 4,
    points: 3,
    objectID: 0
  },

  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Karim",
    num_commemts: 5,
    points: 2,
    objectID: 1
  }
];

const largeCol = {
  width: "40%"
};

const mediumCol = {
  width: "30%"
};

const smallCol = {
  width: "10%"
};
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: ""
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }
  onDismiss(id) {
    const isNotid = item => item.objectID !== id;
    const updateList = this.state.list.filter(isNotid);
    this.setState({ list: updateList });
  }

  render() {
    const { list, searchTerm } = this.state;
    return (
      <div className="page">
        <div className="interaction">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => {
  return (
    <form>
      {children}
      <input
        type="text"
        value={value}
        placeholder="please search here"
        onChange={onChange}
      />
    </form>
  );
};

const Table = ({ list, pattern, onDismiss }) => {
  return (
    <div className="table">
      {list.filter(isSearched(pattern)).map(item => (
        <div key={item.objectID} className="table-row">
          <span style={largeCol}>
            <a href={item.title}>{item.title}</a>
          </span>
          <span style={mediumCol}>{item.author}</span>
          <span style={smallCol}>{item.num_commemts}</span>
          <span style={smallCol}>{item.points}</span>
          <span style={smallCol}>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};

const Button = ({ onClick, children, className = "btn-primary" }) => {
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default App;
