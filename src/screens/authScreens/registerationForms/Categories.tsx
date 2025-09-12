import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import SelDropdown from '../../../components/SelectDropdown';
import MultiSelectDropdown from '../../../components/MultiSelectDropdown';
import { fetchCategories } from '../../../store/slices/jobCategoriesSlice';
import { RootState } from '../../../store';
import { Category } from '../../../utils/type';
import Colors from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import { getSubCategories, setCategories } from '../../../service/apiService';
import metrics from '../../../constants/metrics';

const CategoriesForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const { categories, loading } = useSelector(
    (state: RootState) => state.categoriesReducer,
  );
  const [subCategories, setSubCategories] = useState<any>([]);
  const [categoryItem, setCategoryItem] = useState<any>(null);

  const handleCategorySelect = async (selectedItem: any, index: number) => {
    setCategoryItem(selectedItem);
  };

  useEffect(() => {
    if (categoryItem) {
      fetchSubCategories(categoryItem.value);
    }
  }, [categoryItem]);

  console.log('subCategories', subCategories);

  useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  const fetchSubCategories = async (selectedItem: any) => {
    console.log('selectedItem', selectedItem);
    const categoryId = categoryItem.value;
    console.log('categoryId', categoryId);
    try {
      const response = await getSubCategories(categoryId);
      setSubCategories(response.subcategories);
      console.log('response', response.subcategories);
    } catch (error) {
      console.log('error', error);
    }
  };

  const categoriesOptions = categories?.map((category: Category) => ({
    label: category.categoryName,
    value: category.id,
  }));

  const subCategoriesOptions = subCategories?.map((subCategory: any) => ({
    label: subCategory.name,
    value: subCategory.id,
  }));

  const initialValues = {
    mainCategory: '',
    categories: [],
  };

  const handleSubmitForm = async (values: any) => {
    console.log('values', values);
    const payload = {
      categoryIds: [values.mainCategory, ...values.categories],
    };
    console.log('Final Payload:', payload);

    try {
      const response = await setCategories(payload);
      console.log(response);
      Alert.alert('Success', 'Categories updated successfully!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error submitting categories:', error);
      Alert.alert('Error', 'Failed to update job preferences');
    }
  };

  {
    loading && (
      <ActivityIndicator size="large" color={Colors.BUTTON_BACKGROUND} />
    );
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
      {({
        values,
        errors,
        touched,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
      }) => (
        <View style={styles.container}>
          <View style={styles.backButtonContainer}>
            <Text style={styles.title}>Job Preferences</Text>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.backButton}>Skip</Text>
            </TouchableOpacity> */}
          </View>

          <Text style={styles.subtitle}>
            Select the job category you are interested in
          </Text>
          <SelDropdown
            data={categoriesOptions || []}
            onSelect={(selectedItem: any, index: number) => {
              setFieldValue('mainCategory', selectedItem.value);
              handleCategorySelect(selectedItem, index);
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={{ backgroundColor: 'white' }}
            placeholder="Select Category"
            setFieldValue={setFieldValue}
          />

          {touched.mainCategory && errors.mainCategory && (
            <Text style={styles.errorText}>{errors.mainCategory}</Text>
          )}

          <Text style={styles.subtitle}>
            Select the sub-categories you are interested in
          </Text>

          <MultiSelectDropdown
            data={subCategoriesOptions || []}
            selectedValues={values.categories}
            placeholder="Select Sub-Categories"
            onChange={(newValues: any) => {
              setFieldValue('categories', newValues);
            }}
            showTags={true}
          />

          {touched.categories && errors.categories && (
            <Text style={styles.errorText}>{errors.categories}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit as any}>
            <Text style={styles.buttonText}>Update your Job preferences</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export const styles = StyleSheet.create({
  container: {
    borderRadius: metrics.borderRadius(10),
    flexGrow: 1,
    flex: 1,
    padding: metrics.padding(16),
    backgroundColor: Colors.BACKGROUND,
    paddingBottom: metrics.paddingBottom(50),
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: metrics.fontSize(20),
    fontWeight: 'bold',
    marginBottom: metrics.marginBottom(10),
    color: Colors.DARK_GREY,
  },
  subtitle: {
    fontSize: metrics.fontSize(16),
    fontWeight: '400',
    marginBottom: metrics.marginBottom(10),
  },
  errorText: {
    color: 'red',
    fontSize: metrics.fontSize(14),
    marginTop: metrics.marginTop(4),
  },
  button: {
    backgroundColor: Colors.BUTTON_BACKGROUND,
    padding: metrics.padding(16),
    borderRadius: metrics.borderRadius(12),
    marginTop: metrics.marginTop(20),
    paddingVertical: metrics.paddingVertical(10),
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: metrics.fontSize(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    fontSize: metrics.fontSize(16),
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.BUTTON_BACKGROUND,
  },
});

export default CategoriesForm;
