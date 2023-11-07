import type { NextApiRequest, NextApiResponse } from 'next'

// Replace with your Jira domain and credentials
const JIRA_DOMAIN = 'your-domain.atlassian.net';
const JIRA_EMAIL = 'your-email@example.com';
const JIRA_API_TOKEN = 'your-api-token';

async function getComments(issueId: string) {
  const response = await fetch(`https://${JIRA_DOMAIN}/rest/api/3/issue/${issueId}/comment`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64')}`,
      'Accept': 'application/json'
    }
  });
  return response.json();
}

async function addComment(issueId: string, body: string) {
  const response = await fetch(`https://${JIRA_DOMAIN}/rest/api/3/issue/${issueId}/comment`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ body })
  });
  return response.json();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { issueId, comment } = req.body;

  if (req.method === 'GET') {
    const comments = await getComments(issueId);
    res.status(200).json(comments);
  } else if (req.method === 'POST' && comment) {
    const newComment = await addComment(issueId, comment);
    res.status(201).json(newComment);
  } else {
    res.status(405).end();
  }
}