import { Form, Select } from 'antd';

interface Option {
    value: string | number;
    label: string;
}

interface SingleSelectWithSearchInputProps {
    name: string;
    label: React.ReactNode;
    options: Option[];
    placeholder?: string;
    required?: boolean;
    size?: 'large' | 'middle' | 'small';
    rules?: any[];
    initialValue?: string | number;
    disabled?: boolean;
    onChange?: (value: string | number) => void;
    allowClear?: boolean;
    showSearch?: boolean;
}

const SingleSelectWithSearchInput = ({
    name,
    label,
    options,
    placeholder,
    required = true,
    size = 'middle',
    rules = [],
    initialValue,
    disabled,
    onChange,
    allowClear = true,
    showSearch = true
}: SingleSelectWithSearchInputProps) => {
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
            <Select
                placeholder={placeholder}
                size={size}
                showSearch={showSearch}
                allowClear={allowClear}
                optionFilterProp="label"
                options={options}
                disabled={disabled}
                onChange={onChange}
                style={{ width: '100%' }}
            />
        </Form.Item>
    );
};

export default SingleSelectWithSearchInput;