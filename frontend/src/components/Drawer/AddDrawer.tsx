import { Drawer } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useToggleDrawer } from '../../hooks/useToggleDrawer';
import AddDrawerForm from './AddDrawerForm';
import { AuthContext } from '../../context/AuthContext';

const AddDrawer = () => {

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const location = useLocation();

    const toggleDrawer = useToggleDrawer();

    const onCloseDrawer = () => {
        toggleDrawer(false, "showDrawerAdd");
    }

    const { permissions } = useContext(AuthContext);

    const permission = permissions.includes('create-student');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const showDrawerParams = queryParams.get("showDrawerAdd");

        if (showDrawerParams == 'true') {
            setOpenDrawer(true);
        }
        else {
            setOpenDrawer(false);
        }
    }, [location.search])



    return (

        <Drawer size={400} open={openDrawer} title="Add Student" onClose={onCloseDrawer}>
            {permission ? <AddDrawerForm setOpenDrawer={setOpenDrawer} /> : <div>
                <img src="https://i.programmerhumor.io/2023/10/programmerhumor-io-programming-memes-a1a4ba63f708cba.png" alt="" />
            </div>}

        </Drawer>
    )
}

export default AddDrawer