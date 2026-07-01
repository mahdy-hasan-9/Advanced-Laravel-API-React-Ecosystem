import { Button, Dropdown, Switch } from 'antd'
import React from 'react'
import ColumnIcon from '../../assets/icons/columns.svg'

const ColumnButton = ({columnInfo , handleChangeColumns}) => {

    const handleCheck = (key) => {
        const col = columnInfo.find((col) => col?.key == key)
        col.hidden = !col?.hidden;
        handleChangeColumns([...columnInfo]);    
    }


    const items = columnInfo?.map((item , idx) => ({
        key : idx , 
        label :(
             <div className='flex gap-5 w-[200px] justify-between' onClick={(e) => e.stopPropagation()}>
                <p>{item?.title}</p>
                <Switch checked={!item.hidden} onChange={() => handleCheck(item?.key)}/>
             </div>
    )}))

  return (
    <div>
        <Dropdown menu={{items}} trigger={['click']}>
            <Button>
                <img src={ColumnIcon} alt="icon" />
                Columns
            </Button>
        </Dropdown>
    </div>
  )
}

export default ColumnButton