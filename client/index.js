import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import store from './store'
import Login from './login'
import UserPage from './user-page'
import { sessionLogin } from './store'



class _Main extends Component {
  componentDidMount() {
    this.props.sessionLogin()
      .catch(error => console.log(error))
  }

  render() {

    const { isLoggedIn } = this.props;
    console.log(this.props.user)
    console.log(isLoggedIn)

    return (
      <Switch>
        {
          isLoggedIn && (<Route path='/home' component={UserPage} />)
        }
        {
          !isLoggedIn && (
            <Route component={Login} />
          )
        }
        <Redirect to='/home' />
      </Switch>
    )
  }
};

const mapStateToProps = ({ user }) => {
  return {
    isLoggedIn: !!user.id, user
  };
};


const Main = connect(mapStateToProps, { sessionLogin })(_Main);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app')
)
