import React from 'react';
import { Button } from 'antd';
import { createStyles } from 'antd-style';
import { DiffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

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

const RegistrarButton = () => {
  const { styles } = useStyle();
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleRegister = () => {
    navigate("/TaskCreate"); // Navega a TaskCreate al hacer clic
  };

  return (
    <Button
      type="primary"
      size="large"
      icon={<DiffOutlined />}
      className={styles.linearGradientButton}
      onClick={handleRegister} // Agrega el evento onClick
    >
      Registrar
    </Button>
  );
};
  
export default RegistrarButton;
