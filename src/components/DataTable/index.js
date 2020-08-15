import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Popconfirm, Table } from 'antd'
import 'antd/dist/antd.css'
import './style.scss'

const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
}) => {

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            ) : (
                    children
                )}
        </td>
    )
}

const DataTable = (props) => {
    const [form] = Form.useForm()
    const [editingKey, setEditingKey] = useState('')

    const isEditing = (record) => record.key === editingKey

    const edit = (record) => {
        form.setFieldsValue({ ...record })
        setEditingKey(record.key)
        props.disableTab(true)
    }

    const save = (key) => {
        const row = form.getFieldsValue()
        const newData = Object.assign({}, row, {
            key: key
        })
        props.handleSave(newData)
        setEditingKey('')
        props.disableTab(false)
    }

    const cancel = () => {
        setEditingKey('')
        props.disableTab(false)
    }

    const { tableHeaders } = props

    const columns = tableHeaders.map(tableHeader => {
        if (tableHeader.header === 'Operation') {
            return {
                title: `${tableHeader.header}`,
                key: `${tableHeader.header}`,
                dataIndex: `${tableHeader.dataIndex}`,

                render: (text, record) => {
                    const editable = isEditing(record)

                    return props.data.length >= 1 ? (
                        editable ? (
                            <div>
                                <Button type="link" onClick={() => save(record.key)}>
                                    Save
                                    </Button>
                                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                    <Button type="link">Cancel</Button>
                                </Popconfirm>
                            </div>
                        ) : (
                                <div>
                                    <Button
                                        type="link"
                                        disabled={editingKey !== ''}
                                        onClick={() => edit(record)}
                                    >
                                        Edit
                                    </Button>
                                    <Popconfirm title="Sure to delete?" onConfirm={() => props.handleDelete(record)}>
                                        <Button type="link">Delete</Button>
                                    </Popconfirm>
                                </div>)
                    ) : null
                }
            }
        }
        return {
            title: `${tableHeader.header}`,
            key: `${tableHeader.header}`,
            dataIndex: `${tableHeader.dataIndex}`,

            onCell: (record) => ({
                record,
                dataIndex: tableHeader.dataIndex,
                title: tableHeader.header,
                editing: isEditing(record)
            })
        }
    })

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell
                    }
                }}
                columns={columns}
                dataSource={props.data}
            />
        </Form>
    )
}

DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    tableHeaders: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
}

export default DataTable
