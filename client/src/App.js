import React, { useEffect, useState } from 'react';
import Library from './pages/Library';
import Lessons from './components/lessonsAndTasks/Lessons';
import Home from './pages/Home';
import ViewUsers from './components/users/ViewUsers';
import HierarchyListView from './components/layers/HierarchyListView';
import api from './services/user.service';
import { logout } from './redux/actions/user.actions';
import { useSelector, useDispatch } from 'react-redux';
import { PermissionsProvider, AuthorizedRoute, AuthorizedSection } from '@tshio/react-router-permissions';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import UserDetails from './components/users/UserDetails';
import CreateLesson from './components/lessonsAndTasks/CreateLesson';
import AttendanceJournal from './components/users/AttendanceJournal';
import ViewGroupsDetails from './components/layers/ViewGroupsDetails';
import AffiliationToGroup from './components/groups/AffiliationToGroup';

const permissionsStrategy = (currentRole, requirement) => {
    return requirement.find(role => role === currentRole);
};

function App (props) {

    const { loggedIn, user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        api.getAllUsers().then(users => {
            setUserList(users.data.data);
        }, [])
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access-token');
        dispatch(logout());
    };

    // const getRoles =() =>{
    //     return user ? [user.role] : 'guest';
    // };

    return (
        <>
            <PermissionsProvider
                permissions={user ? user.role : 'guest'}
                authorizationStrategy={permissionsStrategy}
            >
                <Router>
                    <nav>
                        <ul>

                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            {loggedIn &&
                                <>
                                    <li>
                                        <Link to="/lessons">Lessons</Link>
                                    </li>
                                    <li>
                                        <Link to="/library">Library</Link>
                                    </li>
                                    <li>
                                        <Link to="/users">Users</Link>
                                    </li>
                                    <li>
                                        <Link to="/lessons/add">add lesson</Link>
                                    </li>
                                    <li>
                                        <Link to="/layers">Layers</Link>
                                    </li>
                                    <li>
                                        <Link to="/attendanceJournal">AttendanceJournal</Link>
                                    </li>
                                    <li onClick={handleLogout}>
                                        <Link to="/">logout</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </nav>

                    <Switch>
                        <AuthorizedRoute path="/lessons/add"  requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <CreateLesson /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/lessons" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <Lessons /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/library" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <Library /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/users/:id" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <UserDetails /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/users" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <ViewUsers userList={userList} showSetRole={true} />: <Redirect to="/" />)}
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
                            {({ isAuthorized }) => (isAuthorized ? <ViewGroupsDetails/> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/affiliationToGroup" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <AffiliationToGroup/> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/attendanceJournal"  requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <AttendanceJournal /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <Route path="/" component={Home}>
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </PermissionsProvider>

        </>
    );
}

export default App;
