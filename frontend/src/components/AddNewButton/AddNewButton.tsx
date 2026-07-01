import { Button } from 'antd'
import addButtonIcon from '../../assets/icons/AddNewUser.svg'
import React from 'react'

const AddNewButton = () => {
  return (
     <Button>
          <img src={addButtonIcon} alt="icon" />
          Filters
      </Button>

  )
}

export default AddNewButton