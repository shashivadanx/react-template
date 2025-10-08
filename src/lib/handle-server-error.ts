import { AxiosError } from 'axios'

export function handleServerError(error: unknown) {
  console.log(error)

  let errMsg = 'Something went wrong!'

  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    Number(error.status) === 204
  ) {
    errMsg = 'Content not found.'
  }

  if (error instanceof AxiosError) {
    errMsg = error.response?.data.title
  }

  // TODO: Review this
  console.log(errMsg)
  // toast({ variant: 'destructive', content: errMsg })
}
