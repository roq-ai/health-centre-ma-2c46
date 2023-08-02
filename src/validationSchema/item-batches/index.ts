import * as yup from 'yup';

export const itemBatchValidationSchema = yup.object().shape({
  batch_number: yup.string().required(),
  item_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
