import { Alert, Checkbox } from 'antd';
import Form from 'antd/lib/form';
import React, { useState } from 'react';
import { connect, Dispatch, useIntl, Link } from 'umi';
import { StateType } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import LoginForm from './components/user';
// import LoginNbe from './LoginNbe';
import styles from './index.less';

const { UserKey, UserName, Password, Submit } = LoginForm;
interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const Login: React.FC<LoginProps> = (props) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');
  const [isUserName, setIsUserName] = useState<boolean>(true);
  const [isUserKey, setIsUserKey] = useState<boolean>(true);
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const today = new Date();
  const currentHour = today.getHours();
  let messageGood: string;

  const LoginMessage: React.FC<{
    content: string;
  }> = ({ content }) => (
    <Alert
      style={{
        marginTop: 16,
        marginBottom: 16,
      }}
      message={content}
      type="error"
      showIcon
      closable
      afterClose={() => {
        setIsError(false);
      }}
    />
  );

  const messageError: string = intl.formatMessage({
    id: 'login.messageError',
    defaultMessage: 'Introduce la información',
  });
  const messageErrorVerify: string = intl.formatMessage({
    id: 'login.messageErrorVerify',
    defaultMessage: 'Verifica la información',
  });
  const goodDay: string = intl.formatMessage({
    id: 'login.goodDay',
    defaultMessage: 'Buen día.',
  });
  const goodEvening: string = intl.formatMessage({
    id: 'login.goodEvening',
    defaultMessage: 'Buena tarde.',
  });
  const goodNight: string = intl.formatMessage({
    id: 'login.goodNight',
    defaultMessage: 'Buena noche.',
  });

  if (currentHour >= 6 && currentHour < 12) {
    messageGood = goodDay;
  } else if (currentHour >= 12 && currentHour < 19) {
    messageGood = goodEvening;
  } else {
    messageGood = goodNight;
  }

  let message = (
    <span className={styles.message}>
      {intl.formatMessage({
        id: 'login.messageWelcome',
        defaultMessage: '¡Bienvenido!',
      })}{' '}
      {messageGood}
    </span>
  );

  if (isError) {
    message = (
      <span className={styles.messageError}>
        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'login.signinError',
              defaultMessage: 'Servicio no disponible.',
            })}
          />
        )}
      </span>
    );
  }

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
    setIsUserKey(true);
    setIsUserName(true);
    setIsPassword(true);
    setIsError(true);
    form.resetFields();
  };

  const onChangeHandlerUserKey = (event: any) => {
    setIsUserKey(event.target.value.length < 3);
  };

  const onChangeHandlerUserName = (event: any) => {
    setIsUserName(event.target.value.length < 3);
  };

  const onChangeHandlerPassword = (event: any) => {
    setIsPassword(event.target.value.length < 3);
  };

  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit} from={form}>
        <p style={{ height: '35px' }}>{message}</p>
        <UserKey
          className={styles.obelisco}
          name="userKey"
          maxLength={20}
          onChange={(event) => onChangeHandlerUserKey(event)}
          placeholder={intl.formatMessage({
            id: 'login.customer',
            defaultMessage: 'Número de cliente',
          })}
          rules={[
            {
              required: true,
              message: messageError,
            },
            {
              min: 3,
              message: messageErrorVerify,
            },
          ]}
        />
        <UserName
          className={styles.obelisco}
          name="userName"
          maxLength={20}
          onChange={(event) => onChangeHandlerUserName(event)}
          placeholder={intl.formatMessage({
            id: 'login.user',
            defaultMessage: 'Usuario',
          })}
          rules={[
            {
              required: true,
              message: messageError,
            },
            {
              min: 3,
              message: messageErrorVerify,
            },
          ]}
        />
        <Password
          className={styles.obelisco}
          name="password"
          maxLength={20}
          onChange={(event) => onChangeHandlerPassword(event)}
          placeholder={intl.formatMessage({
            id: 'login.password',
            defaultMessage: 'Contraseña',
          })}
          rules={[
            {
              required: true,
              message: messageError,
            },
            {
              min: 3,
              message: messageErrorVerify,
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
        <Submit loading={submitting} disabled={isUserName || isUserKey || isPassword}>
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
