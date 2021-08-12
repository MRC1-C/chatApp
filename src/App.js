import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Chat from './components/Chat'
import AppProvider from './components/Context/AppProvider'
import Login from './components/Login'
import AddFriendModal from './components/Modal/AddFriendModal'
function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Switch>
          <Route component={Login} path='/login'/>
          <Route component={Chat} path='/' />
        </Switch>
        <AddFriendModal/>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
