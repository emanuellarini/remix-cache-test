import Z from "zod";

export const storeValidationSchema = Z.object({
  name: Z.string({ required_error: 'Field is required' }).min(3).max(20),
  purchaseOrderNumber: Z.preprocess((val) => Number(val), Z.number()).optional(),
  jobNumber: Z.preprocess((val) => Number(val), Z.number()).optional()
});
