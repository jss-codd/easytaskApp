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

      if (response.success) {
        Alert.alert('Success', 'Categories updated successfully!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', response.message || 'Something went wrong');
      }
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
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.backButton}>Skip</Text>
            </TouchableOpacity>
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
    flexGrow: 1,
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.DARK_GREY,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    backgroundColor: Colors.BUTTON_BACKGROUND,
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.BUTTON_BACKGROUND,
  },
});

export default CategoriesForm;
