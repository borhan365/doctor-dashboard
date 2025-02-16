export class UploadError extends Error {
  constructor(
    message: string,
    public statusCode: number = 400,
    public details?: any
  ) {
    super(message)
    this.name = 'UploadError'
  }
}

export const handleUploadError = (error: unknown) => {
  if (error instanceof UploadError) {
    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.details
      }),
      { status: error.statusCode }
    )
  }

  console.error('Unexpected error:', error)
  return new Response(
    JSON.stringify({ error: 'Internal server error' }),
    { status: 500 }
  )
}