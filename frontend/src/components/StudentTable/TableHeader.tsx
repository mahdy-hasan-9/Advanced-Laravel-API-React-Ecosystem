import { Button, Input } from 'antd'
import { useState } from 'react'
import ColumnButton from '../ColumnButton/ColumnButton';
import FilterButton from '../FilterButton/FilterButton';
import FilterDataComponent from '../FilterDataComponent/FilterDataComponent';
import { useToggleDrawer } from '../../hooks/useToggleDrawer';

const TableHeader = ({columnInfo , handleChangeColumns}) => {

    const [isFiltersOpen, setIsFiltersOpen] = useState(true);

    const toggleDrawer = useToggleDrawer();

    const toggleFilter = () => {
        setIsFiltersOpen((state) => !state);
    }

    const handleOpenDrawer = () => {
        toggleDrawer(true,"showDrawerAdd")
    }

    return (
        <div className='flex flex-wrap items-center justify-between w-full gap-y-2'>
            <div className='w-full sm:max-w-[400px]'>
                <Input placeholder='Search...' className='w-full' />
            </div>

            <div className='flex flex-wrap items-center gap-2'>
                <ColumnButton columnInfo={columnInfo} handleChangeColumns={handleChangeColumns}/>
                <FilterButton toggleFilter={toggleFilter}/>
               
                <Button type='primary' onClick={handleOpenDrawer}>Add New</Button>
            </div>
            {isFiltersOpen && (
                <div className='w-full mt-2'>
                    <FilterDataComponent />
                </div>
            )}
        </div>

    )
}

export default TableHeader