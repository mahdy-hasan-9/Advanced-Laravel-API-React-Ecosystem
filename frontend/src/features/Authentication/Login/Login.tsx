import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Spin } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginService } from '../../../services/authService';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
    const { loginHandlerMutation } = useContext(AuthContext);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = (data: LoginFormData) => {
        loginHandlerMutation.mutate(data);
    };

    return (
        <Spin spinning={loginHandlerMutation.isPending} description="Logging into your account...">
            <Form
                name="login"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 32 }}
                style={{ maxWidth: 600, margin: '0 auto', padding: '24px' }}
                onFinish={handleSubmit(onSubmit)}
                autoComplete="off"
                layout="horizontal"
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Form.Item
                            label="Email"
                            validateStatus={errors.email ? 'error' : ''}
                            help={errors.email?.message}
                        >
                            <Input
                                {...field}
                                type="email"
                                placeholder="john@example.com"
                                autoComplete="email"
                            />
                        </Form.Item>
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Form.Item
                            label="Password"
                            validateStatus={errors.password ? 'error' : ''}
                            help={errors.password?.message}
                        >
                            <Input.Password
                                {...field}
                                placeholder="••••••••"
                                autoComplete="current-password"
                            />
                        </Form.Item>
                    )}
                />
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loginHandlerMutation.isPending}
                        disabled={loginHandlerMutation.isPending}
                        block
                        size="large"
                    >
                        {loginHandlerMutation.isPending ? 'Logging in...' : 'Login Account'}
                    </Button>
                </Form.Item>
            </Form>
            <Link to='/register' style={{ display: 'block', textAlign: 'center' }}>Register Here</Link>
        </Spin>
    );
}

export default Login;