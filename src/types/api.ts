// types.ts
import { AxiosError, AxiosRequestConfig } from 'axios';


export interface MyData {
  id: string;
  title: string;
  description: string; 
  category_id: string;
  completed: boolean;
}

export interface MyCategories {
  id: string;
  name: string;
  color: string | null;
}

export interface UseApiProps<T> {
  url: string;
  initialData?: T | null;
  trigger?: boolean
}

export interface UseApiResult<T> {
  data: T | null;
  isLoading: boolean;
  error: AxiosError | null;
  setUrl: React.Dispatch<React.SetStateAction<string>> | ((newUrl: string) => void);
  postData: (data: any, config?: AxiosRequestConfig) => Promise<void>;
}

export interface ToDoListProps {
  dataToDo: MyData[] | null;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: boolean;
}
export interface CategoriesProps {
  dataCategories: MyCategories[] | null;
}