import React from 'react';
import Library from './components/library/Library';
import Home from './pages/Home';
import ManageUsers from './components/users/ManageUsers';
import HierarchyListView from './components/layers/HierarchyListView';
import { useSelector } from 'react-redux';
import { PermissionsProvider, AuthorizedRoute, AuthorizedSection } from '@tshio/react-router-permissions';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import UserDetails from './components/users/UserDetails';
import CreateLesson from './components/lessonsAndTasks/CreateLesson';
import NewPassword from './components/users/NewPassword';
import AffiliationToGroup from './components/groups/AffiliationToGroup';
import CalendarView from './components/general/CalendarView';
import NavBar from './components/home/NavBar';
import BookList from './components/library/BookList';
import AddMessage from './components/messages/AddMessage';
import ListMassage from './components/messages/ListMassage';
import { Layout, Menu, Breadcrumb } from 'antd';
import EditorialBoard from './components/lessonsAndTasks/EditorialBoard';
import LessonView from './components/lessonsAndTasks/LessonView';


const { Header, Content, Footer } = Layout;

const permissionsStrategy = (currentRole, requirement) => {
    return requirement.find(role => role === currentRole);
};

function App (props) {

    const { user } = useSelector(state => state.userReducer);
    

    // const getRoles =() =>{
    //     return user ? [user.role] : 'guest';
    // };

    return (
        <>
          {/* <Layout className="layout"> */}

            <PermissionsProvider
                permissions={user ? user.role : 'guest'}
                authorizationStrategy={permissionsStrategy}
            >
                <Router>
                    <NavBar/>
                
                    <Switch>
                        <AuthorizedRoute path="/lessons/add"  requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <CreateLesson /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/lessons"  requires={['admin','secretary','teacher']}>
                            {({ isAuthorized }) => (isAuthorized ? <EditorialBoard /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                      
                        <AuthorizedRoute path="/library" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <Library />: <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/users/:id" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <UserDetails /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/users" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <ManageUsers/>: <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/layers" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <HierarchyListView type="layer" nextHierarchy="grade"/> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/grade" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <HierarchyListView type="grade" nextHierarchy="level"/> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/level" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <HierarchyListView type="level" nextHierarchy="group"/> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/group" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <HierarchyListView type="group" nextHierarchy="viewGroupDetails"/> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/viewGroupDetails" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <AffiliationToGroup mode="read"/> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        {/* <AuthorizedRoute path="/newPassword" >
                            {({ isAuthorized }) => (isAuthorized ? <NewPassword/> : <Redirect to="/" />)}
                        </AuthorizedRoute> */}
                        <AuthorizedRoute path="/calendar"  requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <CalendarView/> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/message/add" requires={['teacher','admin', 'student', 'secritary']}>
                            {({ isAuthorized }) => (isAuthorized ? <AddMessage/> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/messages" requires={['teacher','admin', 'student', 'secritary']}>
                            {({ isAuthorized }) => (isAuthorized ? <ListMassage/> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <Route path="/" component={Home}>
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </PermissionsProvider>

            {/* <Footer style={{ textAlign: 'center' }}>Excellence ©2021</Footer> */}

            {/* </Layout> */}
        </>
    );
}

export default App;
