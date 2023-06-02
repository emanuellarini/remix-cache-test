import * as Form from '@radix-ui/react-form';
import {useActionData} from "@remix-run/react";

type TextFieldProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
  label: string;
  autoFocus?: boolean;
}

export default function TextField({ name, label, autoFocus, ...otherProps }: TextFieldProps) {
  const data = useActionData();

  return (
    <Form.Field className="grid mb-[10px]" name={name}>
      <div className="flex items-baseline justify-between">
        <Form.Label
          className={`
            text-[15px] 
            font-medium 
            leading-[35px] 
            ${data?.errors[name] && 'text-rose-600'}
          `}
          >{label}</Form.Label>
        {data?.errors[name] && <Form.Message className="text-[13px] text-rose-600">
          {data.errors[name]}
        </Form.Message>}
      </div>
      <Form.Control asChild>
        <input
          className={`
            border-2
            ${data?.errors[name] ?  'border-rose-600' : 'border-black'}
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