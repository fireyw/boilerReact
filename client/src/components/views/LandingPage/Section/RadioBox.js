import React, {useState} from 'react';
import {Radio, Collapse} from 'antd';

const {Panel} = Collapse;


function RadioBox(props) {
    const [Value, setValue] = useState(0);
    const handleToggle = (value) => {

    }

    const renderRadioboxLists = () => props.list && props.list.map((value) => {
        return <React.Fragment key={value._id}>
            <Radio value={value._id}>{value.name}</Radio>
        </React.Fragment>
    })

    const handleChange = (event) => {
        setValue(event.target.value); //라디오박스를 선택하면 Value값이 변경되어 Group값도 변경됨
        props.handleFilters(event.target.value);
    }
    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="This is panel header 1" key="1">
                    {/*Group value와 Radio value가 같으면 선택됨*/}
                    <Radio.Group onChange={handleChange} value={Value}>
                        {renderRadioboxLists()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    );
}

export default RadioBox;