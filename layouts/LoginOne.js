import '../public/assets/styles/auth.less'

import AuthWrapper from '../components/auth/Wrapper'
import LoginForm from '../components/auth/login/LoginForm'

export default (props) => {
  return (
    <AuthWrapper {...props}>
      <LoginForm inputs={props.inputs} links={props.links} submitText={props.submitText} onSubmit={props.onSubmit} />
    </AuthWrapper>
  )
}
