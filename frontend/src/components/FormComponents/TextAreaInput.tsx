import { Form, Input } from 'antd';

const { TextArea } = Input;

interface TextAreaInputProps {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    min?: number;
    max?: number;
    rows?: number;
    showCount?: boolean;
    rules?: any[];
    initialValue?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

const TextAreaInput = ({
    name,
    label,
    placeholder,
    required = true,
    min,
    max,
    rows = 3,
    showCount = true,
    rules = [],
    initialValue,
    disabled,
    onChange
}: TextAreaInputProps) => {
    const defaultRules = [
        required && { required: true, message: `Please enter ${label}!` },
        min && { min, message: `${label} must be at least ${min} characters!` }
    ].filter(Boolean);

    return (
        <Form.Item
            name={name}
            label={label}
            rules={[...defaultRules, ...rules]}
            initialValue={initialValue}
        >
            <TextArea
                placeholder={placeholder}
                rows={rows}
                showCount={showCount}
                maxLength={max}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </Form.Item>
    );
};

export default TextAreaInput;