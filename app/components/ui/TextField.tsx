import * as Form from '@radix-ui/react-form';

type TextFieldProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
  label: string;
  autoFocus?: boolean;
  error?: string;
}

export default function TextField({ name, label, autoFocus, error, ...otherProps }: TextFieldProps) {
  return (
    <Form.Field className="grid mb-[10px]" name={name}>
      <div className="flex items-baseline justify-between">
        <Form.Label
          className={`
            flex
            items-center
            text-[15px] 
            font-medium 
            leading-[35px]
            justify-between
            w-full
            ${!!error && 'text-rose-600'}
          `}
        >
          {label}
          {!otherProps?.required && <span className="text-[13px] opacity-50">Optional</span>}
        </Form.Label>
        {!!error && <Form.Message className="text-[13px] text-opacity-10 text-rose-600">
          {error}
        </Form.Message>}
      </div>
      <Form.Control asChild>
        <input
          className={`
            border-2
            ${error ? 'border-rose-600' : 'border-black'}
            w-full
            bg-white
            inline-flex
            h-[35px]
            appearance-none
            items-center
            justify-center
            rounded-md
            px-[10px]
            text-[15px]
            leading-none
            text-black
          `}
          autoFocus={autoFocus}
          {...otherProps}
        />
      </Form.Control>
    </Form.Field>
  )
}