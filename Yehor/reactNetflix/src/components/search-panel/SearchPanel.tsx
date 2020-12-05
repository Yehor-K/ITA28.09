import React from "react";
import "./SearchPanel.css";
import Button from "../button";
import { parse } from "query-string";
import * as History from "history";

interface ISearchPanelState {
  value: string;
  searchBy: SearchBy;
}
interface IhandleSearchChangeProps {
  handleSearchChange({
    search,
    searchBy,
  }: {
    search: string;
    searchBy: string;
  }): void;
  location: History.Location;
}
enum SearchBy {
  Title = "title",
  Genre = "genres",
}

class SearchPanel extends React.Component<IhandleSearchChangeProps, ISearchPanelState> {
  state: ISearchPanelState = {
    value: "",
    searchBy: SearchBy.Title,
  };

  componentDidMount() {
    const querySrch = parse(this.props.location.search) as {
      searchBy: string;
      search: string;
    };
    const { searchBy, search } = querySrch;
    this.checkSetSearchSearchBy(searchBy, search)
  }

  componentDidUpdate(prevProps: IhandleSearchChangeProps) {
    if (this.props.location !== prevProps.location) {
      const querySrch = parse(this.props.location.search) as {
        searchBy: string;
        search: string;
      };
      const { searchBy, search } = querySrch;
      this.checkSetSearchSearchBy(searchBy, search)
    }
  }

  checkSetSearchSearchBy = (searchByValue: string, searchValue: string) => {
    this.setState({
      searchBy: searchByValue === SearchBy.Genre ? SearchBy.Genre: SearchBy.Title,
      value: searchValue || ""
    })
  }

  searchByTitle = () => {
    if (this.state.searchBy === SearchBy.Genre) {
      this.setState({
        value: "",
        searchBy: SearchBy.Title,
      });
    }
  };
  searchByGenre = () => {
    if (this.state.searchBy === SearchBy.Title) {
      this.setState({
        value: "",
        searchBy: SearchBy.Genre,
      });
    }
  };
  handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value,
    });
  };
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.handleSearchChange({
      search: this.state.value,
      searchBy: this.state.searchBy,
    });
  };

  render() {
    return (
      <div className="search-panel">
        <h1 className="search-title">Find your film</h1>
        <div className="search">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.value}
              placeholder=" type to search"
              onChange={this.handleChangeInput}
            />
            <Button content={"Search"} styleClass={"on"} />
          </form>
        </div>
        <div className="btn-row">
          <div className="search-filter">
            <p>Search by</p>
            <Button
              content={"title"}
              styleClass={this.state.searchBy === SearchBy.Title ? "on" : "off"}
              handler={this.searchByTitle}
            />
            <Button
              content={"genre"}
              styleClass={this.state.searchBy === SearchBy.Genre ? "on" : "off"}
              handler={this.searchByGenre}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPanel;
