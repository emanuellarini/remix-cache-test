import {Link, Form as RemixForm, useNavigation, useNavigate, useActionData} from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import Button from '../components/ui/Button';
import axiosClient from "../axiosClient";
import {storeValidationSchema} from "../components/Projects/validationSchemas";
import FormFields from "../components/Projects/FormFields";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const data = Object.fromEntries(body);

  try {
    storeValidationSchema.parse(data);
  } catch (e) {
    const errors = e.issues.reduce((acc, value) => {
      acc[value.path[0]] = value.message;
      return acc;
    }, {});

    return json({ errors });
  }

  await axiosClient.post('/projects', data);

  return redirect('/projects');
}

export default function Page() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const data = useActionData();

  console.log(data)

  return (
    <Dialog.Root open onOpenChange={() => navigate('/projects')}>
      <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Create a new Project
        </Dialog.Title>

        <Form.Root asChild>
          <RemixForm method="POST">
            <FormFields errors={data?.errors}  />

            <div className="flex align-items justify-end mt-6">
              <Button type="submit" className="mr-1">
                {navigation.state === "submitting"
                  ? "Creating..."
                  : "Create"}
              </Button>
              <Dialog.Close asChild>
                <Button asChild aria-label="Close">
                  <Link to="/projects">Close</Link>
                </Button >
              </Dialog.Close>
            </div>
          </RemixForm>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
}