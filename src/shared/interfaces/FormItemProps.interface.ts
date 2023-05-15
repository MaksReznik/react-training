import { Control } from 'react-hook-form/dist/types';

export interface FormItemProps {
  name: string;
  control: Control<any>;
  render: any;
  label: string;
  className: string;
  hint: string;
}
