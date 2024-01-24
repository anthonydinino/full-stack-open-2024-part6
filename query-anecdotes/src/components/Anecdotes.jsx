import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "../requests";
import {
  useNotificationDispatch,
  setNotification,
} from "../NotificationContext";

const Anecdotes = () => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({ mutationFn: updateAnecdote });
  const notificationDispatch = useNotificationDispatch();

  const handleVote = (anecdote) => {
    newAnecdoteMutation.mutate(
      { ...anecdote, votes: anecdote.votes + 1 },
      {
        onSuccess: (anecdote) => {
          const anecdotes = queryClient.getQueryData(["anecdotes"]);
          queryClient.setQueryData(
            ["anecdotes"],
            anecdotes.map((a) => (a.id === anecdote.id ? anecdote : a))
          );
          setNotification(
            notificationDispatch,
            `anecdote '${anecdote.content}' voted`,
            5
          );
        },
      }
    );
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default Anecdotes;
