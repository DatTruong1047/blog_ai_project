export interface PostResponseDTO {
  id: number;
  title: string;
  content: string;
  style: string;
  url: string;
  categoryName: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface PostCreateDTO {
  title: string;
  content: string;
  style: string;
  url: string;
  categoryName: string;
}
