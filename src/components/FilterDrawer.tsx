import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  Animated,
} from 'react-native';
import Colors from '../constants/color';
import metrics from '../constants/metrics';
import { ArrowDown } from '../Icons/BackIcon';
import { fetchCategories } from '../store/slices/jobCategoriesSlice';
import { getSubCategories } from '../service/apiService';
import { useAppSelector, useAppDispatch } from '../store/store';
import { RootState } from '../store';
import { FilterDrawerProps, FilterOption, FilterSection } from '../utils/type';
import { useTranslation } from 'react-i18next';

const { height: screenHeight } = Dimensions.get('window');

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  visible,
  onClose,
  onApply,
  onReset,
  sections,
  title = 'Filters',
}) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state: RootState) => state.categoriesReducer);
  const { t } = useTranslation();

  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [translateY] = useState(new Animated.Value(screenHeight));
  const [expandedCategories, setExpandedCategories] = useState<Set<string | number>>(new Set());
  const [categoriesWithSubcategories, setCategoriesWithSubcategories] = useState<any[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<Set<string | number>>(new Set());

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);

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


  const fetchSubCategoriesForCategory = useCallback(async (categoryId: string | number) => {
    try {
      const response = await getSubCategories(String(categoryId));
      return response.subcategories || [];
    } catch (error) {
      // console.log('Error fetching subcategories:', error);
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

  const toggleSubcategorySelection = (subcategoryId: string | number) => {
    const newSelected = new Set(selectedSubcategories);
    
    if (newSelected.has(subcategoryId)) {
      newSelected.delete(subcategoryId);
    } else {
      newSelected.add(subcategoryId);
    }
    setSelectedSubcategories(newSelected);
  };

  const handleOptionSelect = (sectionId: string, option: FilterOption, sectionType: string) => {
    setSelectedFilters(prev => {
      const currentSection = prev[sectionId] || [];
      
      if (sectionType === 'single') {
        return {
          ...prev,
          [sectionId]: [option.value],
        };
      } else if (sectionType === 'multiple') {
        const isSelected = currentSection.includes(option.value);
        if (isSelected) {
          return {
            ...prev,
            [sectionId]: currentSection.filter((val: any) => val !== option.value),
          };
        } else {
          return {
            ...prev,
            [sectionId]: [...currentSection, option.value],
          };
        }
      } 
      return prev;
    });
  };

  const handleClearAll = useCallback(() => {
    setSelectedFilters({});
    setSelectedSubcategories(new Set());
    setExpandedCategories(new Set());
    onReset();
  }, [onReset]);

  const handleApplyFilters = useCallback(() => {
    const allFilters = {
      ...selectedFilters,
      categories: Array.from(selectedSubcategories),
      subcategories: Array.from(selectedSubcategories),
    };
    onApply(allFilters);
  }, [selectedFilters, selectedSubcategories, onApply]);

  const isOptionSelected = (sectionId: string, optionValue: any, sectionType: string) => {
    const sectionFilters = selectedFilters[sectionId] || [];
    if (sectionType === 'single') {
      return sectionFilters.includes(optionValue);
    } else if (sectionType === 'multiple') {
      return sectionFilters.includes(optionValue);
    }
    return false;
  };

  const renderOption = (sectionId: string, option: FilterOption, sectionType: string) => {
    const isSelected = isOptionSelected(sectionId, option.value, sectionType);
    
    return (
      <TouchableOpacity
        key={option.id}
        style={styles.optionItem}
        onPress={() => handleOptionSelect(sectionId, option, sectionType)}
      >
        <View style={styles.radioContainer}>
          <View style={[
            styles.radioButton,
            isSelected && styles.radioButtonSelected,
          ]}>
            {isSelected && <View style={styles.radioButtonInner} />}
          </View>
          <Text style={styles.optionText}>
            {option.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategorySection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('filters.filterByCategory')}</Text>
      <View style={styles.categoryContainer}>
        {categoriesWithSubcategories.map((category) => {
          const isExpanded = expandedCategories.has(category.id);
          
          return (
            <View key={category.id} style={styles.categoryItem}>
              <TouchableOpacity 
                style={styles.mainCategoryRow}
                onPress={() => toggleCategoryExpansion(category.id)}
              >
                <Text style={styles.categoryText}>
                  {category.categoryName}
                </Text>
                <ArrowDown color={Colors.DARK_GREY} />
              </TouchableOpacity>

              {isExpanded && category.subcategories && category.subcategories.length > 0 && (
                <View style={styles.subcategoriesContainer}>
                  <Text style={styles.subcategoriesTitle}>{t('filters.subCategories')}</Text>
                  {category.subcategories.map((subcategory: any) => {
                    const isSubcategorySelected = selectedSubcategories.has(subcategory.id);
                    
                    return (
                      <TouchableOpacity 
                        key={subcategory.id} 
                        style={styles.subcategoryRow}
                        onPress={() => toggleSubcategorySelection(subcategory.id)}
                      >
                        <View style={styles.radioContainer}>
                          <View style={[
                            styles.radioButton,
                            isSubcategorySelected && styles.radioButtonSelected,
                          ]}>
                            {isSubcategorySelected && <View style={styles.radioButtonInner} />}
                          </View>
                          <Text style={styles.subcategoryText}>
                            {subcategory.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );

  const renderSection = (section: FilterSection) => (
    <View key={section.id} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.optionsContainer}>
        {section.options.map(option => 
          renderOption(section.id, option, section.type)
        )}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        <Animated.View 
          style={[
            styles.drawer,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={handleClearAll} style={styles.clearAllButton}>
              <Text style={styles.clearAllText}>{t('filters.clearAll')}</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {renderCategorySection()}
            {sections.map(renderSection)}
          </ScrollView>
          
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={handleClearAll}
            >
              <Text style={styles.resetButtonText}>{t('filters.reset')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.applyButton} 
              onPress={handleApplyFilters}
            >
              <Text style={styles.applyButtonText}>{t('filters.applyFilters')}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  drawer: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: metrics.borderRadius(20),
    borderTopRightRadius: metrics.borderRadius(20),
    maxHeight: screenHeight * 0.9,
    minHeight: screenHeight * 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: metrics.paddingHorizontal(20),
    paddingVertical: metrics.paddingVertical(20),
  },
  title: {
    fontSize: metrics.fontSize(20),
    fontWeight: 'bold',
    color: Colors.CHARCOAL_GRAY,
  },
  clearAllButton: {
    paddingVertical: metrics.paddingVertical(8),
    paddingHorizontal: metrics.paddingHorizontal(12),
  },
  clearAllText: {
    fontSize: metrics.fontSize(16),
    color: Colors.LINK_COLOR,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: metrics.paddingHorizontal(20),
  },
  section: {
    marginBottom: metrics.marginBottom(20),
    backgroundColor: Colors.LIGHT_BLUE,
    borderRadius: metrics.borderRadius(16),
    padding: metrics.padding(16),
  },
  sectionTitle: {
    fontSize: metrics.fontSize(16),
    fontWeight: 'bold',
    color: Colors.CHARCOAL_GRAY,
    marginBottom: metrics.marginBottom(12),
  },
  optionsContainer: {
    gap: metrics.gap(8),
  },
  optionItem: {
    paddingVertical: metrics.paddingVertical(8),
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: metrics.width(15),
    height: metrics.height(15),
    borderRadius: metrics.borderRadius(15/2),
    borderWidth: 1.5,
    borderColor: Colors.LINK_COLOR,
    marginRight: metrics.marginRight(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: Colors.LINK_COLOR,
  },
  radioButtonInner: {
    width: metrics.width(10),
    height: metrics.height(10),
    borderRadius: metrics.borderRadius(5),
    backgroundColor: Colors.LINK_COLOR,
  },
  optionText: {
    fontSize: metrics.fontSize(12),
    color: Colors.LINK_COLOR,
    fontWeight: '500',
    flex: 1,
  },
  categoryContainer: {
    gap: metrics.gap(8),
  },
  categoryItem: {
    marginBottom: metrics.marginBottom(8),
  },
  mainCategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: metrics.padding(5),
  },
  categoryText: {
    flex: 1,
    fontSize: metrics.fontSize(12),
    color: Colors.LINK_COLOR,
    fontWeight: '500',
    marginLeft: metrics.marginLeft(8),
  },
  subcategoriesContainer: {
    marginLeft: metrics.marginLeft(12),
    marginTop: metrics.marginTop(5),
    paddingLeft: metrics.paddingLeft(8),
  },
  subcategoriesTitle: {
    fontSize: metrics.fontSize(14),
    fontWeight: '600',
    color: Colors.LINK_COLOR,
    marginBottom: metrics.marginBottom(8),
  },
  subcategoryRow: {
    paddingVertical: metrics.paddingVertical(8),
  },
  subcategoryText: {
    flex: 1,
    fontSize: metrics.fontSize(12),
    color: Colors.LINK_COLOR,
    marginLeft: metrics.marginLeft(12),
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: metrics.paddingHorizontal(20),
    paddingVertical: metrics.paddingVertical(20),
    borderTopWidth: 1,
    borderTopColor: Colors.LIGHT_GREY,
    gap: metrics.gap(12),
  },
  resetButton: {
    flex: 1,
    paddingVertical: metrics.paddingVertical(12),
    paddingHorizontal: metrics.paddingHorizontal(20),
    borderRadius: metrics.borderRadius(8),
    borderWidth: 1,
    borderColor: Colors.LINK_COLOR,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: metrics.fontSize(16),
    fontWeight: '600',
    color: Colors.LINK_COLOR,
  },
  applyButton: {
    flex: 1,
    paddingVertical: metrics.paddingVertical(12),
    paddingHorizontal: metrics.paddingHorizontal(20),
    borderRadius: metrics.borderRadius(8),
    backgroundColor: Colors.LINK_COLOR,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: metrics.fontSize(16),
    fontWeight: '600',
    color: Colors.WHITE,
  },
});

export default FilterDrawer;
