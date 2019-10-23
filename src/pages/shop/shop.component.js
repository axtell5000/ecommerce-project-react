import React from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import  { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// we changed to class because we are going to be using some hooks
class Shop extends React.Component {

  componentDidMount() {    
    const { fetchCollectionStartAsync } = this.props;
    fetchCollectionStartAsync();
  }

  // render() runs before componentDidMount()
  render(){    
    const { match, isCollectionFetching, isCollectedLoaded } = this.props;
    return  (
      <div className="shop-page">
        <Route 
          exact 
          path={`${match.path}`} 
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
          )}
        />
        <Route 
          path={`${match.path}/:collectionId`} 
          render={props => (
            <CollectionPageWithSpinner isLoading={!isCollectedLoaded} {...props} />
          )}
        />
      </div>
    )
  }

}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectedLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop);