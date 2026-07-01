import { Form, Input, Space } from 'antd';
import type { ReactNode } from 'react';

interface TextInputProps {
    name: string;
    label: string | ReactNode;
    placeholder?: string;
    required?: boolean;
    min?: number;
    max?: number;
    prefix?: ReactNode;
    size?: 'large' | 'middle' | 'small';
    rules?: any[];
    initialValue?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

const TextInput = ({
    name,
    label,
    placeholder,
    required = true,
    min,
    max,
    prefix,
    size = 'middle',
    rules = [],
    initialValue,
    disabled,
    onChange
}: TextInputProps) => {
    const defaultRules = [
        required && { required: true, message: `Please enter ${typeof label === 'string' ? label.toLowerCase() : name}!` },
        min && { min, message: `${label} must be at least ${min} characters!` },
        max && { max, message: `${label} must be less than ${max} characters!` },
    ].filter(Boolean);

    return (
        <Form.Item
            name={name}
            label={prefix ? <Space>{prefix}{label}</Space> : label}
            rules={[...defaultRules, ...rules]}
            initialValue={initialValue}
        >
            <Input
                placeholder={placeholder}
                size={size}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </Form.Item>
    );
};

export default TextInput;