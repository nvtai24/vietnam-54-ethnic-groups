import { useEffect } from 'react';
import ethnicGroupsData from '../data/ethnicGroups.json';
import type { EthnicGroup } from '../types/EthnicGroup';
import { validateAllGroups, logValidationErrors } from '../utils/validateData';

// Component này chỉ chạy trong development mode để validate dữ liệu
const DataValidator = () => {
  useEffect(() => {
    // Chỉ chạy trong development mode
    if (import.meta.env.DEV) {
      console.log('🔍 Đang kiểm tra dữ liệu...');
      
      const groups = ethnicGroupsData.groups as EthnicGroup[];
      const validation = validateAllGroups(groups);
      
      console.log(validation.summary);
      
      if (!validation.isValid) {
        logValidationErrors(validation.errors);
        console.warn('⚠️ Vui lòng sửa các lỗi trên trước khi deploy!');
      } else {
        console.log('✨ Dữ liệu hoàn hảo! Sẵn sàng để deploy.');
      }
    }
  }, []);

  // Component này không render gì cả
  return null;
};

export default DataValidator;
