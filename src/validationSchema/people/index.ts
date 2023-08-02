import * as yup from 'yup';

export const peopleValidationSchema = yup.object().shape({
  name: yup.string().required(),
  role: yup.string().required(),
  user_id: yup.string().nullable(),
});
