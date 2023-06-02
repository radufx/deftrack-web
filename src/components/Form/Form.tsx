import { ComponentProps } from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

interface Props<T extends FieldValues> extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

const Form = <T extends FieldValues>({ form, onSubmit, className, children, ...props }: Props<T>) => (
  <FormProvider {...form}>
    <form className="w-full" onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <fieldset className={className}>{children}</fieldset>
    </form>
  </FormProvider>
);

export default Form;
