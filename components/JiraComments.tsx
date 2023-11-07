import { useState, useEffect } from 'react';

interface Comment {
  id: string;
  body: string;
  author: {
    displayName: string;
  };
}

const JiraComments = ({ issueId }: { issueId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/jira/comments?issueId=${issueId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.comments) {
          setError('Comments not defined');
          return;
        }
        setComments(data.comments);
      })
      .catch((error) => {
        setError('Failed to fetch comments');
        console.error('Error fetching comments:', error);
      });
  }, [issueId]);

  const handleAddComment = () => {
    fetch('/api/jira/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ issueId, comment: newComment }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.id) {
          setError('Failed to add comment');
          return;
        }
        setComments([...comments, data]);
        setNewComment('');
      })
      .catch((error) => {
        setError('Failed to add comment');
        console.error('Error adding comment:', error);
      });
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.author.displayName}</p>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment}>+</button>
    </div>
  );
};

export default JiraComments;