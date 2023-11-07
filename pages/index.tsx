import Image from 'next/image'
import { Inter } from 'next/font/google'
import JiraComments from '@/components/JiraComments'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const issueId = 'JIRA-123'; // Replace with the actual issue ID

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <JiraComments issueId={issueId} />
    </main>
  )
}