import { MainLayout } from 'components/layouts/main'
import { User } from 'models/user'
import { GetStaticProps } from 'next'
import { RenderUsers } from 'pagesContent/users'
import * as React from 'react'
import { constant, identity } from 'utils/function'
import { get } from 'utils/http'

type Props = {
  fetchedUsers: User[]
}

export default function Users({ fetchedUsers }: Props) {
  return (
    <MainLayout title="users">
      <RenderUsers users={fetchedUsers} />
    </MainLayout>
  )
}

// Next.js API

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Partial<Props>
}> => {
  return {
    props: {
      fetchedUsers: await (
        await get<User[], {}>('https://jsonplaceholder.typicode.com/users')
      ).fold(constant([]), identity)
    }
  }
}