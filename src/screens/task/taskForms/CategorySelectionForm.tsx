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
import FormStyles from './taskForm';
import { fetchCategories } from '../../../store/slices/jobCategoriesSlice';
import { getSubCategories } from '../../../service/apiService';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useAppDispatch } from '../../../store/store';
import metrics from '../../../constants/metrics';
import Colors from '../../../constants/color';
import { goNextStep } from '../../../utils/helper';
import { stepFields } from '../../../utils/type';
import { Checkbox } from '../../../components/CustomComponents';
import { ArrowDown } from '../../../Icons/BackIcon';

interface Category {
    id: string | number;
    categoryName: string;
    expanded?: boolean;
    subcategories?: SubCategory[];
}

interface SubCategory {
    id: string | number;
    name: string;
    selected?: boolean;
}

const CategorySelectionForm = ({
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
    console.log('values', errors,
        touched,);
    const dispatch = useAppDispatch();
    const { categories } = useSelector((state: RootState) => state.categoriesReducer);

    const [expandedCategories, setExpandedCategories] = useState<Set<string | number>>(new Set());
    const [categoriesWithSubcategories, setCategoriesWithSubcategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Set<string | number>>(new Set());
    const [selectedSubcategories, setSelectedSubcategories] = useState<Set<string | number>>(new Set());

    useEffect(() => {
        if (categories && categories.length > 0) {
            const categoriesWithSubs = categories.map((cat: any) => ({
                id: cat.id,
                categoryName: cat.categoryName,
                expanded: false,
                subcategories: [],
            }));
            setCategoriesWithSubcategories(categoriesWithSubs);
        }
    }, [categories]);

    useEffect(() => {
        dispatch(fetchCategories() as any);
    }, [dispatch]);

    useEffect(() => {
        if (values.mainCategory && values.mainCategory.length > 0) {
            const mainCatIds = Array.isArray(values.mainCategory) ? values.mainCategory : [values.mainCategory];
            setSelectedCategories(new Set(mainCatIds.map(String)));
        }
        if (values.categories && values.categories.length > 0) {
            const subCatIds = Array.isArray(values.categories) ? values.categories : [values.categories];
            setSelectedSubcategories(new Set(subCatIds.map(String)));
        }
    }, [values.mainCategory, values.categories]);

    const fetchSubCategoriesForCategory = useCallback(async (categoryId: string | number) => {
        try {
            const response = await getSubCategories(String(categoryId));
            return response.subcategories || [];
        } catch (error) {
            console.log('Error fetching subcategories:', error);
            return [];
        }
    }, []);

    const toggleCategoryExpansion = async (categoryId: string | number) => {
        const newExpanded = new Set(expandedCategories);

        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId);
        } else {
            newExpanded.add(categoryId);
            const categoryIndex = categoriesWithSubcategories.findIndex(cat => cat.id === categoryId);
            if (categoryIndex !== -1 && (!categoriesWithSubcategories[categoryIndex].subcategories || categoriesWithSubcategories[categoryIndex].subcategories!.length === 0)) {
                const subcategories = await fetchSubCategoriesForCategory(categoryId);
                const updatedCategories = [...categoriesWithSubcategories];
                updatedCategories[categoryIndex] = {
                    ...updatedCategories[categoryIndex],
                    subcategories: subcategories.map((sub: any) => ({
                        id: sub.id,
                        name: sub.name,
                        selected: selectedSubcategories.has(sub.id),
                    })),
                };
                setCategoriesWithSubcategories(updatedCategories);
            }
        }

        setExpandedCategories(newExpanded);
    };

    const toggleCategorySelection = (categoryId: string | number) => {
        const newSelected = new Set(selectedCategories);

        if (newSelected.has(categoryId)) {
            newSelected.delete(categoryId);
            const category = categoriesWithSubcategories.find(cat => cat.id === categoryId);
            if (category?.subcategories) {
                const newSelectedSubs = new Set(selectedSubcategories);
                category.subcategories.forEach(sub => newSelectedSubs.delete(sub.id));
                setSelectedSubcategories(newSelectedSubs);
                setFieldValue('categories', Array.from(newSelectedSubs));
            }
        } else {
            newSelected.add(categoryId);
        }

        setSelectedCategories(newSelected);
        setFieldValue('mainCategory', Array.from(newSelected));
    };
    const toggleSubcategorySelection = (subcategoryId: string | number, categoryId: string | number) => {
        if (!selectedCategories.has(categoryId)) {
            return;
        }
        const newSelected = new Set(selectedSubcategories);

        if (newSelected.has(subcategoryId)) {
            newSelected.delete(subcategoryId);
        } else {
            newSelected.add(subcategoryId);
        }

        setSelectedSubcategories(newSelected);
        setFieldValue('categories', Array.from(newSelected));

        const updatedCategories = categoriesWithSubcategories.map(cat => {
            if (cat.id === categoryId && cat.subcategories) {
                return {
                    ...cat,
                    subcategories: cat.subcategories.map(sub =>
                        sub.id === subcategoryId ? { ...sub, selected: newSelected.has(subcategoryId) } : sub
                    ),
                };
            }
            return cat;
        });
        setCategoriesWithSubcategories(updatedCategories);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={FormStyles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={FormStyles.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <Text style={FormStyles.title}>Select Category </Text>

                    <View style={styles.categoryContainer}>
                        {categoriesWithSubcategories.map((category) => {
                            const isExpanded = expandedCategories.has(category.id);
                            const isCategorySelected = selectedCategories.has(category.id);

                            return (
                                <View key={category.id} style={styles.categoryItem}>

                                    <TouchableOpacity
                                        style={styles.mainCategoryRow}
                                        onPress={() => toggleCategoryExpansion(category.id)}
                                    >
                                        <Checkbox
                                            selected={isCategorySelected}
                                            onPress={() => toggleCategorySelection(category.id)}
                                        />
                                        <Text style={[styles.categoryText, isCategorySelected && styles.selectedText]}>
                                            {category.categoryName}
                                        </Text>
                                        <ArrowDown />
                                    </TouchableOpacity>

                                    {/* Subcategories */}

                                    {isExpanded && category.subcategories && category.subcategories.length > 0 && (
                                        <View style={styles.subcategoriesContainer}>
                                            <Text style={styles.subcategoriesTitle}>Sub-categories</Text>
                                            {category.subcategories?.map((subcategory) => {
                                                const isSubcategorySelected = selectedSubcategories.has(subcategory.id);
                                                const isCategorySelected = selectedCategories.has(category.id);

                                                return (
                                                    <TouchableOpacity
                                                        key={subcategory.id}
                                                        style={[
                                                            styles.subcategoryRow,
                                                            !isCategorySelected && { opacity: 0.5 } // visually disabled
                                                        ]}
                                                        disabled={!isCategorySelected} // disable press if category not selected
                                                        onPress={() => toggleSubcategorySelection(subcategory.id, category.id)}
                                                    >
                                                        <Checkbox
                                                            selected={isSubcategorySelected}
                                                            onPress={() => toggleSubcategorySelection(subcategory.id, category.id)}
                                                            disabled={!isCategorySelected} // disable checkbox if category not selected
                                                        />
                                                        <Text
                                                            style={[
                                                                styles.subcategoryText,
                                                                isSubcategorySelected && styles.selectedText,
                                                                !isCategorySelected && { color: 'gray' } // gray out text
                                                            ]}
                                                        >
                                                            {subcategory.name}
                                                        </Text>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>
                                    )}
                                </View>
                            );
                        })}
                    </View>

                    {touched.mainCategory && errors.mainCategory && (
                        <Text style={styles.errorText}>{errors.mainCategory}</Text>
                    )}
                    {touched.categories && errors.categories && (
                        <Text style={styles.errorText}>{errors.categories}</Text>
                    )}

                    <View style={FormStyles.row}>
                        {step > 0 && (
                            <TouchableOpacity style={FormStyles.button} onPress={() => setStep(step - 1)}>
                                <Text style={FormStyles.buttonText}>Back</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={FormStyles.button} onPress={() => goNextStep(
                            step,
                            setStep,
                            stepFields,
                            validateForm,
                            setFieldTouched,
                        )}>
                            <Text style={FormStyles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        marginBottom: metrics.marginBottom(20),
    },
    categoryItem: {
        marginBottom: metrics.marginBottom(8),
    },
    mainCategoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        borderRadius: metrics.borderRadius(12),
        paddingHorizontal: metrics.paddingHorizontal(16),
        paddingVertical: metrics.paddingVertical(12),
        borderWidth: 1,
        borderColor: '#DDD',
        marginBottom: metrics.marginBottom(4),
    },
    subcategoriesContainer: {
        marginLeft: metrics.marginLeft(20),
        backgroundColor: Colors.WHITE,
        borderRadius: metrics.borderRadius(8),
        paddingHorizontal: metrics.paddingHorizontal(16),
        paddingVertical: metrics.paddingVertical(12),
        borderWidth: 1,
        borderColor: '#DDD',
    },
    subcategoriesTitle: {
        fontSize: metrics.fontSize(14),
        fontWeight: '600',
        color: Colors.DARK_GREY,
        marginBottom: metrics.marginBottom(8),
    },
    subcategoryRow: {
        flexDirection: 'row',
        alignItems: 'center',

    },

    categoryText: {
        flex: 1,
        fontSize: metrics.fontSize(13),
        fontWeight: '500',
        color: Colors.BLACK,
    },
    subcategoryText: {
        flex: 1,
        fontSize: metrics.fontSize(13),
        color: Colors.BLACK,
    },
    selectedText: {
        color: Colors.MAIN_COLOR,
        fontWeight: '600',
    },
    errorText: {
        color: Colors.RED_ERROR,
        fontSize: metrics.fontSize(10),
        // marginTop: metrics.marginTop(4),
        // marginBottom: metrics.marginBottom(8),
    },
});

export default CategorySelectionForm;
