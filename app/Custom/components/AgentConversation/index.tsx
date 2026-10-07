import type * as React from 'react'
import { Link } from 'react-router'
import { ConversationStyled } from './styles'

interface AgentConversationProps {
  showContactLink?: boolean
}

export const AgentConversation: React.FC<AgentConversationProps> = ({
  showContactLink = true,
}) => (
  <ConversationStyled aria-labelledby="agent-conversation-title">
    <h2 id="agent-conversation-title">Есть вопросы о поддержке сайта?</h2>
    <p>
      Здесь появится чат с моим ИИ-помощником. Вы сможете задать свои вопросы,
      разобраться в условиях и обсудить, подходит ли вам поддержка сайта.
    </p>
    <p className="chat-status">Чат пока не подключён.</p>
    {showContactLink && (
      <p>
        <Link to="/contact">Если хотите связаться со мной лично →</Link>
      </p>
    )}
  </ConversationStyled>
)
