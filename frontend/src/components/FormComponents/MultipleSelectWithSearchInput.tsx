import { Form, Select } from 'antd';

interface Option {
    value: string | number;
    label: string;
}

interface MultipleSelectWithSearchInputProps {
    name: string;
    label: string;
    options: Option[];
    placeholder?: string;
    required?: boolean;
    size?: 'large' | 'middle' | 'small';
    rules?: any[];
    initialValue?: (string | number)[];
    disabled?: boolean;
    onChange?: (value: (string | number)[]) => void;
    allowClear?: boolean;
    showSearch?: boolean;
}

const MultipleSelectWithSearchInput = ({
    name,
    label,
    options,
    placeholder,
    required = true,
    size = 'large',
    rules = [],
    initialValue,
    disabled,
    onChange,
    allowClear = true,
    showSearch = true
}: MultipleSelectWithSearchInputProps) => {
    const defaultRules = [
        required && { required: true, message: `Please select at least one ${label.toLowerCase()}!` }
    ].filter(Boolean);

    return (
        <Form.Item
            name={name}
            label={label}
            rules={[...defaultRules, ...rules]}
            initialValue={initialValue}
        >
            <Select
                mode="multiple"
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

export default MultipleSelectWithSearchInput;