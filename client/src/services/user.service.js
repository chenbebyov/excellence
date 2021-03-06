import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:3000/api',
    headers: {
        token: localStorage.getItem('access-token')
    }
})

export const getAllUsers = () => api.get('/users');
export const addUser = (user) => api.post('/user', user);
export const getUser = (email,password) => api.get(`/user/${email}/${password}`).then(response => response.data);
export const setRole = (userId, role) => api.post(`/user/role`, {userId, role}).then(response => response.data);
export const getTeachers = () => api.get(`/teachers`);
export const getStudents = () => api.get(`/students`);
export const createMessage = (message, usersIds) => api.post(`/messages/add`, {message, usersIds});
export const setAttendance = (attendance) => api.post(`/student/attendance`, {userAttendance:attendance}).then(response => response.data);
export const uploadStudentTaskResults = (taskSubmission, studentId) => api.post(`/tasks/results/add`, {taskSubmission, studentId});


const apis = {
    getAllUsers,
    addUser,
    getUser,
    setRole,
    getTeachers,
    getStudents,
    createMessage,
    setAttendance
}

export default apis;