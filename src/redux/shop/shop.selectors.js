import { createSelector } from 'reselect';

const selectShop = state => state.shop;

// BIG NOTE - There will be times when data is not ready when you need it - ie fetching from database. Be on the lookout
// and seek solutions

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  );

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => collections ? Object.keys(collections).map(key => collections[key]) : [] // way to convert Object to an array
);

// export const selectCollections = collectionUrlParam =>
//   createSelector(
//     [selectCollections],
//     collections => collections[collectionUrlParam]
//   );