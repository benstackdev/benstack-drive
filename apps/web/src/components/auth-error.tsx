function AuthError({ errorMessage }: { errorMessage: string; }) {
  return (
    <div className={`text-red-500 text-md mb-4`}>
      Error: {errorMessage}
    </div>
  );
}

export default AuthError;