import { Button, Dropdown, Modal } from 'antd'
import actionIcon from '../../assets/icons/action.svg'
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/trash.svg'
import React, { useState } from 'react'
import { useToggleDrawer } from '../../hooks/useToggleDrawer';
import { deleteStudentService } from '../../services/studentService';
import toast from 'react-hot-toast';

const ActionDropdown = ({ data }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false);

    const toggleDrawer = useToggleDrawer();

    const handleEdit = () => {
        toggleDrawer(true, "showDrawerEdit", data.id)
    }

    const hangleDelete = async (id) => {
        try {
            setLoading(true);
            const resp = await deleteStudentService(id)
            console.log(resp + " from delete service");
            setIsOpen(false);
        } catch (error: any) {
            console.error('Submission failed:', error);
            toast.error(error.message || 'Something went wrong');

        } finally {
            setLoading(false);
        }


    }


    const items = [{
        key: 'edit',
        label: <div onClick={handleEdit} className='flex items-center gap-x-5'><img src={editIcon} alt="" />
            <p>edit</p></div>
    },
    {
        key: 'delete',
        label: <div onClick={() => setIsOpen(true)} className='flex items-center gap-x-5'><img src={deleteIcon} alt="" />
            <p>delete</p></div>
    }]

    return (
        <>
            <Dropdown menu={{ items }} trigger={['click']}>
                <div>
                    <img src={actionIcon} alt="" />
                </div>
            </Dropdown>

            <Modal
                open={isOpen}
                onOk={() => {
                    hangleDelete(data.id);
                }}
                onCancel={() => setIsOpen(false)}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to delete this student?</p>
            </Modal>
        </>
    )
}

export default ActionDropdown