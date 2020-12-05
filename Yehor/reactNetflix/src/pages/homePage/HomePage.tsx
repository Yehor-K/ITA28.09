import React from "react";
import "./HomePage.css"
import Header from "../../components/header";
import SearchPanel from "../../components/search-panel";
import SortPanel from "../../components/sort-panel";
import MoviesList from "../../components/moviesList";
import Footer from "../../components/footer";
import ErrorBlock from "../../components/errorBlock";
import { RouteComponentProps } from "react-router-dom";
import { stringify, parse } from "query-string";
import {
  loadData,
  dataOffsetIncrement,
  dataOffsetDecrement,
} from "../../redux/actions/moviesActions";
import { connect, ConnectedProps } from "react-redux";
import IReduxState from "../../interfaces/IReduxState"

const mapStateToProps = (state: IReduxState) => {
  return {
    movies: state.movies.movies,
    offset: state.movies.offset
  };
};

const mapDispatchToProps = {
  loadData,
  dataOffsetIncrement,
  dataOffsetDecrement
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps;

class HomePage extends React.Component<PropsFromRedux, {}> {
  componentDidMount() {
    this.parseLoadData()
  }

  componentDidUpdate = (prevProps: PropsFromRedux) => {
    if (this.props.location !== prevProps.location  || this.props.offset !== prevProps.offset) {
      this.parseLoadData()
    }
  };

  parseLoadData = () => {
    const queryUrl = parse(this.props.location.search) as {
      searchBy: string;
      search: string;
      sortBy: string;
    };
    const { sortBy, searchBy, search } = queryUrl;
    this.props.loadData("movie is loading", sortBy, searchBy, search, this.props.offset);
  }

  handleSearchChange = ({
    search,
    searchBy,
  }: {
    search: string;
    searchBy: string;
  }) => {
    const query = stringify({ search, searchBy });
    this.props.history.push({
      pathname: "/search/",
      search: query,
    });
  };

  handleSortChange = (sortBy: string) => {
    const querySrch = parse(this.props.location.search) as {
      searchby: string;
      search: string;
    };
    const query = stringify({ ...querySrch, sortBy });
    this.props.history.push({
      pathname: "/search/",
      search: query,
    });
  };

  render() {
    return (
      <>
        <div className="wrapper">
          <div className="blur">
            <div className="top-container">
              <Header />
              <SearchPanel
                location={this.props.location}
                handleSearchChange={this.handleSearchChange}
              />
            </div>
          </div>
        </div>
        <div className="sort-wrapper">
          <div className="top-container">
            <SortPanel
              location={this.props.location}
              moviesLength={this.props.movies.length}
              handlerSortChange={this.handleSortChange}
            />
          </div>
        </div>
        <div className="main-container">
        {this.props.movies.length === 0 ? <ErrorBlock />: 
        <>
          <MoviesList movies={this.props.movies} />
          <div className="pagination">
            <button onClick={this.props.dataOffsetDecrement}>Back</button>
              <span className="pages">{this.props.offset? this.props.offset / 9 + 1: 1}</span>
            <button onClick={this.props.dataOffsetIncrement}>Next</button>
        </div>
        </>
        }
        </div>
        <div className="wrapper-footer">
          <div className="main-container">
            <Footer />
          </div>
        </div>
      </>
    );
  }
}
export default connector(HomePage);

