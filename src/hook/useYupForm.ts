import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type * as yup from "yup";

interface UseYupFormOptions<T extends yup.AnyObjectSchema> {
  schema: T;
  defaultValues?: Partial<yup.InferType<T>> | null;
  onSubmit: (values: yup.InferType<T>) => void | Promise<void>;
}

export function useYupForm<T extends yup.AnyObjectSchema>({
  schema,
  defaultValues,
  onSubmit,
}: UseYupFormOptions<T>) {
  type FormValues = yup.InferType<T>;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema) as any,
    defaultValues: (defaultValues ?? {}) as FormValues,
  });

  const submit = handleSubmit(async (values) => {
    await onSubmit(values);
    reset();
  });

  const getError = (fieldName: keyof FormValues): string | undefined => {
    const err = errors[fieldName as string];
    return err?.message as string | undefined;
  };
  const setFieldError = (fieldName: keyof FormValues, message: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setError(fieldName as any, { type: "manual", message });
  };

  const clearError = (fieldName?: keyof FormValues) => {
    if (fieldName) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      clearErrors(fieldName as any);
    } else {
      clearErrors();
    }
  };

  return {
    register,
    watch,
    setValue,
    getValues,
    errors,
    isSubmitting,

    // Convenience
    handleSubmit: submit,
    reset,
    getError,
    setError: setFieldError,
    clearError,
  };
}
