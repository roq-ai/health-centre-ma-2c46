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
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createItemBatch } from 'apiSdk/item-batches';
import { itemBatchValidationSchema } from 'validationSchema/item-batches';
import { ItemInterface } from 'interfaces/item';
import { UserInterface } from 'interfaces/user';
import { getItems } from 'apiSdk/items';
import { getUsers } from 'apiSdk/users';
import { ItemBatchInterface } from 'interfaces/item-batch';

function ItemBatchCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ItemBatchInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createItemBatch(values);
      resetForm();
      router.push('/item-batches');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ItemBatchInterface>({
    initialValues: {
      batch_number: '',
      item_id: (router.query.item_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
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
              label: 'Create Item Batch',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Item Batch
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
    operation: AccessOperationEnum.CREATE,
  }),
)(ItemBatchCreatePage);
