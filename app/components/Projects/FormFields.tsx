import TextField from "../ui/TextField";

export default function FormFields({ project, errors }: { project?: Project, errors?: {[k in keyof Project]: string} }) {
  return (
    <>
      <TextField
        name="name"
        label="Name"
        autoFocus
        defaultValue={project?.name}
        required
        error={errors?.name}
      />

      <TextField
        name="purchaseOrderNumber"
        title="please enter number only"
        label="Purchase Order Number"
        defaultValue={project?.purchaseOrderNumber}
        type="number"
        error={errors?.purchaseOrderNumber}
      />

      <TextField
        name="jobNumber"
        title="please enter number only"
        label="Job Number"
        defaultValue={project?.jobNumber}
        error={errors?.jobNumber}
        type="number"
      />
    </>
  )
}