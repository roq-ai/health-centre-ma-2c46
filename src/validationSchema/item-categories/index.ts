import * as yup from 'yup';

export const itemCategoryValidationSchema = yup.object().shape({
  category: yup.string().required(),
  user_id: yup.string().nullable(),
});
