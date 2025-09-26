import { useState, useCallback } from 'react';

interface FilterSection {
  id: string;
  title: string;
  options: Array<{
    id: string;
    label: string;
    value: any;
  }>;
  type: 'single' | 'multiple' | 'range' | 'date';
}

interface UseFilterDrawerProps {
  sections: FilterSection[];
  onApply?: (filters: Record<string, any>) => void;
  onReset?: () => void;
}

export const useFilterDrawer = ({ sections, onApply, onReset }: UseFilterDrawerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});

  const openDrawer = useCallback(() => {
    setIsVisible(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleApply = useCallback((filters: Record<string, any>) => {
    setAppliedFilters(filters);
    onApply?.(filters);
    closeDrawer();
  }, [onApply, closeDrawer]);

  const handleReset = useCallback(() => {
    setAppliedFilters({});
    onReset?.();
  }, [onReset]);

  const getActiveFilterCount = useCallback(() => {
    return Object.values(appliedFilters).reduce((count, filter) => {
      if (Array.isArray(filter)) {
        return count + filter.length;
      }
      return count + (filter ? 1 : 0);
    }, 0);
  }, [appliedFilters]);

  return {
    isVisible,
    openDrawer,
    closeDrawer,
    handleApply,
    handleReset,
    appliedFilters,
    activeFilterCount: getActiveFilterCount(),
  };
};
