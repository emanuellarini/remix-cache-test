import {
  Link,
  useNavigation,
  useNavigate,
  useLoaderData,
  useLocation,
  useParams,
  useFetcher
} from "@remix-run/react";
import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import Button from '../ui/Button';
import FormFields from "./FormFields";

export default function EditDialog() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const project = useLoaderData();
  const location = useLocation();
  const { projectId } = useParams();
  const fetcher = useFetcher();

  return (
    <Dialog.Root open onOpenChange={() => navigate(location.pathname)}>
      <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Edit Project
        </Dialog.Title>

        <Form.Root asChild>
          <fetcher.Form method="POST" action={`/projects/${projectId}`}>
            <FormFields errors={fetcher?.data?.errors} project={project} />

            <div className="flex align-items justify-end mt-6">
              <Button type="submit" className="mr-1">
                {navigation.state === "submitting"
                  ? "Saving..."
                  : "Save"}
              </Button>
              <Dialog.Close asChild>
                <Button asChild aria-label="Close">
                  <Link to={location.pathname}>Close</Link>
                </Button >
              </Dialog.Close>
            </div>
          </fetcher.Form>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
}
