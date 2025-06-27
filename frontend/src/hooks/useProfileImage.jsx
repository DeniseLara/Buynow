import { useState } from 'react';
import { uploadProfileImage, removeProfileImage } from '../storage/storage';

export function useProfileImage(userUid, updateProfileImage) {
  const [uploading, setUploading] = useState(false);

  const changeProfileImage = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadProfileImage(file, userUid);
      await updateProfileImage(url);
    } catch (error) {
      console.error(error);
    }
    setUploading(false);
  };

  const removeImage = async () => {
    setUploading(true);
    try {
      await removeProfileImage(userUid);
      await updateProfileImage(null);
    } catch (error) {
      console.error(error);
    }
    setUploading(false);
  };

  return { changeProfileImage, removeImage, uploading };
}
