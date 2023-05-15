import { Form } from 'antd';
import { useController } from 'react-hook-form';
import { FormItemProps } from '../../interfaces/FormItemProps.interface';

export default function FormItem(props: FormItemProps) {
  const { name, control, render, label, className, hint } = props;
  const { field, fieldState } = useController({ control, name });
  const { error } = fieldState;
  const hasError = !!error?.message;

  return (
    <Form.Item
      className={className}
      label={label}
      validateStatus={!hasError ? 'success' : 'error'}
      help={<span className="hint">{hasError ? error?.message : hint}</span>}
    >
      {render({ field, fieldState })}
    </Form.Item>
  );
}
