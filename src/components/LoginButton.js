import React from "react";
import { Button } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #F26430, #F28630, #F2A630);
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

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const { styles } = useStyle();

  return (
    <Button
      type="primary"
      size="large"
      icon={<LoginOutlined />}
      className={styles.linearGradientButton}
      onClick = {() => loginWithRedirect()} // Inicia sesión al hacer clic
    >
      Login
    </Button>
  );
};

export default LoginButton;

