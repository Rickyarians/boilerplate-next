import { Row, Col, Button, Icon, Typography } from 'antd'

import { leftIcon, rightIcon } from '../../../public/icons/calendar'

let navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
}

export default (props) => {
  const { onNavigate, localizer: { messages }, label, onView, views, view } = props
  const { Group: ButtonGroup } = Button
  const { Title } = Typography

  return (
    <Row className="toolbar">
      <Col span={8}>
        <Title level={3}>{label}</Title>
      </Col>

      <Col span={8} className="text-center">
        <ButtonGroup>
          <Button onClick={() => onView(views[2])} className={`btn-toolbar ${view == 'day' ? 'active' : ''}`}>{messages.day}</Button>
          <Button onClick={() => onView(views[1])} className={`btn-toolbar ${view == 'week' ? 'active' : ''}`}>{messages.week}</Button>
          <Button onClick={() => onView(views[0])} className={`btn-toolbar ${view == 'month' ? 'active' : ''}`}>{messages.month}</Button>
        </ButtonGroup>
      </Col>

      <Col span={8} className="text-right">
        <ButtonGroup>
          <Button onClick={() => onNavigate(navigate.PREVIOUS)} className="btn-toolbar">
            <Icon component={leftIcon} className="" />
          </Button>
          <Button onClick={() => onNavigate(navigate.TODAY)} className="btn-toolbar border-left">
            {messages.today}
          </Button>
          <Button onClick={() => onNavigate(navigate.NEXT)} className="btn-toolbar border-left">
            <Icon component={rightIcon} className="" />
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}
