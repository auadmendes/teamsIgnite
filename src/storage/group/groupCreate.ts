import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '@storage/storageConfig';
import { groupsGetAll } from './groupGetAll';
import { AppError } from '@utils/AppError';

export async function groupCreate(newGroup: string) {
  try {
    const storageGroups = await groupsGetAll();
    
    const groupAlreadyExists = storageGroups.includes(newGroup)

    if(groupAlreadyExists) {
      throw new AppError('A team with this name already exists!')
    }

    const storage = JSON.stringify([...storageGroups, newGroup])

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);

  } catch (error) {
    throw error;
  }
}