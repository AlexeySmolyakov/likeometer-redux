import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import API from '../../api';
import './styles.scss';
import Photos from '../Photos/index';
import { fetchUser, userSelector } from '../../redux/user';

class Layout extends Component {
  state = {
    user: null,
    isLoading: true,
    hasErrors: false,
  };

  componentDidMount() {
    const { fetchUser } = this.props;

    API.auth.checkAuth()
    .then(fetchUser)
    .then(({ value: user }) => {
      this.setState({
        user,
        isLoading: false,
      });
    })
    .catch(error => {
      console.warn(error);

      this.setState({
        isLoading: false,
        hasErrors: error,
      });
    });
  }

  render() {
    const { user, isLoading, hasErrors } = this.state;

    if (isLoading || hasErrors || !user) return null;

    return (
      <BrowserRouter>
        <div className={'Layout'}>
          <div className={'LayoutHeader'}>
            <Header user={user} />
          </div>
          <div className={'LayoutContent'}>
            <Route path={'/photos'} component={Photos} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

Layout.propTypes = {};
Layout.defaultProps = {};

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = {
  fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);