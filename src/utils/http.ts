import { err, ok, Result, result } from 'acd-utils'
import to from 'await-to-js'

async function get<Res, Err>(url: string): Promise<Result<Err, Res>> {
  const [error, data] = await to<Res, Err>(
    fetch(url)
      .then(handleErrors)
      .then(i => i.json())
  )

  return result(error ? err(error) : ok(data as Res))
}

function post<Data, Res>(body: Data) {
  /* eslint-disable-next-line no-undef */
  const headers = new Headers({
    'Content-type': 'application/json; charset=UTF-8',
  })

  return (url: string): Promise<Res> =>
    fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then(handleErrors)
      .then(i => i.json())
}

// utils
// see: https://bit.ly/2JVfEgv
function handleErrors<Err>(res: Response) {
  if (!res.ok)
    /* eslint-disable-next-line prefer-promise-reject-errors */
    return Promise.reject(res as unknown as Err)
  else return Promise.resolve(res)
}

export { get, post }
