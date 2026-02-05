export type AddPreferredCategoryRequest = {
  categoryId: string;
};

export type AddPreferredCategoryResponse = {
  addedAt: string;
  categoryId: string;
  categoryName: string;
  userId: string;
};

export type DeletePreferredCategoryParams = {
  categoryId: string;
};
