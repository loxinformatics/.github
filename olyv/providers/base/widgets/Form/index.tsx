"use client";

import { useBase } from "../..";
import type { FormProps, FormStatusProps } from "../../types";

export const FormStatus = ({ success, error, loading }: FormStatusProps) => {
  const { Alert, Spinner } = useBase();
  return (
    <div className="status-messages">
      {success && <Alert status="success">{success}</Alert>}
      {error && <Alert status="error">{error}</Alert>}
      {loading && (
        <div className="loading flex justify-center items-center">
          <Spinner />
          <div className="sr-only">Loading...</div>
        </div>
      )}
    </div>
  );
};

export const Form = ({
  children,
  onSubmit,
  success,
  error,
  loading,
}: FormProps) => {
  const { Btn } = useBase();

  return (
    <form className="mt-12" onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4 px-12">
        <FormStatus success={success} error={error} loading={loading} />

        {children}

        <div className="pb-12">
          <Btn type="submit" className="mt-4" disabled={loading}>
            Submit
          </Btn>
        </div>
      </div>
    </form>
  );
};
