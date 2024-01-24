import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import {
  setNotification,
  useNotificationDispatch,
} from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({ mutationFn: createAnecdote });
  const notificationDispatch = useNotificationDispatch();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    newAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onSuccess: (newAnecdote) => {
          const anecdotes = queryClient.getQueryData(["anecdotes"]);
          queryClient.setQueryData(
            ["anecdotes"],
            anecdotes.concat(newAnecdote)
          );
          setNotification(
            notificationDispatch,
            `new anecdote '${newAnecdote.content}`,
            5
          );
        },
        onError: (err) => {
          setNotification(notificationDispatch, err.message, 5);
        },
      }
    );
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
