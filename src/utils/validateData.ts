// Utility để validate dữ liệu dân tộc
import type { EthnicGroup } from '../types/EthnicGroup';

export interface ValidationError {
  field: string;
  message: string;
  ethnicGroupId: string;
}

export function validateEthnicGroup(group: EthnicGroup): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate required fields
  if (!group.id || group.id.trim() === '') {
    errors.push({
      field: 'id',
      message: 'ID không được để trống',
      ethnicGroupId: group.id || 'unknown'
    });
  }

  if (!group.name || group.name.trim() === '') {
    errors.push({
      field: 'name',
      message: 'Tên dân tộc không được để trống',
      ethnicGroupId: group.id
    });
  }

  if (!group.population || group.population <= 0) {
    errors.push({
      field: 'population',
      message: 'Dân số phải là số dương',
      ethnicGroupId: group.id
    });
  }

  if (!group.regions || group.regions.length === 0) {
    errors.push({
      field: 'regions',
      message: 'Phải có ít nhất 1 khu vực sinh sống',
      ethnicGroupId: group.id
    });
  }

  if (!group.language || group.language.trim() === '') {
    errors.push({
      field: 'language',
      message: 'Ngôn ngữ không được để trống',
      ethnicGroupId: group.id
    });
  }

  if (!group.thumbnail || group.thumbnail.trim() === '') {
    errors.push({
      field: 'thumbnail',
      message: 'Ảnh đại diện không được để trống',
      ethnicGroupId: group.id
    });
  }

  if (!group.description || group.description.trim() === '') {
    errors.push({
      field: 'description',
      message: 'Mô tả không được để trống',
      ethnicGroupId: group.id
    });
  }

  if (!group.history || group.history.trim() === '') {
    errors.push({
      field: 'history',
      message: 'Lịch sử không được để trống',
      ethnicGroupId: group.id
    });
  }

  // Validate culture object
  if (!group.culture) {
    errors.push({
      field: 'culture',
      message: 'Thông tin văn hóa không được để trống',
      ethnicGroupId: group.id
    });
  } else {
    if (!group.culture.festivals || group.culture.festivals.length === 0) {
      errors.push({
        field: 'culture.festivals',
        message: 'Phải có ít nhất 1 lễ hội',
        ethnicGroupId: group.id
      });
    }

    if (!group.culture.customs || group.culture.customs.length === 0) {
      errors.push({
        field: 'culture.customs',
        message: 'Phải có ít nhất 1 phong tục',
        ethnicGroupId: group.id
      });
    }

    if (!group.culture.clothing || group.culture.clothing.trim() === '') {
      errors.push({
        field: 'culture.clothing',
        message: 'Mô tả trang phục không được để trống',
        ethnicGroupId: group.id
      });
    }

    if (!group.culture.cuisine || group.culture.cuisine.length === 0) {
      errors.push({
        field: 'culture.cuisine',
        message: 'Phải có ít nhất 1 món ăn',
        ethnicGroupId: group.id
      });
    }

    if (!group.culture.housing || group.culture.housing.trim() === '') {
      errors.push({
        field: 'culture.housing',
        message: 'Mô tả nhà ở không được để trống',
        ethnicGroupId: group.id
      });
    }
  }

  if (!group.characteristics || group.characteristics.length === 0) {
    errors.push({
      field: 'characteristics',
      message: 'Phải có ít nhất 1 đặc điểm',
      ethnicGroupId: group.id
    });
  }

  // Validate URL format (basic check)
  const urlPattern = /^https?:\/\/.+/;
  
  if (group.thumbnail && !urlPattern.test(group.thumbnail)) {
    errors.push({
      field: 'thumbnail',
      message: 'URL ảnh đại diện không hợp lệ (phải bắt đầu với http:// hoặc https://)',
      ethnicGroupId: group.id
    });
  }

  if (group.images) {
    group.images.forEach((img, index) => {
      if (!urlPattern.test(img)) {
        errors.push({
          field: `images[${index}]`,
          message: `URL ảnh thứ ${index + 1} không hợp lệ`,
          ethnicGroupId: group.id
        });
      }
    });
  }

  // Validate music URLs
  if (group.music) {
    group.music.forEach((music, index) => {
      if (!music.title || music.title.trim() === '') {
        errors.push({
          field: `music[${index}].title`,
          message: `Tiêu đề bài hát thứ ${index + 1} không được để trống`,
          ethnicGroupId: group.id
        });
      }
      if (!music.url || !urlPattern.test(music.url)) {
        errors.push({
          field: `music[${index}].url`,
          message: `URL bài hát thứ ${index + 1} không hợp lệ`,
          ethnicGroupId: group.id
        });
      }
    });
  }

  // Validate video URLs
  if (group.videos) {
    group.videos.forEach((video, index) => {
      if (!video.title || video.title.trim() === '') {
        errors.push({
          field: `videos[${index}].title`,
          message: `Tiêu đề video thứ ${index + 1} không được để trống`,
          ethnicGroupId: group.id
        });
      }
      if (!video.url || !urlPattern.test(video.url)) {
        errors.push({
          field: `videos[${index}].url`,
          message: `URL video thứ ${index + 1} không hợp lệ`,
          ethnicGroupId: group.id
        });
      }
    });
  }

  return errors;
}

export function validateAllGroups(groups: EthnicGroup[]): {
  isValid: boolean;
  errors: ValidationError[];
  summary: string;
} {
  const allErrors: ValidationError[] = [];

  groups.forEach(group => {
    const errors = validateEthnicGroup(group);
    allErrors.push(...errors);
  });

  const isValid = allErrors.length === 0;
  const summary = isValid
    ? `✅ Tất cả ${groups.length} dân tộc đều hợp lệ!`
    : `❌ Tìm thấy ${allErrors.length} lỗi trong ${groups.length} dân tộc`;

  return {
    isValid,
    errors: allErrors,
    summary
  };
}

// Helper để log errors ra console một cách đẹp mắt
export function logValidationErrors(errors: ValidationError[]): void {
  if (errors.length === 0) {
    console.log('✅ Không có lỗi validation!');
    return;
  }

  console.group('❌ Lỗi Validation:');
  
  // Group errors by ethnic group
  const errorsByGroup = errors.reduce((acc, error) => {
    if (!acc[error.ethnicGroupId]) {
      acc[error.ethnicGroupId] = [];
    }
    acc[error.ethnicGroupId].push(error);
    return acc;
  }, {} as Record<string, ValidationError[]>);

  Object.entries(errorsByGroup).forEach(([groupId, groupErrors]) => {
    console.group(`Dân tộc: ${groupId} (${groupErrors.length} lỗi)`);
    groupErrors.forEach(error => {
      console.error(`  • ${error.field}: ${error.message}`);
    });
    console.groupEnd();
  });

  console.groupEnd();
}
