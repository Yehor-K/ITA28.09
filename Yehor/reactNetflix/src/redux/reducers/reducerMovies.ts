import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IMovie from "../../interfaces/IMovie";

interface IState {
  status: string;
  movies: IMovie[];
  offset: number
}
const moviesDefaultState: IState = {

  status: "",
  movies: [],
  offset: 0,
};


export interface ILoadData {
  sortBy?: string;
  searchBy?: string;
  search?: string;
  offset?: number
}

export interface IReceivedData {
  status: string;
  movies: IMovie[];
}
export interface IError {
  status: string;
}

  const moviesSlice = createSlice({
    name: 'movies',
    initialState: moviesDefaultState,
    reducers: {
      loadData(state:IState, action:PayloadAction<ILoadData>){
        state = state
      },
      moviesReceived(state:IState,action:PayloadAction<IReceivedData>){
        state.status=action.payload.status;
        state.movies= action.payload.movies;
      },
      error(state:IState, action:PayloadAction<IError>){
        state.status=action.payload.status;
      },
      dataOffsetIncrement(state:IState){
        state.offset = state.movies.length < 9 ? state.offset: state.offset + 9
      },
      dataOffsetDecrement(state:IState){
        state.offset = state.offset < 9 ? state.offset: state.offset - 9
      }
      }
  })
  export const {loadData, moviesReceived, error, dataOffsetIncrement, dataOffsetDecrement} = moviesSlice.actions

  // export const {moviesRequested,moviesRecieved,moviesFailed,selectedMovieRequested,selectedMovieRecieved,selectedMovieFailed,loadData,mergeData} = moviesSlice.actions;
//  const { reducer } = moviesSlice;
 export const reducerMovies = moviesSlice.reducer
