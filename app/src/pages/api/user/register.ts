import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { Octokit } from '@octokit/core';


// get all cards using prisma
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    // return method not allowed
    res.status(405).json({ error: 'Method not allowed' });
    return
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  // Octokit.js
  // https://github.com/octokit/core.js#readme
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  })

  const userInfo = await octokit.request('GET /users/{username}', {
    username: 'csenet'
  })

  const userId = userInfo.data.id;

  try {
    await octokit.request('POST /orgs/{org}/invitations', {
      org: 'ueckoken',
      invitee_id: userId,
      role: 'direct_member'
    })
  } catch (e: any) {
    res.status(500).json({ error: e.message });
    return;
  }
  res.status(200).json("OK");
  return
}