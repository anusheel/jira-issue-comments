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

  useEffect(() => {
    fetch(`/api/jira/comments?issueId=${issueId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
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
        setComments([...comments, data]);
        setNewComment('');
      });
  };

  return (
    <div>
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