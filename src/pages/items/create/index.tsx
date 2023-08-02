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

import { createItem } from 'apiSdk/items';
import { itemValidationSchema } from 'validationSchema/items';
import { ItemTypeInterface } from 'interfaces/item-type';
import { ItemCategoryInterface } from 'interfaces/item-category';
import { UserInterface } from 'interfaces/user';
import { getItemTypes } from 'apiSdk/item-types';
import { getItemCategories } from 'apiSdk/item-categories';
import { getUsers } from 'apiSdk/users';
import { ItemInterface } from 'interfaces/item';

function ItemCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ItemInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createItem(values);
      resetForm();
      router.push('/items');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ItemInterface>({
    initialValues: {
      name: '',
      type_id: (router.query.type_id as string) ?? null,
      category_id: (router.query.category_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: itemValidationSchema,
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
              label: 'Items',
              link: '/items',
            },
            {
              label: 'Create Item',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Item
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<ItemTypeInterface>
            formik={formik}
            name={'type_id'}
            label={'Select Item Type'}
            placeholder={'Select Item Type'}
            fetcher={getItemTypes}
            labelField={'type'}
          />
          <AsyncSelect<ItemCategoryInterface>
            formik={formik}
            name={'category_id'}
            label={'Select Item Category'}
            placeholder={'Select Item Category'}
            fetcher={getItemCategories}
            labelField={'category'}
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
              onClick={() => router.push('/items')}
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
    entity: 'item',
    operation: AccessOperationEnum.CREATE,
  }),
)(ItemCreatePage);
