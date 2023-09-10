export interface BooksResponse {
  kind: string;
  totalItems: number;
  items: Books[];
}

export interface Books {
  id: string;
  volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  publisher?: string;
  publishedDate: string;
  description?: string;
  categories: string[];
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
  };
}
