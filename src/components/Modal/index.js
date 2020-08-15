import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Form, Input, Modal } from 'antd'
import PropTypes from 'prop-types'
import './style.scss'
import 'antd/dist/antd.css'

const UseModal = (props) => {
    const [visible, toggleModal] = useState(false)
    const [required, setRequired] = useState(false)
    const [firstField, setFirstField] = useState()
    const [secondField, setSecondField] = useState()
    const [loading, toggleLoading] = useState(false)

    useEffect(() => {
        setFirstField('')
        setSecondField('')
        setRequired(false)
    }, [visible])

    async function wait(duration = 1000) {
        await new Promise(resolve => setTimeout(resolve, duration))
    }

    const handleSave = async () => {
        if (!firstField) {
            setRequired(true)
            return
        }

        setRequired(false)
        toggleLoading((loading) => !loading)
        await wait(2000)
        toggleLoading((loading) => !loading)
        toggleModal(!visible)
        props.handleAdd(firstField, secondField)
    }
    const onChange = (date, dateString) => {
        setSecondField(dateString)
    }

    const renderModalBody = (fields) => {
        return (
            <Form>
                <p>{`${fields[0].description}`}</p>
                <Input
                    className={required ? 'invalidTaskDescription' : ''}
                    placeholder={`${fields[0].description}`}
                    value={firstField}
                    onChange={e => setFirstField(e.target.value)}
                    required={true}
                />
                <p
                    className={required ? 'showErrorMsg' : 'hideErrorMsg'}
                >
                    This field is required to proceed
                </p>

                <p>{`${fields[1].description}`}</p>

                {fields[1].type === 'date' ?
                    <DatePicker onChange={onChange}></DatePicker> :
                    <Input
                        placeholder={`${fields[1].description}`}
                        type={fields[1].type}
                        value={secondField}
                        onChange={e => setSecondField(e.target.value)}
                    />}
            </Form>
        )
    }

    const { fields } = props

    return (
        <div className="app-modal">
            <Button
                type="default"
                size="large"
                onClick={() => toggleModal(!visible)}
            >
                {`Create ${props.type}`}
            </Button>

            <Modal
                maskClosable={true}
                title={`Add ${props.type}`}
                visible={visible}
                onCancel={() => toggleModal(!visible)}

                footer={[
                    <Button key="cancel" onClick={() => toggleModal(!visible)}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" loading={loading} onClick={handleSave} >
                        Save
                    </Button>
                ]}
            >
                {renderModalBody(fields)}
            </Modal>
        </div>
    )
}

UseModal.propTypes = {
    fields: PropTypes.array.isRequired,
    handleAdd: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}

export default UseModal