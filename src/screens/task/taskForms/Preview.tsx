import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import metrics from '../../../constants/metrics';
import Colors from '../../../constants/color';
import { formatCurrency, formatDate2 } from '../../../utils/helper';
import { RootState, useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchCategories } from '../../../store/slices/jobCategoriesSlice';
import { ImageUrl } from '../../../service/axiosInterceptor';
import { useTranslation } from 'react-i18next';

const Preview = ({ values, setStep, handleSubmit, loading }: any) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { categories: allCategories } = useAppSelector(
    (state: RootState) => state.categoriesReducer
  );
  useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  const getCategoryNames = (ids: string[]) => {
    return allCategories?.
      filter((cat: any) => ids.includes(String(cat.id)))
      ?.map((cat: any) => cat.categoryName);
  };

  const getSubCategoryNames = (ids: string[]) => {
    const names: string[] = [];
    allCategories?.forEach((cat: any) => {
      (cat.subCategories || []).forEach((sub: any) => {
        if (ids.includes(String(sub.id))) {
          names.push(sub.name);
        }
      });
    });
    return names;
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>{t('task.preview')}</Text>

        <View style={styles.section}>
          <Text style={styles.label}>{t('task.title')}</Text>
          <Text style={styles.value}>{values.title}</Text>
          <Text style={styles.label}>{t('task.description')}</Text>
          <Text style={styles.value}>{values.description.replace(/<[^>]+>/g, '')}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>{t('task.category')}</Text>
          </View>

          {getCategoryNames(values?.mainCategory) && (
            <Text style={styles.value}>{getCategoryNames(values?.mainCategory)?.join(', ')}</Text>
          )}
          <Text style={styles.label}>{t('task.subCategory')}</Text>
          {getSubCategoryNames(values.categories).length > 0 && (
            <Text style={styles.Subvalue}>{getSubCategoryNames(values?.categories)}  </Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>{t('task.location')}</Text>
          </View>
          <Text style={styles.value}>{values.location.addressLine1 ? values.location.addressLine1 : ''}{values.location.addressLine2 ? values.location.addressLine2 : ''}</Text>
          <Text style={styles.value}>{values.location.street ? values.location.street : ''}</Text>
          <Text style={styles.value}>{values.location.state ? values.location.state : ''}</Text>
          <Text style={styles.value}>{values.location.city ? values.location.city : ''}</Text>
          <Text style={styles.value}>{values.location.country ? values.location.country : ''}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t('task.estimateBudget')}</Text>
          <Text style={styles.value}>{formatCurrency(values.estimateBudget)}</Text>
          <Text style={styles.label}>{t('task.deadline')}</Text>
          <Text style={styles.value}>{formatDate2(values.deadline)}</Text>
          <Text style={styles.label}>{t('task.note')}</Text>
          <Text style={styles.value}>{values.note ? values.note.replace(/<[^>]+>/g, 'N/A') : ''}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>{t('task.images')}</Text>
          </View>

          {Array.isArray(values.media) && values.media.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {values.media.map((file: any, index: number) => {
                const uri = typeof file === 'string' ? `${ImageUrl}${file}` : file.uri;

                return (
                  <Image
                    key={index}
                    source={{ uri: uri }}
                    style={styles.image}
                  />
                );
              })}
            </ScrollView>
          ) : (
              <Text style={styles.value}>{t('task.noImagesSelected')}</Text>
          )}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => setStep(2)}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{t('common.back')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
              {loading ? t('common.submitting') : t('common.submit')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.padding(20),
    borderRadius: metrics.borderRadius(10),
    backgroundColor: Colors.BACKGROUND,
  },
  heading: {
    fontSize: metrics.fontSize(20),
    fontWeight: 'bold',
    marginBottom: metrics.marginBottom(10),
    textAlign: 'center',
  },
  section: { marginBottom: metrics.marginBottom(10) },
  sectionTitle: { fontSize: metrics.fontSize(12), fontWeight: '600' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontWeight: '600', marginTop: metrics.marginTop(5) },
  value: { marginBottom: metrics.marginBottom(1), color: Colors.DARK_GREY, fontSize: metrics.fontSize(12) },
  Subvalue: { marginBottom: metrics.marginBottom(5), color: Colors.DARK_GREY, fontSize: metrics.fontSize(12) },
  image: {
    borderColor: Colors.LIGHT_GREY,
    borderWidth: 1,
    width: metrics.width(100),
    height: metrics.height(100),
    borderRadius: metrics.borderRadius(10),
    marginTop: metrics.marginTop(10),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: metrics.marginTop(20),
    marginBottom: metrics.marginBottom(20),
    gap: metrics.gap(10),
  },
  button: {
    backgroundColor: Colors.MAIN_COLOR,
    padding: metrics.padding(10),
    borderRadius: metrics.borderRadius(5),
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: Colors.LIGHT_GREY,
  },
  submitButton: {
    backgroundColor: Colors.MAIN_COLOR,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: metrics.fontSize(16),
  },
});

export default Preview;


