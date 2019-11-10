import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import  { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

// we changed to class because we are going to be using some hooks
const Shop = ({fetchCollectionsStart, match}) => {
  
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]); /* This is a trick to get useEffect to work correctly, when we want something not to re-render
  
  we need [], but sometimes this gives errors, to fix it we can cheat by using something that wont cause unnecessarry re-renders*/

  return  (
    <div className="shop-page">
      <Route 
        exact 
        path={`${match.path}`} 
        component={CollectionsOverviewContainer}
      />
      <Route 
        path={`${match.path}/:collectionId`} 
        component={CollectionPageContainer}
      />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(Shop);