import React, { Fragment } from 'react'
import { connect } from 'react-redux'

const Alert = ({alerts}) => {
    return (
        <Fragment >
            {alerts? (alerts.map(alert=> { return <h1 className='alert' key={alert.id}>{alert.msg}</h1>})) : ('')}
        </Fragment>
    )
}

const mapState = state => ({
    alerts: state.alert
})

export default connect(mapState)(Alert)
