import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Container, Form } from 'react-bootstrap';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession();

  const handleSubmit = async () => {
    const response = await fetch('/api/user/register', {
      method: 'POST',
      body: JSON.stringify({ username: username }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const jsonData = await response.json();
    if (response.status == 200) {
      alert('招待しました')
    } else {
      alert('招待に失敗しました\n' + jsonData.error)
    }
  }

  const [username, setUsername] = useState('');

  return (
    <>
      <Container className="pt-3">
        <h1>Github 招待</h1>
        <p>統合認証を用いて認証することでKoken Github Organizationに自動的に招待します。</p>
        {!session &&
          <b>右上からログインしてください</b>
        }
        {(session) &&
          <>
            <Form>
              <Form.Group controlId="username">
                <Form.Label>Github Username</Form.Label><br />
                <small>GithubのProfileのhttps://github.com/****の****の部分です</small>
                <Form.Control
                  type="text"
                  placeholder="Githubのユーザ名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  size="lg"
                />
              </Form.Group>
              <Button variant="primary" onClick={handleSubmit}>
                登録
              </Button>
            </Form>
          </>
        }
      </Container>
    </>
  )
}
