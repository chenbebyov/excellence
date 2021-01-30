import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Form, Input, Radio, Button } from 'antd';
import {setUserRole} from '../../redux/actions/user.actions';


const SetUserRole = (props) => {

  const { id } = props;

  const { user } = useSelector(state => state.userReducer);
    
  const [role, setRole] = useState();

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setRole(e.target.value);
  };

  const dispatch = useDispatch();
    
  const save = () => {
      dispatch(setUserRole(id, role));       
  }

  const onFinishFailed = () => {
    alert('Failed to set user role');
  }

    return (
      <>
      <Form onFinish={save} onFinishFailed={onFinishFailed} >

      <Form.Item>
        <Radio.Group onChange={onChange}>
        <Radio value={'student'}>student</Radio>
        <br />
        <Radio value={'teacher'}>teacher</Radio>
        <br />
        <Radio value={'secretary'}>secretary</Radio>
        <br />
        { user.role === 'admin' && 
          <Radio value={'admin'}>admin</Radio>
        }
        </Radio.Group>
      </Form.Item>

      <Form.Item>
          <Button type="primary" htmlType="submit">
              Save
          </Button>
      </Form.Item>
      </Form>
      
        </>
    )
}

export default SetUserRole;