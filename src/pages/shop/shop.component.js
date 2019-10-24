import React from 'react';
import { Route } from 'react-router-dom';
import  { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions';

// we changed to class because we are going to be using some hooks
class Shop extends React.Component {

  componentDidMount() {    
    const { fetchCollectionStartAsync } = this.props;
    fetchCollectionStartAsync();
  }

  // render() runs before componentDidMount()
  render(){    
    const { match } = this.props;
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

}

const mapDispatchToProps = dispatch => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
})

export default connect(null, mapDispatchToProps)(Shop);