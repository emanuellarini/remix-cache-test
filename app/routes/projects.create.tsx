import {Link, Form as RemixForm, useNavigation, useNavigate, useActionData} from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import TextField from '../components/ui/TextField';
import Button from '../components/ui/Button';
import axiosClient from "../axiosClient";
import Z from 'zod';

const formSchema = Z.object({
  name: Z.string({ required_error: 'Field is required' }).min(3).max(20),
  purchaseOrderNumber: Z.string().max(20),
  jobNumber: Z.string().max(20)
});

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const data = Object.fromEntries(body);

  try {
    formSchema.parse(data);
  } catch (e) {
    const errors = e.issues.reduce((acc, value) => {
      acc[value.path[0]] = value.message;
      return acc;
    }, {});

    return json({ errors});
  }

  await axiosClient.post('/projects', data);

  return redirect('/projects');
}

export default function Page() {
  const navigation = useNavigation();
  const navigate = useNavigate();

  return (
    <Dialog.Root open onOpenChange={() => navigate('/projects')}>
      <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Create a new Project
        </Dialog.Title>

        <Form.Root asChild>
          <RemixForm method="POST">
            <TextField
              name="name"
              label="Name"
              min="3"
              max="20"
              autoFocus
              required
            />

            <TextField
              name="purchaseOrderNumber"
              max="20"
              label="Purchase Order Number"
            />

            <TextField
              name="jobNumber"
              max="20"
              label="Job Number"
            />

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