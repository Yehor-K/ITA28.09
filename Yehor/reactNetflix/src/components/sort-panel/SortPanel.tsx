import React from "react";
import "./SortPanel.css";
import Button from "../button";
import { parse } from "query-string";
import * as History from "history";

interface ISortPanelProps {
  moviesLength: number;
  handlerSortChange(sortBy: string): void;
  location: History.Location;
}
interface ISortPanelState {
  sortBy: SortBy;
}
enum SortBy {
  Date = "release_date",
  Rating = "vote_average",
}

class SortPanel extends React.Component<ISortPanelProps, ISortPanelState> {
  state = {
    sortBy: SortBy.Date,
  };

  componentDidMount() {
    const querySrch = parse(this.props.location.search) as { sortBy: string };
    this.checkSetSortby(querySrch.sortBy)
  }
  componentDidUpdate(prevProps: ISortPanelProps) {
    if (this.props.location !== prevProps.location) {
      const querySrch = parse(this.props.location.search) as { sortBy: string };
      this.checkSetSortby(querySrch.sortBy)
      }
    }

  checkSetSortby = (sortByvalue: string) => {
    this.setState({
      sortBy: sortByvalue === SortBy.Rating ? SortBy.Rating: SortBy.Date
    })
  }

  sortByDate = () => {
    this.setState({
      sortBy: SortBy.Date,
    });
    this.props.handlerSortChange(SortBy.Date);
  };
  sortByRate = () => {
    this.setState({
      sortBy: SortBy.Rating,
    });
    this.props.handlerSortChange(SortBy.Rating);
  };


  render() {
    const { moviesLength } = this.props;
    return (
      <div className="sort-panel">
        <div className="amount">{moviesLength} movies found</div>
        <div className="sort">
          <p>Sort by</p>
          <Button
            content={"release date"}
            styleClass={this.state.sortBy === SortBy.Date ? "on" : "off"}
            handler={this.sortByDate}
          />
          <Button
            content={"rating"}
            styleClass={this.state.sortBy === SortBy.Rating ? "on" : "off"}
            handler={this.sortByRate}
          />
        </div>
      </div>
    );
  }
}

export default SortPanel;
