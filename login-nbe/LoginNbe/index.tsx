import { Alert, Checkbox } from 'antd';
import Form from 'antd/lib/form';
import React, { useState } from 'react';
import { connect, Dispatch, useIntl, Link } from 'umi';
import { ConnectState } from '@/models/connect';
import { StateType } from './models/login';
import { LoginParamsType } from './services/login';
import LoginForm from './components/user';
// import LoginNbe from './LoginNbe';
import styles from './index.less';

const { UserKey, UserName, Password, Submit } = LoginForm;

interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const [form] = Form.useForm();
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
    form.resetFields();
  };

  const intl = useIntl();
  return (
    <div className={styles.main}>
      {/* <LoginNbe /> */}
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit} from={form}>
        <span>
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'login.signinError',
                defaultMessage: 'Cuenta o contraseña incorrecta（admin/ant.design）',
              })}
            />
          )}
        </span>
        <UserKey
          className={styles.obelisco}
          name="userKey"
          maxLength={20}
          placeholder={intl.formatMessage({
            id: 'login.customer',
            defaultMessage: 'Número de cliente',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'login.messageError',
                defaultMessage: 'Introduce la información',
              }),
            },
            {
              message: intl.formatMessage({
                id: 'login.messageErrorVerify',
                defaultMessage: 'Introduce la información',
              }),
              min: 3,
            },
          ]}
        />
        <UserName
          className={styles.obelisco}
          name="userName"
          maxLength={20}
          placeholder={intl.formatMessage({
            id: 'login.user',
            defaultMessage: 'Usuario',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'login.messageError',
                defaultMessage: 'Introduce la información',
              }),
            },
            {
              message: intl.formatMessage({
                id: 'login.messageErrorVerify',
                defaultMessage: 'Introduce la información',
              }),
              min: 3,
            },
          ]}
        />
        <Password
          className={styles.obelisco}
          name="password"
          maxLength={20}
          placeholder={intl.formatMessage({
            id: 'login.password',
            defaultMessage: 'Contraseña',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'login.messageError',
                defaultMessage: 'Introduce la información',
              }),
            },
            {
              message: intl.formatMessage({
                id: 'login.messageErrorVerify',
                defaultMessage: 'Introduce la información',
              }),
              min: 3,
            },
          ]}
        />
        <div className={styles.containerCheck}>
          <Checkbox
            checked={autoLogin}
            onChange={(e) => setAutoLogin(e.target.checked)}
            className={styles.check}
          >
            <span className={styles.checkboxText}>
              {intl.formatMessage({
                id: 'login.rememberMe',
                defaultMessage: 'Recordarme',
              })}
            </span>
          </Checkbox>
          <a
            style={{
              float: 'right',
              fontFamily: 'PingFang SC Regular, Arial, Helvetica, sans-serif',
            }}
          >
            {intl.formatMessage({
              id: 'login.recoveryPassword',
              defaultMessage: 'Recuperar contraseña',
            })}
          </a>
        </div>
        <Submit loading={submitting}>
          {intl.formatMessage({
            id: 'login.signin',
            defaultMessage: 'Acceder',
          })}
        </Submit>
        <Link className={styles.register} to="#">
          {intl.formatMessage({
            id: 'login.signup',
            defaultMessage: 'Registro',
          })}
        </Link>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
