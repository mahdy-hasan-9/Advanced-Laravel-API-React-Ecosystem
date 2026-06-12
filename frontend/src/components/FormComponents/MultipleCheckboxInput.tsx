import { Form, Checkbox, Row, Col } from 'antd';

interface Option {
    label: string;
    value: string;
}

interface MultipleCheckboxInputProps {
    name: string;
    label: string;
    options: Option[];
    required?: boolean;
    rules?: any[];
    initialValue?: string[];
    disabled?: boolean;
    onChange?: (value: string[]) => void;
    layout?: 'horizontal' | 'vertical' | 'grid';
    gridCols?: number; // for grid layout
}

const MultipleCheckboxInput = ({
    name,
    label,
    options,
    required = true,
    rules = [],
    initialValue,
    disabled,
    onChange,
    layout = 'horizontal',
    gridCols = 3
}: MultipleCheckboxInputProps) => {
    const defaultRules = [
        required && { required: true, message: `Please select at least one ${label.toLowerCase()}!` }
    ].filter(Boolean);

    const renderOptions = () => {
        if (layout === 'grid') {
            return (
                <Checkbox.Group disabled={disabled} onChange={onChange}>
                    <Row gutter={[16, 8]}>
                        {options.map(opt => (
                            <Col span={24 / gridCols} key={opt.value}>
                                <Checkbox value={opt.value}>{opt.label}</Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Checkbox.Group>
            );
        }
        return (
            <Checkbox.Group
                options={options}
                disabled={disabled}
                onChange={onChange}
            />
        );
    };

    return (
        <Form.Item
            name={name}
            label={label}
            rules={[...defaultRules, ...rules]}
            initialValue={initialValue}
        >
            {renderOptions()}
        </Form.Item>
    );
};

export default MultipleCheckboxInput;