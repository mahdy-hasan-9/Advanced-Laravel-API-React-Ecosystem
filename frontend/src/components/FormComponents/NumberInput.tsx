import { Form, InputNumber } from 'antd';

interface NumberInputProps {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    min?: number;
    max?: number;
    size?: 'large' | 'middle' | 'small';
    rules?: any[];
    initialValue?: number;
    disabled?: boolean;
    onChange?: (value: number | null) => void;
    formatter?: (value: number | undefined) => string;
    parser?: (value: string) => number | undefined;
}

const NumberInput = ({
    name,
    label,
    placeholder,
    required = true,
    min,
    max,
    size = 'middle',
    rules = [],
    initialValue,
    disabled,
    onChange,
    formatter,
    parser
}: NumberInputProps) => {
    const defaultRules = [
        required && { required: true, message: `Please enter ${label}!` },
        (min !== undefined || max !== undefined) && {
            type: 'number',
            min,
            max,
            message: `${label} must be between ${min}-${max}!`
        },
    ].filter(Boolean);

    return (
        <Form.Item
            name={name}
            label={label}
            rules={[...defaultRules, ...rules]}
            initialValue={initialValue}
        >
            <InputNumber
                placeholder={placeholder}
                size={size}
                style={{ width: '100%' }}
                min={min}
                max={max}
                disabled={disabled}
                onChange={onChange}
                formatter={formatter}
                parser={parser}
            />
        </Form.Item>
    );
};

export default NumberInput;