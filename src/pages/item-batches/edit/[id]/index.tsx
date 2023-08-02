import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getItemBatchById, updateItemBatchById } from 'apiSdk/item-batches';
import { itemBatchValidationSchema } from 'validationSchema/item-batches';
import { ItemBatchInterface } from 'interfaces/item-batch';
import { ItemInterface } from 'interfaces/item';
import { UserInterface } from 'interfaces/user';
import { getItems } from 'apiSdk/items';
import { getUsers } from 'apiSdk/users';

function ItemBatchEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ItemBatchInterface>(
    () => (id ? `/item-batches/${id}` : null),
    () => getItemBatchById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ItemBatchInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateItemBatchById(id, values);
      mutate(updated);
      resetForm();
      router.push('/item-batches');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ItemBatchInterface>({
    initialValues: data,
    validationSchema: itemBatchValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Item Batches',
              link: '/item-batches',
            },
            {
              label: 'Update Item Batch',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Item Batch
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.batch_number}
            label={'Batch Number'}
            props={{
              name: 'batch_number',
              placeholder: 'Batch Number',
              value: formik.values?.batch_number,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<ItemInterface>
            formik={formik}
            name={'item_id'}
            label={'Select Item'}
            placeholder={'Select Item'}
            fetcher={getItems}
            labelField={'name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/item-batches')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'item_batch',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ItemBatchEditPage);
