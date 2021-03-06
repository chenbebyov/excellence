import React, { useState, useEffect }  from 'react';
import { Form, Input, Button, message } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {addLayer, addGrade, addLevel, addGroup} from '../../redux/actions/layer.actions';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const hierarchyNames = new Map([
    ['layer', 'שכבה'],
    ['grade', 'כתה'],
    ['level', 'רמת למידה'],
    ['group', 'קבוצה'],
])

const CreateHierarchy = (props) => {

    const {hideCreateHierarchy , type, layerId, gradeId , levelId} = props;
    const { layers } = useSelector(state => state.layerReducer);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();


    const dispatch = useDispatch();

    const getLayerId = (gradeId) => {
        
        if(!gradeId)
            return null;
        return layers.find(layers => layers.grades.find(grade => grade._id === gradeId))._id;
    }
    
    const getGradeId = (levelId) => {
        
        if(!levelId)
            return null;
    
        let result;
        layers.forEach(layer => {
            layer.grades.forEach(grade => {
                let data = grade.levels.find(level => level._id === levelId)
                if (data) {
                    result = grade;
                    return;
                }
            });
    
        });
        return result._id;
    }

    const save = (values) => {
        setLoading(true);
        let {name} = values;
        let func;
        let params;
        switch (type) {
            case 'layer':
                func = addLayer;
                params = name;
                break;
            case 'grade':
                func = addGrade;
                params = {layerId : layerId , gradeName: name };
                break;
            case 'level':
                func = addLevel;
                params = {gradeId: gradeId, levelName: name, layerId: getLayerId(gradeId) };
                break;
            case 'group':
                func = addGroup;
                params = {
                    gradeId: getGradeId(levelId), 
                    groupName: name, 
                    layerId: getLayerId(getGradeId(levelId)), 
                    levelId: levelId
                };
                break;
        
            default:
                break;
        }
        dispatch(func(params)).then((response) => {
            setLoading(false);
            if(response.success){
                form.resetFields()
                message.success(`ה${hierarchyNames.get(type)} נוצרה בהצלחה!`);
                hideCreateHierarchy();
            }
            else {
                message.error(response.error.response.data.error);
            }
        }).catch(error => {
            message.error(`נפל ביצירת ה${hierarchyNames.get(type)}, הודעת שגיאה: ${error}`);
        });  
    }

    return (
    <>
        <Form id="createHierarchy" {...layout} form={form} name={`הוסף ${hierarchyNames.get(type)}`} initialValues={{ remember: true }} onFinish={save} >
            <Form.Item
                label={` שם ${hierarchyNames.get(type)}`}
                name="name"
                rules={[
                    {
                        required: true,
                        message: `הכנס שם ${hierarchyNames.get(type)}!`
                    },
                ]}
            >
                <Input />
            </Form.Item>

            {/* <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit"  loading={loading}>
                    הוסף
                </Button>
            </Form.Item> */}
        </Form>
    </>
)
   
}

export default CreateHierarchy;








