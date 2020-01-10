import '../public/assets/styles/utils.less'

import AuthWrapper from '../components/auth/Wrapper'
import RegisterForm from '../components/auth/register/RegisterForm'

export default (props) => {
  return (
    <AuthWrapper {...props}>
      <RegisterForm inputs={props.inputs} links={props.links} submitText={props.submitText} onSubmit={props.onSubmit} />
    </AuthWrapper>
  )
}
