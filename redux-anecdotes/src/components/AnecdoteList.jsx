import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useSelector, useDispatch } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return [...state.anecdotes]
      .filter((a) =>
        a.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();

  const anecdoteVote = async (anecdote) => {
    dispatch(addVote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => anecdoteVote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
