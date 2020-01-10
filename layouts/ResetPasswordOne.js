import { useState } from 'react'
import { Button } from 'antd'

import '../public/assets/styles/auth.less'

import { resetSuccessIcons } from '../public/icons/auth'

import AuthWrapper from '../components/auth/Wrapper'
import ResetPassword from '../components/auth/reset_password/ResetPassword'
import ModalAction from '../components/auth/ModalAction'

export default (props) => {
  const [isVisible, setVisible] = useState(false)
  const [status, setStatus] = useState(false)
  const [message, setMessage] = useState('')

  return (
    <AuthWrapper {...props}>
      <ResetPassword 
        {...props.form}
        modal={{
          toggle: setVisible,
          description: setMessage,
          status: setStatus
        }}
        submitText={props.submitText}
        onSubmit={props.onSubmit}
      />
      {
        props.modal.isShow
          ? (
            <ModalAction
              isVisible={isVisible}
              icon={status == 'success' ? resetSuccessIcons : resetSuccessIcons}
              title={status == 'success' ? 'Success Reset password' : 'Failed to Reset password'}
              description={message}
              className="auth"
              action={(
                <a href={props.modal.actionTo}>
                  <Button block={true} className="btn-gold p-2 mb-2">
                    <span className="text-bold">{props.modal.actionLabel}</span>
                  </Button>
                </a>
              )}
              close={() => setVisible(false)}
            />
          ) : ''
      }
    </AuthWrapper>
  )
}
