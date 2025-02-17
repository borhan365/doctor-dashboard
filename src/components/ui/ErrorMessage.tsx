interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <p className="mt-1 text-sm text-red-500">{message}</p>;
};
