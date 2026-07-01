import { Form, Radio } from 'antd';

interface Option {
    label: string;
    value: string;
}

interface RadioInputProps {
    name: string;
    label: string;
    options: Option[];
    required?: boolean;
    rules?: any[];
    initialValue?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
    optionType?: 'default' | 'button';
    buttonStyle?: 'outline' | 'solid';
    layout?: 'horizontal' | 'vertical';
}

const RadioInput = ({
    name,
    label,
    options,
    required = true,
    rules = [],
    initialValue,
    disabled,
    onChange,
    optionType = 'button',
    buttonStyle = 'solid',
    layout = 'horizontal'
}: RadioInputProps) => {
    const defaultRules = [
        required && { required: true, message: `Please select ${label}!` }
    ].filter(Boolean);

    return (
        <Form.Item
            name={name}
            label={label}
            rules={[...defaultRules, ...rules]}
            initialValue={initialValue}
        >
            <Radio.Group
                options={options}
                optionType={optionType}
                buttonStyle={buttonStyle}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </Form.Item>
    );
};

export default RadioInput;