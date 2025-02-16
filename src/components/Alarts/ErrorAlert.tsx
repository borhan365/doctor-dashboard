import React from 'react'

function ErrorAlert({ message, error, retryAction }: { message: string, error: Error, retryAction: () => void }) {
  return (
    <div>ErrorAlert</div>
  )
}

export default ErrorAlert