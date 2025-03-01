import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constans/userConstans';


export default function UserListScreen(props) {
    const userList = useSelector(state => state.userList);
    const {loading, error, users} = userList;

    const userDelete = useSelector(state => state.userDelete);
    const {
        loading: loadingDelete, 
        error: errorDelete, 
        success: successDelete
    } = userDelete;
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(listUsers());
        dispatch({type: USER_DETAILS_RESET});
    },[dispatch, successDelete]);

    const deleteHandler = (user )=>{
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(user._id));
        }
    }
    return (
        <div>
            <h1>Users</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">User Deleted Successfuly</MessageBox>}
            {
                loading ? (<LoadingBox></LoadingBox>)
                :
                error ? (<MessageBox variant="danger">{error}</MessageBox>)
                : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                {/* <th>IS SELLER</th> */}
                                <th>IS ADMIN</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user)=>(
                                    <tr key={user._id}>
                                        <th>{user._id}</th>
                                        <th>{user.name}</th>
                                        <th>{user.email}</th>
                                        {/* <th>{user.isSeller? 'YES' : 'NO'}</th> */}
                                        <th>{user.isAdmin? 'YES' : 'NO'}</th>
                                        <th>
                                            <button
                                            type = "button" 
                                            className="small" 
                                            onClick={() => props.history.push(`/user/${user._id}/edit`)}>
                                                Edit
                                            </button>
                                            <button 
                                                type = "button" 
                                                className="small" 
                                                onClick={()=> deleteHandler(user)}
                                            >
                                                Delete
                                                </button>
                                        </th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
