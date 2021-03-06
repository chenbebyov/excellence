import React, { useState, useEffect } from "react";
import { Form, Input, Button,Space, DatePicker,TimePicker, message,Checkbox,AutoComplete } from 'antd';
import {getLessons} from '../../services/lesson.service';
import {updateLessonsInGroup} from '../../redux/actions/layer.actions';
import {useDispatch} from 'react-redux';
import moment from 'moment';


const { RangePicker } = DatePicker;

const AddLessonsToGroup = (props) => {
    const {groupId, setViewDrawer} = props;
    const [startDate, setStartDate] = useState();
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState();
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState(new Date());
    const format = 'HH:mm';

    const dispatch = useDispatch();

    useEffect(() => {
        initLessons();
    }, []);

    const initLessons = () => {
        getLessons().then(response => {
            debugger
            if (response.success) {
                debugger
                let result = response.data.map(lesson => 
                    ({...lesson,
                        key:lesson._id, 
                        value: lesson.lessonSubject,
                        label : lesson.lessonSubject
                    }
                ));
                setLessons(result);
            }
            else {
                message.error('Faild to load teacher list')
            }
            console.log(response);
        }).catch(error => message.error('Faild to load teacher list'));
    }


    const handleSatartDateChanged = (date, dateString) => {
        setStartDate(date);
    }

    const filterAutoComplete = (inputValue, option) => {
        return option.lessonSubject.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1  
    }

    const save = (values) => {
        setLoading(true);
        let lesson = {
            lessonId: selectedLesson._id,
            fromDateTime:values["lesson time"][0],
            toDateTime:values["lesson time"][1],
            comments: values["comments"]
        }
        let data = {groupId: groupId, lessons: [lesson]};
        dispatch(updateLessonsInGroup(data)).then(res => {
            if(res.success){
                setLoading(false);
                message.success("lesson created successfuly")
                setViewDrawer(false);
                setKey(new Date());
            }
        });
    }

    const handleCancel = () => {
        setViewDrawer(false);
    }

    const handleSelectLesson = (value, lesson) => {
        setSelectedLesson(lesson);
    }

    const style = { 
        display: "grid"
    }
    return (
        <>
        <Space>
        <Form key={key} layout="vertical" style={style} initialValues={{ remember: true }} onFinish={save}>
            <Form.Item 
                label="זמן השיעור" 
                name="lesson time"
                rules={[
                    {
                        required: true,
                        message: 'please set lesson hours!'
                    },
                ]}
            >
                <RangePicker
                    ranges={{
                        Today: [moment(), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    showTime
                    format="YYYY/MM/DD HH:mm"
                />

            </Form.Item>
            <Form.Item 
                label="נושא השיעור" 
                name="select lesson" 
                rules={[
                    {
                        required: true,
                        message: 'please select lesson!'
                    },
                ]}
            
            >     
                <AutoComplete
                    style={{
                        width: 200,
                    }}
                    options={lessons}
                    placeholder="select lesson"
                    onSelect={handleSelectLesson}
                    filterOption={filterAutoComplete}
                />
            </Form.Item>
            <Form.Item
                    label="הערות"
                    name="comments"
                >
                    <Input />
            </Form.Item>
            <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        שמור
                    </Button>
                    <Button type="default" htmlType="button" onClick={handleCancel}>
                        ביטול
                    </Button>
            </Form.Item>
        </Form>
        </Space>
            
        </>
    );
}

export default AddLessonsToGroup;