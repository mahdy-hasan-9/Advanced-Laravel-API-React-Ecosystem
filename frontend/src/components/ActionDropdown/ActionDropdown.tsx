import { Dropdown } from 'antd'
import actionIcon from '../../assets/icons/action.svg'
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/trash.svg'
import React from 'react'

const ActionDropdown = ({ data }) => {

    const items = [{
        key: 'edit',
        label: <div className='flex items-center gap-x-5'><img src={editIcon} alt="" />
            <p>edit</p></div>
    },
    {
        key: 'delete',
        label: <div className='flex items-center gap-x-5'><img src={deleteIcon} alt="" />
            <p>delete</p></div>
    }]

    return (
        <Dropdown menu={{items}} trigger={['click']}>
            <div>
                <img src={actionIcon} alt="" />
            </div>
        </Dropdown>
    )
}

export default ActionDropdown