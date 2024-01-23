import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    await anecdoteService.createNew(e.target.anecdote.value);
    dispatch(createAnecdote({ anecdote: e.target.anecdote.value }));
    dispatch(setNotification(`created anecdote '${e.target.anecdote.value}'`));
    setTimeout(() => dispatch(removeNotification()), 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
