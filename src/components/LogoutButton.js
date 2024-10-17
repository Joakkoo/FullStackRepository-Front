import React from 'react';
import { Button } from 'antd';
import { useAuth0 } from "@auth0/auth0-react";
import { createStyles } from 'antd-style';
import { LogoutOutlined } from '@ant-design/icons';

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: red;
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { styles } = useStyle();

  return (
    <Button
      type="primary"
      size="large"
      icon={<LogoutOutlined />}
      className={styles.linearGradientButton}
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
