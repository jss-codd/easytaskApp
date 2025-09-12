import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import FormStyles from './taskForm';
import { fetchCategories } from '../../../store/slices/jobCategoriesSlice';
import { getSubCategories } from '../../../service/apiService';
import { Category } from '../../../utils/type';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import MultiSelectDropdown from '../../../components/MultiSelectDropdown';
import { useAppDispatch } from '../../../store/store';
import metrics from '../../../constants/metrics';
import Colors from '../../../constants/color';
import { goNextStep } from '../../../utils/helper';
import { stepFields } from '../../../utils/type';
import { useFocusEffect } from '@react-navigation/native';

const TaskDetails = ({
  values,
  handleChange,
  errors,
  touched,
  setFieldValue,
  step,
  setStep,
  validateForm,
  setFieldTouched,
}: any) => {
  console.log('values', values);
  const dispatch = useAppDispatch();
  const { categories } = useSelector(
    (state: RootState) => state.categoriesReducer,
  );
  const [subCategories, setSubCategories] = useState<any>([]);
  const [categoryItem, setCategoryItem] = useState<any>(null);

  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  // const [subCategories, setSubCategories] = useState<any[]>([]);

  const handleCategorySelect = async (selectedItems: any[]) => {
    setSelectedCategories(selectedItems);

    // Fetch subcategories for each selected category
    let allSubcategories: any[] = [];
    for (let item of selectedItems) {
      try {
        const response = await getSubCategories(item.value);
        allSubcategories = [...allSubcategories, ...response.subcategories];
      } catch (error) {
        console.log('error', error);
      }
    }

    // Remove duplicates
    const uniqueSubs = Array.from(
      new Map(allSubcategories.map(sc => [sc.id, sc])).values()
    );
    setSubCategories(uniqueSubs);
  };


  // const handleCategorySelect = async (selectedItem: any) => {
  //   setCategoryItem(selectedItem);
  // };

  useEffect(() => {
    if (values.mainCategory && categoriesOptions && categoriesOptions.length > 0) {
      const selected = categoriesOptions.find(
        c => c.value === values.mainCategory
      );
      if (selected) {
        setCategoryItem(selected);
      }
    }
  }, [values.mainCategory]);


  useEffect(() => {
    if (categoryItem) {
      fetchSubCategories(categoryItem.value);
    }
  }, [categoryItem]);

  useFocusEffect
    (
      useCallback(() => {
        if (categoryItem) {
          fetchSubCategories(categoryItem.value);
        }
      }, [categoryItem])
    );

  useEffect(() => {
    if (categoryItem) {
      fetchSubCategories(categoryItem.value);
    }
  }, [categoryItem]);

  useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  const fetchSubCategories = async (selectedItem: any) => {
    try {
      const response = await getSubCategories(selectedItem);
      setSubCategories(response.subcategories);
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
    value: String(subCategory.id),
  }));


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={FormStyles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={FormStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={FormStyles.title}>Task Details</Text>

          <CustomInput
            label={
              <Text>
                Task title<Text style={{ color: 'red' }}>*</Text>
              </Text>
            }
            placeholder="Title"
            value={values.title}
            onChangeText={handleChange('title')}
            error={touched.title && errors.title}
          />

          <CustomInput
            multiline
            label={
              <Text>
                Task Description<Text style={{ color: 'red' }}>*</Text>
              </Text>
            }
            numberOfLines={4}
            placeholder="Description"
            value={values.description}
            onChangeText={handleChange('description')}
            textInputContainerStyle={{ height: 100 }}
            error={touched.description && errors.description}
          />

          {/* <Text style={styles.subtitle}>Select Task category</Text>
          
          <MultiSelectDropdown
            data={categoriesOptions || []}
            selectedValues={values.mainCategory || []}
            placeholder="Select Categories"
            onChange={(newValues: any[]) => {
              // Store in formik
              setFieldValue('mainCategory', newValues.map((v: any) => String(v.value)));
              // Fetch subcategories
              handleCategorySelect(newValues);
            }}
            showTags={true}
          />

        
          {touched.mainCategory && errors.mainCategory && (
            <Text style={styles.errorText}>{errors.mainCategory}</Text>
          )}

          <Text style={styles.subtitle}>Select Task Sub Categories</Text>
          <MultiSelectDropdown
            data={subCategoriesOptions || []}
            selectedValues={values.categories || []}
            placeholder="Select Sub-Categories"
            onChange={(newValues: any) => {
              setFieldValue('categories', newValues.map((v: any) => String(v)));
            }}
            showTags={true}
          />
          {touched.categories && errors.categories && (
            <Text style={styles.errorText}>{errors.categories}</Text>
          )} */}

          <View style={FormStyles.row}>
            {step > 0 && (
              <TouchableOpacity
                style={FormStyles.button}
                onPress={() => setStep(step - 1)}
              >
                <Text style={FormStyles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={FormStyles.button}
              onPress={() =>
                goNextStep(
                  step,
                  setStep,
                  stepFields,
                  validateForm,
                  setFieldTouched,
                )
              }
            >
              <Text style={FormStyles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: metrics.fontSize(13),
    fontWeight: '600',
    color: Colors.DARK_GREY,
    marginBottom: metrics.marginBottom(5),
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },

});

export default TaskDetails;




// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Text,
//   StyleSheet,
//   Platform,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   ScrollView,
// } from 'react-native';
// import CustomInput from '../../../components/CustomInput';
// import FormStyles from './taskForm';
// import { fetchCategories } from '../../../store/slices/jobCategoriesSlice';
// import { getSubCategories } from '../../../service/apiService';
// import { Category } from '../../../utils/type';
// import { useSelector } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import { RootState } from '../../../store';
// import MultiSelectDropdown from '../../../components/MultiSelectDropdown';
// import SelDropdown from '../../../components/SelectDropdown';
// import { useAppDispatch } from '../../../store/store';
// import metrics from '../../../constants/metrics';
// import Colors from '../../../constants/color';
// // import { RichEditor } from 'react-native-pell-rich-editor';

// const TaskDetails = ({
//   values,
//   handleChange,
//   errors,
//   touched,
//   setFieldValue,
// }: any) => {
//   const dispatch = useAppDispatch();
//   const navigation = useNavigation<any>();
//   const { categories, loading } = useSelector(
//     (state: RootState) => state.categoriesReducer,
//   );
//   const [subCategories, setSubCategories] = useState<any>([]);
//   const [categoryItem, setCategoryItem] = useState<any>(null);

//   const handleCategorySelect = async (selectedItem: any, index: number) => {
//     setCategoryItem(selectedItem);
//   };

//   useEffect(() => {
//     if (categoryItem) {
//       fetchSubCategories(categoryItem.value);
//     }
//   }, [categoryItem]);

//   console.log('subCategories', subCategories);

//   useEffect(() => {
//     dispatch(fetchCategories() as any);
//   }, [dispatch]);

//   const fetchSubCategories = async (selectedItem: any) => {
//     console.log('selectedItem', selectedItem);
//     const categoryId = categoryItem.value;
//     console.log('categoryId', categoryId);
//     try {
//       const response = await getSubCategories(categoryId);
//       setSubCategories(response.subcategories);
//       console.log('response', response.subcategories);
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

//   const categoriesOptions = categories?.map((category: Category) => ({
//     label: category.categoryName,
//     value: category.id,
//   }));

//   const subCategoriesOptions = subCategories?.map((subCategory: any) => ({
//     label: subCategory.name,
//     value: subCategory.id,
//   }));

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={FormStyles.container}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView
//           contentContainerStyle={FormStyles.scrollContainer}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           <Text style={FormStyles.title}>Task Details</Text>
//           <CustomInput
//             label="Task title"
//             placeholder="Title"
//             value={values.title}
//             onChangeText={handleChange('title')}
//             error={touched.title && errors.title}
//           />

//           <CustomInput
//             multiline
//             label="Task Description"
//             numberOfLines={4}
//             placeholder="Description"
//             value={values.description}
//             onChangeText={handleChange('description')}
//             textInputContainerStyle={{ height: 100 }}
//             error={touched.description && errors.description}
//           />
//           <Text style={styles.subtitle}>Select Task category</Text>
//           <SelDropdown
//             data={categoriesOptions || []}
//             onSelect={(selectedItem: any, index: number) => {
//               setFieldValue('mainCategory', selectedItem.value);
//               handleCategorySelect(selectedItem, index);
//             }}
//             label="select task category"
//             showsVerticalScrollIndicator={false}
//             dropdownStyle={{ backgroundColor: 'white' }}
//             placeholder="Select Category"
//             setFieldValue={setFieldValue}
//           />

//           {touched.mainCategory && errors.mainCategory && (
//             <Text style={styles.errorText}>{errors.mainCategory}</Text>
//           )}

//           <Text style={styles.subtitle}>Select Task Sub Categories</Text>

//           <MultiSelectDropdown
//             data={subCategoriesOptions || []}
//             selectedValues={values.categories || []}
//             placeholder="Select Sub-Categories"
//             onChange={(newValues: any) => {
//               setFieldValue('categories', newValues);
//             }}
//             showTags={true}
//           />

//           {touched.categories && errors.categories && (
//             <Text style={styles.errorText}>{errors.categories}</Text>
//           )}

//           {/* <RichEditor
//         disabled={false}
//         containerStyle={{height: 100}}
//         ref={RichText}
//         style={{height: 100}}
//         placeholder={"Start Writing Here"}
//         onChange={(text) => handleChange('description')(text)}
//         // editorInitializedCallback={editorInitializedCallback}
//         // onHeightChange={handleHeightChange}
//       /> */}
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   error: { color: 'red', fontSize: 12, marginBottom: 5 },
//   subtitle: {
//     fontSize: metrics.fontSize(13),
//     fontWeight: '600',
//     color: Colors.DARK_GREY,
//     marginBottom: metrics.marginBottom(5),
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 14,
//     marginTop: 4,
//   },
// });

// export default TaskDetails;
