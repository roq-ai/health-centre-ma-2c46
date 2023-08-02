import * as yup from 'yup';

export const itemTypeValidationSchema = yup.object().shape({
  type: yup.string().required(),
  user_id: yup.string().nullable(),
});
