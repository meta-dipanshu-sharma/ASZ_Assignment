import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createTodo, editTodo, deleteTodo } from '../redux/todo/todoAction'
import { createUser, editUser, deleteUser } from '../redux/user/userAction'
import { Helmet } from 'react-helmet'
import { Button, Col, Row, } from 'antd'
import UseModal from './../components/Modal'
import DataTable from './../components/DataTable'
import './style.scss'
import 'antd/dist/antd.css'

const Homepage = (props) => {

  const [selectedWizardId, toggleWizardItems] = useState(0)
  const [tabDisable, setTabDisable] = useState(false)

  const wizardItems = [
    {
      type: 'Todo',
      tableHeaders: [{
        header: 'Action',
        dataIndex: 'action'
      }, {
        header: 'DateAdded',
        dataIndex: 'dateAdded'
      }, {
        header: 'Operation',
        dataIndex: 'operation'
      }],
      fields: [{
        description: 'Action',
        type: 'text'
      }, {
        description: 'DateAdded',
        type: 'date'
      }]
    },
    {
      type: 'User',
      tableHeaders: [{
        header: 'Name',
        dataIndex: 'name'
      }, {
        header: 'Operation',
        dataIndex: 'operation'
      }],
      fields: [{
        description: 'Name',
        type: 'text'
      }, {
        description: 'Email',
        type: 'text'
      }]
    }
  ]

  const getCurrentTimestamp = () => {
    const [, , , , time] = new Date().toString().split(' ')
    const [hour, min] = time.toString().split(':')
    return `_${hour}:${min} ${hour >= 12 ? 'pm' : 'am'}`
  }

  const handleAdd = (firstField, secondField) => {
    if (wizardItems[selectedWizardId].type === 'Todo') {
      const timeStamp = getCurrentTimestamp()

      const todo = {
        key: props.todos.length && props.todos[props.todos.length - 1].key + 1,
        action: firstField,
        dateAdded: secondField + timeStamp
      }

      props.createTodo(todo)
    }
    else {
      const user = {
        key: props.users.length && props.users[props.users.length - 1].key + 1,
        name: firstField,
        email: secondField
      }

      props.createUser(user)
    }
  }

  const disableTab = (disable) => {
    setTabDisable(disable)
  }

  const handleSave = (data) => {
    wizardItems[selectedWizardId].type === 'Todo' ? props.editTodo(data) : props.editUser(data)
  }

  const handleDelete = (data) => {
    wizardItems[selectedWizardId].type === 'Todo' ? props.deleteTodo(data) : props.deleteUser(data)
  }

  const item = wizardItems[selectedWizardId]

  const { type, tableHeaders, fields } = item

  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Row >
        <Col span={3} >
          <Button
            className={selectedWizardId === 0 ? 'activeTab' : ''}
            disabled={tabDisable && selectedWizardId === 1}
            onClick={() => toggleWizardItems(0)}
            type="link"
            size="large"
          >
            Todos
          </Button>
        </Col>
        <Col span={3} >
          <Button
            className={selectedWizardId === 1 ? 'activeTab' : ''}
            disabled={tabDisable && selectedWizardId === 0}
            onClick={() => toggleWizardItems(1)}
            type="link"
            size="large"
          >
            Users
          </Button>
        </Col>
      </Row>

      <UseModal
        fields={fields}
        handleAdd={handleAdd}
        type={type}
      />

      <DataTable
        data={type === 'Todo' ? props.todos : props.users}
        disableTab={disableTab}
        handleDelete={handleDelete}
        handleSave={handleSave}
        tableHeaders={tableHeaders}
        type={type}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    todos: state.todo.todos,
    users: state.user.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTodo: (todo) => dispatch(createTodo(todo)),
    editTodo: (todo) => dispatch(editTodo(todo)),
    deleteTodo: (todo) => dispatch(deleteTodo(todo)),
    createUser: (user) => dispatch(createUser(user)),
    editUser: (user) => dispatch(editUser(user)),
    deleteUser: (user) => dispatch(deleteUser(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage)
