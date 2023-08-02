import * as yup from 'yup';

export const itemValidationSchema = yup.object().shape({
  name: yup.string().required(),
  type_id: yup.string().nullable(),
  category_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
