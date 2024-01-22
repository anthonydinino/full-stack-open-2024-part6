import { vote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return [...state.anecdotes].sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => dispatch(vote({ id: anecdote.id }))}>
          vote
        </button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
