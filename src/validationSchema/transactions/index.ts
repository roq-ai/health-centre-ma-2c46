import * as yup from 'yup';

export const transactionValidationSchema = yup.object().shape({
  transaction_type: yup.string().required(),
  item_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
